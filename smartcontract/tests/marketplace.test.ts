import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use as chaiUse } from "chai";
import chaiAsPromised from "chai-as-promised";
import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { NFTbayERC721, NFTbayMarketplace } from "../typechain";

chaiUse(chaiAsPromised);

describe("Marketplace", function () {
  // constants
  const NAME = "NAME";
  const SYMBOL = "SYMBOL";
  const BASE_URL = "https://ipfs.io/ipfs/";
  const TOKEN_URI = "QmVtRMhihBCgRirW8PUeFGJVfb9Bgq6uz8o8pXnmdsiyeM";
  const MINTER_ROLE =
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
  const MINTER_ROLE_MANAGER =
    "0x3d56c6b2572263081c65bd5409e23369bba6fe5164eaf66eb49349dcd212d6d3";

  const ONE_ETH = ethers.utils.parseEther("1");
  const SERVICE_FEE = 100;
  const ARTIST_ROYALITE = 500;

  // contracts
  let erc721: NFTbayERC721;
  let marketplace: NFTbayMarketplace;

  // accounts
  let accounts: SignerWithAddress[];
  let feeAccount: SignerWithAddress;
  let minter: SignerWithAddress;
  let nonMinter: SignerWithAddress;
  let minterRoleManager: SignerWithAddress;
  let collector: SignerWithAddress;
  let collector2: SignerWithAddress;
  // let defaultAdmin: string;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    feeAccount = accounts[0];
    minterRoleManager = accounts[1];
    minter = accounts[2];
    nonMinter = accounts[3];
    collector = accounts[4];
    collector2 = accounts[5];

    const CONTRACT_ROLE_STRING = ethers.utils.toUtf8Bytes("CONTRACT_ROLE");
    const CONTRACT_ROLE = ethers.utils.keccak256(CONTRACT_ROLE_STRING);

    /// deploy erc721 contract
    const NFTbayNFT = await ethers.getContractFactory("NFTbayERC721");
    erc721 = await NFTbayNFT.deploy(NAME, SYMBOL, BASE_URL);

    erc721.updatePaymentSplitter(feeAccount.address);

    /// deploy marketplace contract
    const NFTbayMarketplace = await ethers.getContractFactory(
      "NFTbayMarketplace"
    );
    marketplace = await NFTbayMarketplace.deploy(erc721.address);

    // defaultAdmin = await marketplace.DEFAULT_ADMIN_ROLE();

    await Promise.all([
      erc721.grantRole(MINTER_ROLE, marketplace.address), // grant Minter role to marketplace contract
      erc721.grantRole(CONTRACT_ROLE, marketplace.address), // grant Minter role to marketplace contract

      marketplace.grantRole(MINTER_ROLE_MANAGER, minterRoleManager.address),
      erc721.connect(minter).setApprovalForAll(marketplace.address, true),
    ]);

    await marketplace
      .connect(minterRoleManager)
      .grantRole(MINTER_ROLE, minter.address);
  });

  // test case 1
  describe("deploy contract, test mint", () => {
    it("should not allow to mint for addresses with no MINTER_ROLE", async () => {
      await expect(
        marketplace.connect(nonMinter).mint(TOKEN_URI, 0)
      ).to.be.revertedWith("missing role");
    });
    it("should allow to mint for addresses with MINTER_ROLE", async () => {
      await expect(marketplace.connect(minter).mint(TOKEN_URI, 0)).to.emit(
        erc721,
        "Transfer"
      );
    });
  });

  // test case 2
  describe("deploy contract, check Order functions", () => {
    const TOKEN_ID = 0;
    beforeEach(async () => {
      await marketplace.connect(minter).mint(TOKEN_URI, 0);
    });

    // test case 2.1
    describe("create order", () => {
      it("should revert with zero price", async () => {
        await expect(marketplace.connect(minter).createOrder(TOKEN_ID, 0)).to.be
          .reverted;
      });
      it("should create order and emit Order event", async () => {
        await expect(marketplace.connect(minter).createOrder(TOKEN_ID, ONE_ETH))
          .to.emit(marketplace, "Order")
          .withArgs(minter.address, 1, TOKEN_ID, ONE_ETH);
      });
    });

    // test case 2.2
    describe("remove order, modify order price, fill order", () => {
      const orderId = 1;
      beforeEach(async () => {
        await marketplace.connect(minter).createOrder(TOKEN_ID, ONE_ETH);
      });

      // test case 2.2.1
      it("remove order, emit removeOrder", async () => {
        await expect(marketplace.connect(minter).removeOrder(orderId))
          .to.emit(marketplace, "OrderRemoved")
          .withArgs(minter.address, orderId, TOKEN_ID);
      });

      // test case 2.2.2
      it("should not allow to cancel order with wrong order creator", async () => {
        await expect(marketplace.connect(nonMinter).removeOrder(orderId)).to
          .reverted;
      });
      // test case 2.2.3
      it("modify order, emit Order", async () => {
        const newPrice = ONE_ETH.mul(2);
        await expect(
          marketplace.connect(minter).modifyOrderPrice(orderId, newPrice)
        )
          .to.emit(marketplace, "Order")
          .withArgs(minter.address, orderId, TOKEN_ID, newPrice);
      });

      // test case 2.2.4
      it("should not allow to update order with wrong order creator", async () => {
        const newPrice = ONE_ETH.mul(2);
        await expect(
          marketplace.connect(nonMinter).modifyOrderPrice(orderId, newPrice)
        ).to.reverted;
      });

      // test case 2.2.5
      it("should not allow to fill order if price is low than listed", async () => {
        const lowPrice = ONE_ETH.sub(200000);
        await expect(
          marketplace.connect(collector).fillOrder(orderId, { value: lowPrice })
        ).to.reverted;
      });
      // test case 2.2.6
      it("should mark the order complete, and transfer assets", async () => {
        await expect(
          marketplace.connect(collector).fillOrder(orderId, { value: ONE_ETH })
        )
          .to.emit(marketplace, "Traded")
          .withArgs(
            minter.address,
            collector.address,
            TOKEN_ID,
            orderId,
            ONE_ETH
          );
      });
    });

    // test case 2.3.
    describe("create secondary order, fill secondary order", () => {
      beforeEach(async () => {
        await marketplace.connect(minter).createOrder(TOKEN_ID, ONE_ETH);

        await marketplace.connect(collector).fillOrder(1, { value: ONE_ETH });
        await erc721
          .connect(collector)
          .setApprovalForAll(marketplace.address, true);
        await marketplace.connect(collector).createOrder(TOKEN_ID, ONE_ETH);
      });

      it("should mark the order (secondary) complete, and transfer assets", async () => {
        await expect(
          marketplace.connect(collector2).fillOrder(2, { value: ONE_ETH })
        ).to.emit(marketplace, "Traded");
      });
      it("should update the owner ", async () => {
        await marketplace.connect(collector2).fillOrder(2, { value: ONE_ETH });
        expect(await erc721.ownerOf(TOKEN_ID)).to.be.eq(collector2.address);
      });
    });
  });

  // test case 3
  describe("deploy contract, check offer functions", () => {
    const TOKEN_ID = 0;
    beforeEach(async () => {
      await marketplace.connect(minter).mint(TOKEN_URI, 0);
    });

    // test case 3.1
    describe("create offer", () => {
      it("should revert with zero price", async () => {
        await expect(marketplace.connect(minter).createOffer(TOKEN_ID)).to.be
          .reverted;
      });
      it("should create order and emit Offer event", async () => {
        await expect(
          marketplace.connect(minter).createOffer(TOKEN_ID, { value: ONE_ETH })
        )
          .to.emit(marketplace, "Offered")
          .withArgs(minter.address, 1, TOKEN_ID, ONE_ETH);
      });
    });

    // test case 3.2
    describe("remove offer, modify offer price, fill offer", () => {
      const offerId = 1;
      beforeEach(async () => {
        await marketplace
          .connect(collector)
          .createOffer(TOKEN_ID, { value: ONE_ETH });
      });

      // test case 3.2.1
      it("remove offer, emit offerRemoved", async () => {
        await expect(marketplace.connect(collector).removeOffer(offerId))
          .to.emit(marketplace, "OfferRemoved")
          .withArgs(collector.address, offerId, TOKEN_ID);
      });

      // test case 3.2.2
      it("should not allow to cancel offer with wrong offer creator", async () => {
        await expect(marketplace.connect(nonMinter).removeOffer(offerId)).to
          .reverted;
      });
      // test case 3.2.3
      it("modify offer, emit Offered", async () => {
        const newPrice = ONE_ETH.mul(2);
        await expect(
          marketplace
            .connect(collector)
            .modifyOfferPrice(offerId, { value: newPrice })
        )
          .to.emit(marketplace, "Offered")
          .withArgs(collector.address, offerId, TOKEN_ID, newPrice);
      });

      // test case 3.2.4
      it("should not allow to update offer with wrong offer creator", async () => {
        const newPrice = ONE_ETH.mul(2);
        await expect(
          marketplace
            .connect(nonMinter)
            .modifyOfferPrice(offerId, { value: newPrice })
        ).to.reverted;
      });

      // test case 3.2.5
      it("should not allow to fill offer if caller is not nft owner", async () => {
        await expect(marketplace.connect(collector).fillOffer(offerId, 0)).to
          .reverted;
      });
      // test case 3.2.6
      it("should mark the offer complete, and transfer assets", async () => {
        await expect(marketplace.connect(minter).fillOffer(offerId, 0))
          .to.emit(marketplace, "Traded")
          .withArgs(minter.address, collector.address, TOKEN_ID, 0, ONE_ETH);

        expect(await erc721.ownerOf(TOKEN_ID)).to.eq(collector.address);
      });
    });
  });

  // test case : test fee transfers
  describe("mint, set royalties, fill offer, fill secondary order, check royalties", () => {
    let tokenId: number;

    beforeEach(async () => {
      const tx = await marketplace
        .connect(minter)
        .mint(TOKEN_URI, ARTIST_ROYALITE);

      const receipt = await tx.wait();
      // @ts-ignore
      tokenId = parseInt(receipt.events[0].topics[3]);
      await marketplace.connect(minter).createOrder(tokenId, ONE_ETH);

      await erc721
        .connect(collector)
        .setApprovalForAll(marketplace.address, true);
    });

    describe("test primary platform fee", () => {
      let feeAccountBalanceBefore: BigNumberish;

      beforeEach(async () => {
        feeAccountBalanceBefore = await feeAccount.getBalance();
        await marketplace.connect(collector).fillOrder(1, { value: ONE_ETH });
      });
      it("should transfer correct primary platform fee", async () => {
        const serviceFee = ONE_ETH.mul(SERVICE_FEE).div(10000);

        const feeAccountBalanceAfter = await feeAccount.getBalance();

        expect(feeAccountBalanceAfter).to.eq(
          serviceFee.add(feeAccountBalanceBefore)
        );
      });
    });

    describe("test secondary platform fee", () => {
      let feeAccountBalanceBefore: BigNumberish;
      let artistAccountBalanceBefore: BigNumberish;
      beforeEach(async () => {
        await marketplace.connect(collector).fillOrder(1, { value: ONE_ETH });
        feeAccountBalanceBefore = await feeAccount.getBalance();
        artistAccountBalanceBefore = await minter.getBalance();
        await marketplace.connect(collector).createOrder(tokenId, ONE_ETH);
        await marketplace.connect(collector2).fillOrder(2, { value: ONE_ETH });
      });
      it("should pay correct secondary platform fee", async () => {
        const serviceeFee = ONE_ETH.mul(SERVICE_FEE).div(10000);
        const feeAccountBalanceAfter = await feeAccount.getBalance();

        expect(feeAccountBalanceAfter).to.eq(
          serviceeFee.add(feeAccountBalanceBefore)
        );
      });
      it("should pay correct royalties fee", async () => {
        const marketplaceFee = ONE_ETH.mul(SERVICE_FEE).div(10000);
        const sellerAmount = ONE_ETH.sub(marketplaceFee);
        const artisteFee = sellerAmount.mul(ARTIST_ROYALITE).div(10000);

        const artistAccountBalanceAfter = await minter.getBalance();

        expect(artistAccountBalanceAfter).to.eq(
          artisteFee.add(artistAccountBalanceBefore)
        );
      });
    });
  });
});
