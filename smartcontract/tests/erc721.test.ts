// eslint-disable-next-line node/no-unpublished-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use as chaiUse } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-unpublished-import, node/no-missing-import
import { NFTbayNFT } from "../typechain";

chaiUse(chaiAsPromised);

describe("erc721", function () {
  let erc721: NFTbayNFT;

  let accounts: SignerWithAddress[];
  let minter: SignerWithAddress;
  let marketplaceFeeAccount: SignerWithAddress;

  const NAME = "NAME";
  const SYMBOL = "SYMOBOL";
  const BASE_URL = "http://dummy.url/";
  const SERVICE_FEE = 100;
  const ARTIST_ROYALITE = 500;

  const TOKEN_URI = BASE_URL + "0";
  const ZERO_ADDRESS = ethers.constants.AddressZero;
  const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  const MINTER_ROLE_STRING = ethers.utils.toUtf8Bytes("MINTER_ROLE");
  const MINTER_ROLE = ethers.utils.keccak256(MINTER_ROLE_STRING);

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    marketplaceFeeAccount = accounts[0];

    minter = accounts[1];

    const NFTbayNFT = await ethers.getContractFactory("NFTbayERC721");
    erc721 = await NFTbayNFT.deploy(NAME, SYMBOL, BASE_URL);
  });

  describe("Check token Info", () => {
    it("should return the token name", async () => {
      expect(await erc721.name()).to.be.eq(NAME);
    });

    it("should return the token symboo", async () => {
      expect(await erc721.symbol()).to.be.eq(SYMBOL);
    });

    it("roles", async () => {
      const res = await erc721.hasRole(DEFAULT_ADMIN_ROLE, accounts[0].address);

      expect(res).to.be.eq(true);
    });
  });

  describe("deploy contracts, grant roles, mint and test:", () => {
    beforeEach(async () => {
      await erc721.grantRole(MINTER_ROLE, minter.address);
      // minting first token, id 0
      await erc721.connect(minter).mint(TOKEN_URI, minter.address);

      await erc721.setBaseURI("");
    });

    it("roles", async () => {
      expect(await erc721.hasRole(MINTER_ROLE, minter.address)).to.be.eq(true);
    });

    it("total supply", async () => {
      expect(await erc721.totalSupply()).to.be.eq(1);
    });

    it("BASE + TOKEN URI", async () => {
      const tokenURI = await erc721.tokenURI(0);
      expect(tokenURI).to.be.equal(TOKEN_URI);
    });

    it("owner", async () => {
      expect(await erc721.ownerOf(0)).to.be.equal(minter.address);
    });

    it("balance", async () => {
      expect(await erc721.balanceOf(minter.address)).to.be.equal(1);
    });

    it("Transfer event", async function () {
      await expect(erc721.connect(minter).mint(TOKEN_URI, minter.address))
        .to.emit(erc721, "Transfer")
        .withArgs(ZERO_ADDRESS, minter.address, 1);
    });

    it("non minter cannot mint", async () => {
      const nonMinter = accounts[2];
      await expect(erc721.connect(nonMinter).mint(TOKEN_URI, nonMinter.address))
        .to.be.reverted;
    });
  });

  // test case 1
  describe("deploy contract, check state", () => {
    it("should return correct feeAccount", async () => {
      expect(ethers.constants.AddressZero).to.eq(
        await erc721.paymentSplitter()
      );
    });

    it("should return service fee BPs", async () => {
      expect(SERVICE_FEE).to.eq(await erc721.serviceFeeBPs());
    });
  });
  // test case 2
  describe("deploy contract, update fee account", () => {
    it("should not allow non owner to update fee account", async () => {
      await expect(
        erc721.connect(accounts[4]).updatePaymentSplitter(accounts[1].address)
      ).to.be.reverted;
    });
    it("should allow owner to update fee account", async () => {
      const newFeeAccount = accounts[1];
      await erc721.updatePaymentSplitter(newFeeAccount.address);

      const paymentSplitter = await erc721.paymentSplitter();
      expect(paymentSplitter).to.eq(newFeeAccount.address);
    });
  });

  // test case 3
  describe("deploy contract, update serviceeFee BPs", () => {
    const newFee = 1500;

    it("should not allow non owner to update service BPs", async () => {
      await expect(
        erc721.connect(accounts[4]).setServiceFeeBPs(newFee)
      ).to.be.revertedWith("is missing role");
    });

    it("should allow owner to update service BPs ", async () => {
      await erc721.setServiceFeeBPs(newFee);

      const serviceFeeBPs = await erc721.serviceFeeBPs();
      expect(serviceFeeBPs).to.eq(newFee);
    });
  });

  // test case 4
  describe("deploy contract, test supports interfaces", () => {
    // the interface id can be foud on the eip page https://eips.ethereum.org/EIPS/eip-721
    it("supports the IERC721 interface", async () => {
      expect(await erc721.supportsInterface("0x80ac58cd")).to.be.equal(true);
    });

    it("supports the IERC721Metadata interface", async () => {
      expect(await erc721.supportsInterface("0x5b5e139f")).to.be.equal(true);
    });

    it("supports the IERC165 interface", async () => {
      expect(await erc721.supportsInterface("0x01ffc9a7")).to.be.equal(true);
    });

    it("supports the IERC2981 interface", async () => {
      expect(await erc721.supportsInterface("0x2a55205a")).to.be.equal(true);
    });

    it("supports the IERC721Enumerable interface", async () => {
      expect(await erc721.supportsInterface("0x780e9d63")).to.be.equal(true);
    });

    it("supports the IAccessControl interface", async () => {
      expect(await erc721.supportsInterface("0x7965db0b")).to.be.equal(true);
    });
  });
});
