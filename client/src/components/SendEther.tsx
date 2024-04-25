import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';



interface TransactionInfo {
    recipient: string;
    amount: string;
    gasUsed: any;
    gasCost: any;
    txHash: string;
  }

  function SendEther() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionDetails, setTransactionDetails] = useState<TransactionInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false); 
  
    const sendEther = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post('http://localhost:3001/api/users/sendEther', { recipient, amount });
          setTransactionDetails(response.data); 
          console.log(response.data)
          setRecipient('')
          setAmount('')
        } catch (error:any) {
          console.error('Error sending Ether:', error.response.data.message);
          setTransactionDetails(null)
          setRecipient('')
          setAmount('')
          alert('Transaction failed: ' + error.response.data.message);
        } finally {
          setIsLoading(false); 
        }
      };

  const shortenTxHash = (txHash:any) => {
    if (txHash.length > 10) {
      return `${txHash.slice(0, 5)}...${txHash.slice(-5)}`;
    }
    return txHash;
  }



  return (
    <div className="flex flex-col justify-center items-center lg:flex-row"> 
    <div className="p-5 w-full max-w-sm flex flex-col justify-start items-center blue-glassmorphism sendEthereumBackEndBorder mx-5 my-3">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">Send Ethereum</h1>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <div className="h-[1px] w-full bg-gray-400 my-2" />
      {isLoading ? (
        <Loader /> 
      ) : (
        <button
          onClick={sendEther}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
        >
          Send Ether
        </button>
      )}
    </div>

    {transactionDetails && (
      <div id='checkout-section' className="flex items-center justify-center my-3">
        <div className="eth-cardTransaction white-glassmorphism text-center p-10 rounded-lg formContainerThick">
          <h1 className="text-xl mb-2 text-gradientTransactionPending" style={{ color: 'success' ? '' : '#FF5450' }}>
            Transaction SUCCESSFUL <FontAwesomeIcon className='text-2xl font-bold text-white ps-2' icon={faCheck} />
          </h1>
          <p className="text-white mb-4">Transaction was successful!</p>
          <hr className='pb-3' />
          <div className='text-white font-extralight specialCheckoutBorder'>
            <p><span className='font-semibold ps-1'>ETH Sent to Address:</span> {shortenTxHash(transactionDetails.recipient)}</p>
            <p><span className='font-semibold pe-1'>Amount (ETH):</span> {transactionDetails.amount}</p>
            <p><span className='font-semibold pe-1'>Gas:</span> {transactionDetails.gasUsed}</p>
            <p><span className='font-semibold pe-1'>Gas Cost ETH: </span> {transactionDetails.gasCost} ETH</p>
            <p><span className='font-semibold pe-1'>Sent To: </span> {shortenTxHash(transactionDetails.recipient)} ETH</p>
          </div>
          <hr className='my-3' />
        </div>
      </div>
    )}
  </div>
  );
}




export default SendEther;
