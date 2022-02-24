import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../context/TransactionContext";

import '../home.css';

const AllTransactions = (props) => {

    const gifKey = props.gif;

    const [recievedUrl, setRecievedUrl] = useState('https://media1.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif?cid=239fb4ddh1xoo6j9fmzs606mubosj2frx3aefta202iahrcl&rid=giphy.gif&ct=g');

    const gifUrl = async (keyword) => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=VEi1pwVzDxvGE9C4iBZexIP6YElHGX1F&q=${keyword.split(" ").join("")}&limit=1`

        await fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            const setGifUrl = data.data[0].images.downsized_medium.url
            setRecievedUrl(setGifUrl)
        }).catch((error)=>{
            const setGifUrl = 'https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284'
            setRecievedUrl(setGifUrl)
        })
    } 

    useEffect(()=>{
        gifUrl(gifKey)
    },[])

    
    return (<img src={recievedUrl} alt="gif" onClick={() => props.setBoard(props.id, recievedUrl)} className="transacs" style={{ width: '65px', height: '65px', border:'3px solid black', borderRadius: '100px', marginTop: '10px', marginLeft:'7px' }}></img>);
}

const Transactions = () => {

    const { recievedTransactions } = useContext(ContextProvider);

    const [dispalyTransaction, setDispalyTransaction] = useState({
        from: "Metamask Id Of Sender",
        to: "Metamask Id Of Reciever",
        url: "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
        amount: "Value funded in",
        timestamp: "",
        message: "",
        id: ""
    });

    const displayBoard = (id, recievedUrl) => {
        recievedTransactions.forEach(element => {
            if (element.id == id) {
                setDispalyTransaction({
                    from: element.addressFrom,
                    to: element.addressTo,
                    url: recievedUrl,
                    amount: element.amount,
                    timestamp: element.timestamp,
                    message: element.message,
                    id: element.id
                })
            }

        })
        // console.log(dispalyTransaction);
    }


    return (<div className=" transactionsContainer gradient-bg-transactions flex justify-center items-center">


        <div className="transactionInside">

            <div style={{ display: 'flex', paddingLeft: '7px' }}>
                {recievedTransactions.map(transaction => <AllTransactions gif={transaction.keyword} id={transaction.id} key={transaction.id} setBoard={displayBoard} />)}
            </div>
            {/* <hr style={{border:'3px solid black'}} /> */}

            <div style={{ marginLeft: '20px', marginTop: '25px' }}>
                <div style={{ display: 'flex' }}>

                    <img src={dispalyTransaction.url} alt="Some Problem Occoured!" style={{ border: '2px solid white', width: '235px', height: '235px', borderRadius: '10px' }}>

                    </img>

                    <div style={{ paddingLeft: '10px', marginRight: '30px', marginLeft:'2px' }}>
                        <b><p style={{ color: 'white', fontSize: '23px' }}># {dispalyTransaction.from}</p></b>
                        <p style={{ color: '#65676B' }}>To {dispalyTransaction.to}</p>
                        <div style={{ height: '50px', paddingTop: '17px', marginLeft: '5px' }}>
                            <b><p style={{ color: '#E15C72' }}>{dispalyTransaction.amount} ETH</p></b>
                            <p style={{ color: 'green', fontSize: '10px' }}>{dispalyTransaction.timestamp}</p>
                            <p style={{ color: 'white', fontSize: '14px', marginTop: '3px' }}>{dispalyTransaction.message}</p>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    </div>);
}

export default Transactions;