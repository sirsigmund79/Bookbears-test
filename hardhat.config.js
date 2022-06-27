require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

  const Bookbears = await hre.ethers.getContractFactory("NFT");
  const bookbears = await Bookbears.deploy("Bookbears Test Contract", "BKB","https://gateway.pinata.cloud/ipfs/QmRxsEtyMiJ47zqpG95sqeYndeHQcwSdUXW3ANqqLB3sQ2/", "https://gateway.pinata.cloud/ipfs/QmfTWPyekcAsRMWAxAvEiLdHTMDQevp6FuJnH9bKfLzSb5");

  await bookbears.deployed();

  await hre.run("verify:verify", {
    address: bookbears.address,
    constructorArguments: [
      "Bookbears Test Contract",
      "BKB",
      "https://gateway.pinata.cloud/ipfs/QmRxsEtyMiJ47zqpG95sqeYndeHQcwSdUXW3ANqqLB3sQ2/",
      "https://gateway.pinata.cloud/ipfs/QmfTWPyekcAsRMWAxAvEiLdHTMDQevp6FuJnH9bKfLzSb5"
    ]
  })

})

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [
        process.env.PRIVATE_KEY,
      ]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  }
};