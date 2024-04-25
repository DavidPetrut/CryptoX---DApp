import { ethers } from "ethers";
import "dotenv/config";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { sendTransactionEmail } from "./emailVerification";

const provider:any = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API);
const privateKey:any = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

import contractABI from "../../smart_contract/artifacts/contracts/Random.sol/Random.json";
const contractAddress = "0x273fbd1A984AF825114348596f9B662bE8b06801";

const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);
console.log("Contract initialized.");

async function handleTransferEvent(
  from: string, receiver: string, amount: string, message: string, timestamp: number, keyword: string
): Promise<void> {
  console.log(`Transfer from ${from} to ${receiver}: ${amount} ETH. Message: ${message}. Keyword: ${keyword} at ${timestamp}`);

  const newTransaction = new Transaction({
    from, receiver, amount, message, timestamp: new Date(timestamp * 1000), keyword,
  });

  try {
    await newTransaction.save();
    console.log("Transaction saved to database.");

    const senderUser = await User.findOne({ ethereumAddress: from.toLowerCase() });

    if (senderUser && senderUser.email) {
      await sendTransactionEmail(senderUser.email.toLowerCase(), {
        from, receiver, amount, message, keyword, timestamp: new Date(timestamp * 1000).toLocaleString(),
      });
    } else {
      console.log("Sender email not found for transaction:", from);
    }
  } catch (error) {
    console.error("Error processing transaction event:", error);
  }
}

function setupListeners(): void {
  contract.on("Transfer", handleTransferEvent);
}


export { setupListeners };
