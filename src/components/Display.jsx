import { useEffect, useState } from "react";
import DisplayItem from "./DisplayItem";
import { Link } from "react-router-dom";

import '../home.css';

import db from '../firebase';

const Display = () => {

    const [bids, setBids] = useState([
        {
            StartUp_Name: '',
            ETH_Address: '',
            What_It_Do: '',
            About: '',
            Amount_Required: 0,
            Total_ETH_Got : 0,
            display: false
        },
    
    ])

    useEffect( async ()=>{

        db.collection('startups').onSnapshot(snapshot => {
            let items = snapshot.docs.map(doc=>doc.data())
            setBids(items)
        })
        // console.log(bids)
        
    }, [])



    return (
        <div style={{width:'100%'}} className="flex justify-center items-center">
            <div className="ideasItemContainer">
                    {bids.map(bid => <DisplayItem EntireData={bid} id={bid.ETH_Address} address={bid.ETH_Address} bidDisplay={bid.dashboard} name={bid.StartUp_Name} work={bid.What_It_Do} about={bid.About} amount={bid.Amount_Required} />)}
            </div>
        </div>
    );
}

export default Display;

// className="blue-glassmorphism"