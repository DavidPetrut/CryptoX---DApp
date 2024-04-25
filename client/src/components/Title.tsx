import { useState, useEffect } from 'react';
import ethereum from "../assets/ethereum.svg";



const Title = () => { 
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const toRotate = ["Welcome to CryptoX!", "Send ethereum across the World!", "Make Transactions through Block-chain!", "Try it Now!"];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const period = 1000;

    useEffect(() => {
        const handle = setTimeout(() => {
            let i = loopNum % toRotate.length;
            let fullText = toRotate[i];
            let updatedText = isDeleting ? text.slice(0, -1) : text + fullText.charAt(text.length);

            setText(updatedText);

            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), period);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(handle);
    }, [text, isDeleting, loopNum]);

    
    return ( 
        <div className='mb-10'>
            <div className='flex row flex-row justify-center items-center my-5'>
                <div className='col-lg-1'>
                     <svg className="ethereumSVG">
                     <path d={ethereum} fill="#F04E4F"></path>
                    </svg>
                </div>
                <div className='col-lg-11'>
                     <h1 className="text-3xl sm:text-5xl text-white text-gradient py-5 mt-5 mb-4 special-1">
                            <span className='text-gradient'>... {text}</span>
                    </h1>
                </div>
            </div>
            <h1 className='text-2xl text-center text-white font-bold titleMain'><span className='titleMainSpecial mr-1'>Join</span> GLOBAL ETHEREUM TRANSFER </h1>
            <h1 className='text-2xl text-center text-white font-bold titleMain mb-2'>POWERED BY CRIPTOX -<span className='titleMainSpecial'> crypto simplified</span></h1> 
            <h1 className='text-center text-white subTitle'>Experience Lightning-Fast Crypto Transfers: Secure & Simple.</h1>
            
        </div>
        );
    }

export default Title;