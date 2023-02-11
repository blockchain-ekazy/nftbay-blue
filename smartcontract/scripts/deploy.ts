import { ethers, run } from "hardhat";

async function main() {
  const NAME = "NAME";
  const SYMBOL = "SYMBOL";
  const baseTokenURI = "https://ipfs.io/ipfs/";
  const MINTER_ROLE =
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
  const MINTER_ROLE_MANAGER =
    "0x3d56c6b2572263081c65bd5409e23369bba6fe5164eaf66eb49349dcd212d6d3";
  const FEE_ACCOUNT = "0xca8eF9210b055723735074711889F233A0930B99";

  const CONTRACT_ROLE_STRING = ethers.utils.toUtf8Bytes("CONTRACT_ROLE");
  const CONTRACT_ROLE = ethers.utils.keccak256(CONTRACT_ROLE_STRING);

  /// deploy NFT(erc721) contract
  const ERC721 = await ethers.getContractFactory("NFTbayERC721");
  const erc721 = await ERC721.deploy(NAME, SYMBOL, baseTokenURI);
  await erc721.deployed();
  console.log(" ERC721:", erc721.address);

  /// deploy marketplace contract
  const Marketplace = await ethers.getContractFactory("NFTbayMarketplace");
  const marketplace = await Marketplace.deploy(erc721.address);
  console.log("marketplace:", marketplace.address);

  /// deploy marketplace contract
  const EnglishAuction = await ethers.getContractFactory(
    "NFTbayEnglishAuction"
  );
  const englishAuction = await EnglishAuction.deploy(erc721.address);
  console.log("englishAuction:", englishAuction.address);

  await erc721.grantRole(MINTER_ROLE, marketplace.address); // grant Minter role to marketplace contract
  await erc721.grantRole(CONTRACT_ROLE, marketplace.address);
  await erc721.grantRole(CONTRACT_ROLE, englishAuction.address);

  console.log("deployment completed successfully");

  setTimeout(async () => {
    await verify(erc721.address, [NAME, SYMBOL, baseTokenURI, FEE_ACCOUNT]);
    await verify(marketplace.address, [erc721.address]);
    await verify(englishAuction.address, [erc721.address]);
  }, 3000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function verify(address: string, args: any[]) {
  await run("verify:verify", {
    address: address,
    constructorArguments: args,
  });
}
