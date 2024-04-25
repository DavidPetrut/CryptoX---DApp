import express from "express";
const router = express.Router();


const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI =
  require("../../smart_contract/artifacts/contracts/Random.sol/Random.json").abi;
const contractAddress = "0x1dE0aB01CCe1784f9864660f102c0470F75356aD";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

router.post("/sendEther", async (req, res) => {
  const { recipient, amount } = req.body;

  try {
    const txResponse = await wallet.sendTransaction({
      to: recipient,
      value: ethers.utils.parseEther(amount),
    });

    const receipt = await txResponse.wait();

    const gasCost = ethers.utils.formatEther(
      receipt.gasUsed.mul(receipt.effectiveGasPrice)
    );

    const transactionSummary = {
      success: true,
      txHash: txResponse.hash,
      recipient: recipient,
      amount: amount,
      gasUsed: receipt.gasUsed.toString(),
      gasCost: gasCost,
    };

    console.log("Transaction Summary:", transactionSummary);

    res.json({
      success: true,
      txHash: txResponse.hash,
      recipient: recipient,
      amount: amount,
      gasUsed: receipt.gasUsed.toString(),
      gasCost: gasCost,
    });
  } catch (error:any) {
    console.error("Transaction Error:", error);
    res.status(500).json({
      success: false,
      message: "Transaction failed",
      error: error.message,
    });
  }
});

export default router;
