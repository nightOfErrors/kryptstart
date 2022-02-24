import { useEffect, useState } from 'react';
import '../admin.css';
import db from '../firebase';


const AdminDashboard = (props) => {

    const [approval, setApproval] = useState(false)
    // const [allStartups, setAllStartups] = useState([]);

    let buttonText = "Approve";


    if (approval == false) {
        buttonText = "Approve";
    } else {
        buttonText = "Disapprove";
    }


    function approvePressed() {

        if (approval == false) {
            // setApproval(true)

            db.collection('startups').doc(props.id).set({
                dashboard: true
            }, { merge: true })


        } else {
            // setApproval(false)

            db.collection('startups').doc(props.id).set({
                dashboard: false
            }, { merge: true })

        }

    }

    useEffect(async () => {

        db.collection('startups').doc(props.id).onSnapshot(snapshot => {
            if (snapshot.data().dashboard == false) {
                setApproval(false)
            } else {
                setApproval(true)
            }
        })

    }, [approvePressed])





    return (<div style={{ border: '2px solid white', width: '40%', height: '300px', backgroundColor: '#13131D', padding: '12px', margin: '15px' }}>

        <div style={{ height: '80%', padding: '5px', overflowY: 'auto' }}>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>Name : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.name} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>Eth Address : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.eth} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>Amount Asked : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.reqAmount} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>Contact No. : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.phone} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>Site : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.instaweb} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>What It solves : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.work} </p></b></div>
            <div style={{ display: 'flex' }}><b><p style={{ color: '#AAFF00', fontSize: '12px' }}>About : </p></b><b><p style={{ color: 'white', marginLeft: '5px', fontSize: '12px' }}> {props.about} </p></b></div>
        </div>
        <div align="center" style={{ height: "20%" }}>
            <button onClick={approvePressed} className="approvalButton">
                {buttonText}
            </button>
        </div>

    </div>);
}

export default AdminDashboard;