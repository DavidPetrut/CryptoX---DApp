import { ethers } from "hardhat";

async function main() {
  
  const Random = await ethers.deployContract("Random");
  
  await Random.waitForDeployment();

  console.log(`ETH deployed to ${Random.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



