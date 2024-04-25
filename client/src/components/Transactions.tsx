import { useContext, useEffect, useState } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import shortenAddress from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }: any) => {
  const gifUrl = useFetch({ keyword });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const imageStyle = windowWidth < 640 ? {
    width: '100%',
    height: 'auto',
    minHeight: '200px',
    maxHeight: '300px',
    maxWidth: '400px',
    minWidth: '400px',
  } : {
    width: '100%',
    height: 'auto',
    minHeight: '200px',
    maxWidth: '400px'
  };


  return (
    <div className="bg-[#181918] m-4
      flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      lg:min-w-[350px]
      lg:max-w-[400px]
      md:min-w-[300px]
      md:max-w-[350px]
      sm:min-w-[270px]
      sm:max-w-[95%]
      xs:min-w-[95%]
      xs:max-w-[95%]
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div id="transactions"  className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          style={imageStyle}
          className="sm:min-w-[300px] sm:max-h-[200px] md:w-full md:h-auto object-cover rounded-md shadow-lg gifsSpecial1"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount }:any = useContext(TransactionContext);

  const latestTransactions = transactions.slice(Math.max(transactions.length - 9, 0));


  return (
    <div id="transactions" className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions specialPadding">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <div>
            <h3 className="text-white text-3xl text-center my-2">
              Latest Transactions
            </h3>
            <hr className='flex justify-center items-center specialHorizontalLinePage2' />
          </div>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10 md:flex-row flex-col">
          {latestTransactions.reverse().map((transaction: any, i: any) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;