import { useContext, useEffect } from 'react'
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import  shortenAddress  from '../utils/shortenAddress'
import globe from "../assets/globe.svg";
import currency from "../assets/currency.svg";
import { useLocation, useNavigate } from 'react-router-dom';



import Loader from "./Loader"
import { TransactionContext } from '../context/TransactionContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faGlobe, faSackDollar, faDatabase, faCoins, faCircleCheck } from '@fortawesome/free-solid-svg-icons';



const Input = ({ placeholder, name, type, value, handleChange }:any ): JSX.Element => {
    return (
        <input 
            placeholder={placeholder}
            type={type}
            step="0.0001"
            value={value}
            onChange={e => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    )
}

const Welcome = () => {
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading, disconnectWallet }:any = useContext(TransactionContext)
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

    const commonStyles:string = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"


    const handleSubmit = async  (e: any) => {
        const { addressTo, amount, keyword, message }:any = formData

        e.preventDefault()
        if(!addressTo || !amount || !keyword || !message) return;

        const transactionResult = await sendTransaction();
        navigate('/check-transaction#checkout-section', { state: transactionResult });
    }

    return (
<div id='wallets' className="flex w-full justify-center items-center specialPadding">
    <div className="flex flex-col lg:flex-row items-start justify-between w-full md:p-20 py-12 px-4">
        {/* left side of the page */}
        <div className="flex flex-1 flex-col items-center lg:items-start justify-center w-full lg:w-auto">
            <img className='welcomeSvg my-4' src={globe} alt="" />
            <h4 className="text-center lg:text-left text-white font-light w-full lg:w-9/12 text-base miniTitle specialParagraph">
                <svg className="currencySVG">
                    <path d={currency} fill="yellow"></path>
                </svg> Explore the Crypto World!
            </h4>
            <p className="text-center lg:text-left text-white font-light w-full lg:w-9/12 text-base specialParagraph">
                Send & Receive Cryptocurrencies!<br />
                Buy and Sell safe through Block-Chain.
            </p>
            {currentAccount ? (
                <button
                    type="button"
                    onClick={disconnectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#FF5450] p-3 rounded-full cursor-pointer hover:bg-[#FF5450]"
                >
                    <span className="text-white text-base font-semibold">Disconnect Wallet</span>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                    <span className="text-white text-base font-semibold">Connect Wallet</span>
                </button>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-1 mt-10">
                <div className={`rounded-tl-2xl ${commonStyles}`}>
                    <FontAwesomeIcon icon={faCircleCheck} className='mr-2' /> Reliability
                </div>
                <div className={commonStyles}>
                    <FontAwesomeIcon icon={faShield} className='mr-2' /> Security
                </div>
                <div className={`${commonStyles}`}>
                    <FontAwesomeIcon icon={faCoins} className='mr-2' /> Ethereum
                </div>
                <div className={`${commonStyles}`}>
                    <FontAwesomeIcon icon={faDatabase} className='mr-2' /> Web 3.0
                </div>
                <div className={commonStyles}>
                    <FontAwesomeIcon icon={faSackDollar} className='mr-2' /> Low Fees
                </div>
                <div className={`rounded-br-2xl ${commonStyles}`}>
                    <FontAwesomeIcon icon={faGlobe} className='mr-2' /> Blockchain
                </div>
            </div>
        </div>

                {/* right side of the page */}
                {/* wallet */}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                            Send Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome