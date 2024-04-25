import { useLocation } from 'react-router-dom';
import shortenAddress from '../utils/shortenAddress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CheckTransaction = () => {
  const location = useLocation();
  const { status, message, transactionDetails } = location.state || { status: 'pending', message: 'Processing your transaction...' };
  const { hash } = useLocation();


  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const navigate = useNavigate();

  return (
    <div id='checkout-section' className="flex w-full h-screen items-center justify-center gradient-bg-welcome">
      <div className="eth-cardTransaction white-glassmorphism text-center p-10 rounded-lg formContainerThick">
        <h1 className="text-xl mb-2 text-gradientTransactionPending" style={{ color: status === 'success' ? '' : '#FF5450' }}>
          Transaction {status.toUpperCase()}FUL <FontAwesomeIcon className='text-2xl font-bold text-white ps-2' icon={faCheck} />
        </h1>
        <p className="text-white mb-4">{message}</p>
        <hr className='pb-3' />
        {transactionDetails && (
            <div className='text-white font-extralight specialCheckoutBorder'>
            <p className='font-semibold'>ETH Sent to Address:</p>
            <p>{shortenAddress(transactionDetails.addressTo)}</p>
            <p><span className='font-semibold pe-1'>Amount (ETH):</span> {transactionDetails.amount}</p>
            <p><span className='font-semibold pe-1'>Keyword:</span> {transactionDetails.keyword}</p>
            <p><span className='font-semibold pe-1'>Message: </span> {transactionDetails.message}</p>
          </div>
        )}
        <hr className='my-3' />
      <button onClick={() => navigate("/#focus-main")} className="py-2 px-7 mr-1 rounded-full rounded-tr rounded-br cursor-pointer loginSingUpButtonsCheck">Back To Dashboard</button>
      <button onClick={() => window.location.href = "https://sepolia.etherscan.io/address/0xBe89a156C1dB70345820027C8b876cE9Bd1AA673"} className="py-2 px-7 rounded-full rounded-tl rounded-bl cursor-pointer loginSingUpButtonsCheck">Transaction History</button>
      </div>
    </div>
  );
};

export default CheckTransaction;

