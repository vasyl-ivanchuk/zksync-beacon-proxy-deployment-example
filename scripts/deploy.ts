import { Wallet } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as hre from "hardhat";

require('dotenv').config();

async function main() {
    const zkWallet = new Wallet(process.env.WALLET_PRIVATE_KEY!);
    console.log(`Wallet address: ${zkWallet.address}`);

    const deployer = new Deployer(hre, zkWallet);

    const contractName = "Box";
    const contract = await deployer.loadArtifact(contractName);

    const beacon = await hre.zkUpgrades.deployBeacon(deployer.zkWallet, contract);

    await beacon.waitForDeployment();

    const beaconAddress = await beacon.getAddress();

    const gus = await hre.zkUpgrades.deployBeaconProxy(deployer.zkWallet, beaconAddress, contract);
    await gus.waitForDeployment();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});