import { Link } from "react-router-dom";
import db from '../firebase';
import { ContextProvider } from "../context/TransactionContext";
import { useState, useContext, useEffect } from "react";


const DisplayItem = (props) => {

    const { recievedTransactions } = useContext(ContextProvider);

    // console.log(props)
    const [totalAmountCalculated, setTotalAmountCalculated] = useState(0);
    let total = 0;

    useEffect(()=>{

        recievedTransactions.forEach(element => {
            if (element.addressTo == props.address) {
                total = total + element.amount
                setTotalAmountCalculated(total)
            }
        });

    }, [])


    const totalAmountRecieved = totalAmountCalculated;
    const totalAmountRequired = props.EntireData.Amount_Required;
    const amountRecievedPercent = String((totalAmountRecieved / totalAmountRequired) * 100);

    let percentWidth = amountRecievedPercent + '%';
  
    let donationPercentStyle = {
        width: percentWidth,
        height: '5px',
        backgroundColor: '#037362',
        borderRadius: '4px'
    }

    let itemStyle = {
        width: "22%",
        flexFlow: 'column',
        display: 'flex',
        minWidth: "170px",
        height: "90%",
        backgroundColor: "#13131D",
        marginTop: '20px',
        marginLeft: '10px',
        display: 'block'
    }

    const AllStartUpsData = props.EntireData

    if (props.bidDisplay == false) {
        itemStyle = {
            width: "22%",
            flexFlow: 'column',
            display: 'flex',
            minWidth: "170px",
            height: "90%",
            backgroundColor: "#13131D",
            marginTop: '20px',
            marginLeft: '10px',
            display: 'none'
        }
    }


    return (
        <Link to={{ pathname: "/bid", state: AllStartUpsData }} style={itemStyle}>

            <div style={{ border: '2px solid black', width: '100%', height: "45%" }}>

            </div>
            <div style={{ flexFlow: '1', maxHeight: '105px', overflow: 'hidden', padding: '2px', paddingLeft: '12px', paddingRight: '12px' }}>
                <b><h1 style={{ color: 'white' }}>{props.name}</h1></b>
                <b><p style={{ color: '#AAFF00', fontSize: '14px' }}>{props.work}</p></b>
                <div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'white' }}>{props.about}</p>
                </div>
            </div>
            <div style={{ position: "relative", padding: "4px", bottom: "0px", paddingLeft: '12px', paddingRight: '12px' }}>
                {/* <b><p style={{color:"grey", fontFamily:'sans-serif', fontSize:'12px'}}>Donation Ends in 5 days</p></b> */}
                <div style={{ width: '100%', height: '5px', backgroundColor: '#E8E8E8', borderRadius: '4px', marginTop: '5px' }}>
                    <div style={donationPercentStyle}></div>
                </div>
                <div style={{ padding: '2px', marginTop: '2px', display: 'flex' }}>
                    <b><p style={{ color: '#AAFF00' }}>{totalAmountCalculated}</p></b><b><p style={{ fontSize: '13px', color: '#AAFF00', marginLeft: '5px', marginTop: '3px' }}>raised of {props.amount} ETH</p></b>
                </div>
            </div>

        </Link>);
}

export default DisplayItem;