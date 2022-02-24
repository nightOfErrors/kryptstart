import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import '../home.css';

// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
// import { Loader } from ".";

import { ContextProvider } from "../context/TransactionContext";


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {

    const { connectToWallet, currentAccount } = useContext(ContextProvider)

    const [appliedAddress, setAppliedAddress] = useState("Getting Your Address...")
    
    useEffect( async ()=>{

        let stringPrepend = await currentAccount.substring(0, 5);
        let stringAppend = await currentAccount.substring(currentAccount.length-4, currentAccount.length);
        let string = stringPrepend + "........" + stringAppend;
        setAppliedAddress(string);
  
    },[currentAccount])


    return (
        <div style={{ width: '100%' }} className="flex justify-center items-center">
            <div style={{ width: '70%', display: 'flex', flexWrap: 'wrap' }} className="flex justify-center items-center">
                <div style={{ minWidth: '350px' }} className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                            Back the ideas <br /> of the new startups
                        </h1>
                        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                        </p>
                        {!currentAccount &&
                            (
                                <button onClick={connectToWallet} style={{ width: "90%", backgroundColor: "rgb(37,70,189)", marginTop: '18px', height: '45px', borderRadius: '45px', color: 'white' }}>Connect Wallet</button>
                            )
                        }
                        {/* {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )} */}

                    </div>
                </div>


                <div style={{ minWidth: '300px' }} className="muEthCard flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {/* {shortenAddress(currentAccount)} */}{appliedAddress}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Welcome;