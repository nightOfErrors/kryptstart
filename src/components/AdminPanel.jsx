import Navbar from "./Navbar";
import AdminDashboard from "./AdminDashboard";
import db from '../firebase';
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

const AdminPanel = () => {

    const [startupData, setStartupData] = useState([{
        data: {
            StartUp_Name: '',
            What_It_Do: '',
            About: '',
            Amount_Required: 0,
            Total_ETH_Got: 0,

        },
        id :""
    }]);



    useEffect(async () => {


        db.collection('startups').onSnapshot(snapshot => {
            // let attained = snapshot.docs.map(doc => doc.data())
            let attained = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
            setStartupData(attained)
            // console.log(attained)
            // {id: doc.id, doc.data()}
        })

    }, [])




    return (<div>

        <div className="min-h-screen">
            <div className="gradient-bg-welcome">

                <Navbar />
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10" style={{ width: '100%', height: '100vh', padding: '20px' }}>
                    <div className="blue-glassmorphism" style={{ width: '60%', padding: '15px', height: '80%', overflowY: 'auto' }}>
                        <b><p style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '25px', position: 'fixed' }}>All Startups Applied</p></b>
                        <div style={{ display: 'flex', padding: '15px', marginTop: '20px', flexWrap: 'wrap' }}>

                            {startupData.map(data => <AdminDashboard name={data.data.StartUp_Name}
                                eth={data.data.ETH_Address} reqAmount={data.data.Amount_Required}
                                phone={data.data.Contact_Number} instaweb={data.data.Inata_Or_Web}
                                work={data.data.What_It_Do} about={data.data.About} dashboard={data.data.dashboard}
                                id={data.id}
                            />)}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>);
}

export default AdminPanel;