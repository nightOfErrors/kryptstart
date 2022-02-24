import Navbar from "./Navbar";
import '../ideas.css';
import { Link } from "react-router-dom";
import { ContextProvider } from "../context/TransactionContext";
import { useContext, useEffect, useState } from "react";

const InnerTransit = (props) => {

    let stringPrepend = props.allData.addressFrom.substring(0, 5);
    let stringAppend = props.allData.addressFrom.substring(38, 42);
    const addressShortning = stringPrepend + "....." + stringAppend;


    const gifKey = props.allData.keyword;
    const [recievedUrl, setRecievedUrl] = useState('https://media1.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif?cid=239fb4ddh1xoo6j9fmzs606mubosj2frx3aefta202iahrcl&rid=giphy.gif&ct=g');
    const gifUrl = async (keyword) => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=VEi1pwVzDxvGE9C4iBZexIP6YElHGX1F&q=${keyword.split(" ").join("")}&limit=1`
        await fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            const setGifUrl = data.data[0].images.downsized_medium.url
            setRecievedUrl(setGifUrl)
        }).catch((error) => {
            const setGifUrl = 'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284'
            setRecievedUrl(setGifUrl)
        })
    }
    gifUrl(gifKey)



    return (
        <div className="inTransaction" style={{ border: '2px solid white', backgroundImage: `url(${recievedUrl})`, backgroundSize: 'cover', width: '100px', paddingLeft: '2px', height: '100%', marginLeft: '10px' }}>
            <p style={{ color: 'white', fontSize: '10px' }}>from : </p>
            <p style={{ color: '#AAFF00', fontSize: '10px' }}>{addressShortning}</p>
            <p style={{ color: 'white', fontSize: '10px' }}>value : </p>
            <p style={{ color: '#AAFF00', fontSize: '10px' }}>{props.allData.amount} ETH</p>
            <p style={{ color: 'white', fontSize: '10px' }}>at : </p>
            <p style={{ color: '#AAFF00', fontSize: '8px' }}>{props.allData.timestamp}</p>
        </div>
    );
}



const Ideas = (props) => {

    const { getTransactionData, sendTransaction, recievedTransactions } = useContext(ContextProvider);
    const [transactionsArray, setTransactionsArray] = useState([]);

    const { state } = props.location;


    let setter = [];

    let totalAmountCalculated = 0;

    recievedTransactions.forEach(element => {
        if (element.addressTo == state.ETH_Address) {
            setter.push(element);

            totalAmountCalculated = totalAmountCalculated + element.amount

        }
    });

    console.log(totalAmountCalculated)

    // state.ETH_Address

    const totalAmountRecieved = totalAmountCalculated;
    const totalAmountRequired = state.Amount_Required;
    const amountRecievedPercent = String((totalAmountRecieved / totalAmountRequired) * 100);

    let percentWidth = amountRecievedPercent + '%';
    let donationPercentStyle = {
        width: percentWidth,
        height: '5px',
        backgroundColor: '#037362',
        borderRadius: '4px'
    }




    return (

        <div className="min-h-screen">
            <div className="gradient-bg-welcome">
                <Navbar />
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">


                    <div className="majorContainer">

                        <div style={{ display: 'flex', flexFlow: 'column' }} className="header">
                            <div>
                                <b>
                                    <p style={{ color: 'white', fontSize: '30px', fontFamily: 'sans-serif', marginLeft: '5px' }} className="heading">
                                        {state.StartUp_Name}
                                    </p>
                                </b>
                            </div>
                        </div>

                        <div className="imagePamentContainer">

                            <div className="image">

                            </div>

                            <div className="paymentContainer">

                                <div className="payment items-center justify-center">

                                    <div className="paybox p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                                        <div style={{ width: '100%' }}>

                                            <div style={{ display: 'flex' }}>
                                                <b><p style={{ color: '#AAFF00' }} >{totalAmountCalculated} ETH </p></b><p style={{ color: '#E8E8E8', marginLeft: '5px' }}> raised of {state.Amount_Required} ETH</p>
                                            </div>

                                            <div style={{ width: '90%', height: '5px', backgroundColor: '#E8E8E8', borderRadius: '4px', marginTop: '8px' }}>
                                                <div style={donationPercentStyle}></div>
                                            </div>

                                            <div>
                                                <b><p style={{ color: '#E8E8E8', fontSize: '12px', fontFamily: 'sans-serif', marginTop: '3px' }}>{ setter.length } poeple backed this project</p></b>
                                            </div>

                                            <div style={{ marginTop: '12px' }} className="h-[1px] w-full bg-gray-400 my-2" />

                                        </div>
                                        <div style={{ marginTop: '8px' }}>
                                            {/* <p style={{color:'white'}}>{state.ETH_Address}</p> */}
                                            <input placeholder="Address To" onChange={getTransactionData} name="addressTo" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                            <input placeholder="Amount (ETH)" onChange={getTransactionData} name="amount" type="number" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                            <input placeholder="Keyword (Gif)" onChange={getTransactionData} name="keyword" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                            <input placeholder="Enter Message" onChange={getTransactionData} name="message" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />

                                            <div className="h-[1px] w-full bg-gray-400 my-2" />

                                            <button onClick={sendTransaction}
                                                type="button"
                                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                            >
                                                Back This Project
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="transactions">

                        {/* <hr style={{ color: 'rgb(156,163,175)', width: '100%', marginTop: '5px', height: '3px' }} /> */}
                        <div style={{ marginTop: '30px' }}>
                            <b><p style={{ color: '#AAFF00', fontSize: '20px' }}>All Transactions</p></b>

                            <div style={{ backgroundColor: '#191819', display: 'flex', borderRadius: '10px', padding: '15px', height: '150px', width: '100%', marginTop: '14px', marginBottom: '70px' }}>

                                { 
                                    !setter.length && (
                                        <h3 style={{ color: 'white', marginTop: '35px', left: '50%', transform: 'translate(-50%, 0)', position: 'absolute' }}>Be the first to back this project.</h3>
                                    )
                                } 
                                {setter.map(transit => <InnerTransit allData={transit} />)}


                            </div>
                        </div>

                    </div>

                    <hr className="differentiatingLine" />

                    <div className="description">
                        <p style={{ fontFamily: 'monospace', color: 'white', fontSize: '15px', marginTop: '15px', lineHeight: '25px' }}>{state.About}</p>
                    </div>

                    <hr className="differentiatingLine" style={{ color: 'rgb(156,163,175)', width: '70%', marginBottom: '50px', marginTop: '7px', height: '3px' }} />

                </div>
            </div>
        </div >

    )
}

export default Ideas;