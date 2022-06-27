const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

let bookbears;

describe("Bookbears NFT contract tests", function() {
  this.beforeEach(async function() {
    const Bookbears = await ethers.getContractFactory("NFT");
    bookbears = await Bookbears.deploy("Bookbears Contract", "BKB", "https://gateway.pinata.cloud/ipfs/QmRxsEtyMiJ47zqpG95sqeYndeHQcwSdUXW3ANqqLB3sQ2/", "https://gateway.pinata.cloud/ipfs/QmfTWPyekcAsRMWAxAvEiLdHTMDQevp6FuJnH9bKfLzSb5");

  })

  it("Collection is hidden", async function() {
    expect(await bookbears.tokenURI(1)).to.equal("https://gateway.pinata.cloud/ipfs/QmfTWPyekcAsRMWAxAvEiLdHTMDQevp6FuJnH9bKfLzSb5");
    expect(await bookbears.revealed()).to.equal(false);
  })

  it("Contract is deployed successfully", async function() {
    [account1] = await ethers.getSigners();
    expect(await bookbears.totalSupply()).to.equal(5);
  })

  it("NFT is minted successfully", async function() {
    [account1, account2] = await ethers.getSigners();
    const tx = await bookbears.mint(account2.address, 1);

    expect(await bookbears.totalSupply()).to.equal(6);

    // console.log(account2.address);
    // console.log(await bookbears.walletOfOwner(account2.address).then(function(tokenId) {
    //   return tokenId.toString();
    // }));

    const testTokenId = await bookbears.walletOfOwner(account2.address).then(function(tokenId) {
      return tokenId.toString();
    });

    expect(testTokenId).to.equal("6");

  })

  it("Collection is revealed", async function() {
    [account1] = await ethers.getSigners();
    const tx = await bookbears.connect(account1).reveal();

    expect(await bookbears.revealed()).to.equal(true);
  }) 


})