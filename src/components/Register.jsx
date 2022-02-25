import Navbar from "./Navbar";
import '../register.css';
import { useContext, useEffect, useState } from "react";
import db from '../firebase';
import { app } from "../firebase";


const Register = () => {


    const [userData, setUserData] = useState({
        About: "",
        Amount_Required: "",
        Contact_Number: "",
        ETH_Address: "",
        Insta_Or_Web: "",
        StartUp_Name: "",
        Total_ETH_Got: "",
        What_It_Do: "",
        image: ""
    });

    const [image, setImage] = useState(null);

    let name, value;

    function handleSubmmit(e) {

        if (e.target.name === "image") {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
            }
        }

        name = e.target.name;
        value = e.target.value;

        setUserData({ ...userData, [name]: value })


    }

    const subbmitData = () => {

        // if (!userData.About || !userData.Amount_Required || !userData.Contact_Number || !userData.ETH_Address || !userData.Insta_Or_Web || !userData.StartUp_Name || !userData.Total_ETH_Got || !userData.What_It_Do) {
        //     alert("Pleasse Enter All The Details!")
        //     return
        // }

        const uploadImage = app.storage().ref(`images/${image.name}`).put(image);
        uploadImage.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            async () => {
                await app.storage().ref("images").child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    setUserData({ ...userData, image: url })
                });
            }
        )
        // console.log(userData)

        db.collection('startups').add({
            About: userData.About,
            Amount_Required: Number(userData.Amount_Required),
            Contact_Number: Number(userData.Contact_Number),
            ETH_Address: userData.ETH_Address,
            Insta_Or_Web: userData.Insta_Or_Web,
            StartUp_Name: userData.StartUp_Name,
            Total_ETH_Got: Number(userData.Total_ETH_Got),
            What_It_Do: userData.What_It_Do,
            image : userData.image,
            dashboard: false,
        })

    }


    return (
        <div className="min-h-screen">
            <div style={{ height: '100vh' }} className="gradient-bg-welcome" >
                <Navbar />
                <div className="flex justify-center items-center">
                    <div className="registrationFormContainer" style={{ marginTop: '10px', padding: '15px' }}>

                        <div className="paybox p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                            <b><p style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '23px' }}>Submit Your StartUp Details</p></b>
                            <div style={{ marginTop: '13px' }}>
                                <input onChange={handleSubmmit} name="ETH_Address" placeholder="Enter Your Etherium Address" type="text" className="my-4 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                <input onChange={handleSubmmit} name="StartUp_Name" placeholder="Name Of The StartUp" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                <input onChange={handleSubmmit} name="What_It_Do" placeholder="What Your StartUp Solves" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                <div style={{ display: 'flex' }}>
                                    <input onChange={handleSubmmit} name="Contact_Number" placeholder="Contact Number" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                    <input onChange={handleSubmmit} name="Insta_Or_Web" style={{ marginLeft: '2px' }} placeholder="Instagram or Website Link" type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <input onChange={handleSubmmit} name="Amount_Required" placeholder="Amount Required (ETH)" type="number" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                    <input onChange={handleSubmmit} name="image" style={{ marginLeft: '2px' }} type="file" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
                                </div>
                                <input onChange={handleSubmmit} name="About" placeholder="Enter The Description In Brief" style={{ height: '150px' }} type="text" className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />

                                {/* <div className="h-[1px] w-full bg-gray-400 my-2" /> */}

                                <button
                                    onClick={subbmitData}
                                    type='submit'
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    Submit Your Idea
                                </button>
                            </div>
                            <div className="h-[1px] w-full bg-gray-400 my-2" />
                            <div style={{ marginTop: '10px' }}>
                                <b><p style={{ color: '#A0CB19', fontFamily: 'sans-serif', fontSize: '12px' }}>After The Subbmition Your Application Will Be Reviewed Before Getting Listed</p></b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;