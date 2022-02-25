import Navbar from "./Navbar";
import '../admin.css';
import { useState } from "react";
import db from '../firebase';

import { useHistory } from "react-router-dom";
import { Alert } from "@mui/material";

const Admin = () => {

    const history = useHistory();

    const [adminData, setAdminData] = useState();

    const loginData = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        
        setAdminData({...adminData, [name] : value})

    }

    const loginAdmin = () => {
        db.collection('Admin').doc('neebxTvsQExoKZxAoFzj').onSnapshot(snapshot => {
            if (snapshot.data().username == adminData.username && adminData.pin == snapshot.data().pin){
                history.push('/adminpanel')
            }else{
                Alert("Incorrect Username or Password!")
            }
        })
    }


    return (<div className="min-h-screen">
        <div className="gradient-bg-welcome">
            <Navbar />
            <div className="flex justify-center items-center" style={{height:'100vh'}}>

                <div align="center" className="adminDataContainer">
                    <b><p style={{color:'white', marginTop:'10px', fontSize:'18px'}}>Admin Access</p></b>
                    <div style={{display:'flex', flexDirection:'column', width:'90%', marginTop:"40px"}}>
                        <input onChange={loginData} name="username" type="text" className="my-4 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" placeholder="username" />
                        <input onChange={loginData} name="pin" type="password" className="my-4 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" placeholder="security pin" />
                        <button onClick={loginAdmin} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">Enter</button>
                    </div>
                </div>

            </div>
        </div>
    </div >);
}

export default Admin;