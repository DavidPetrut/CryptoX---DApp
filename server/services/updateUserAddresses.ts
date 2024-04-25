import User from "../models/User";
import Transaction from "../models/Transaction";

async function updateUsersWithEthereumAddresses() {
  const transactions = await Transaction.find({});

  transactions.forEach(async (transaction) => {
    const { from, email }:any = transaction;

    try {
      await User.findOneAndUpdate(
        { email: email },
        { ethereumAddress: from },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating user with Ethereum address:", error);
    }
  });
}

export default updateUsersWithEthereumAddresses;
