import mongoose, { Schema, Document } from 'mongoose';
import { ITransaction } from '../utils/types.g';


const TransactionSchema: Schema = new Schema({
  from: { type: String, required: true },
  receiver: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String, required: false },
  timestamp: { type: Date, required: true },
  keyword: { type: String, required: false },
});

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
