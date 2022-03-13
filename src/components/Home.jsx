import Navbar from './Navbar';
import Welcome from './Welcome';
import Display from './Display';
import Transactions from './Transactions';
import { useEffect, useState } from 'react';


const Home = () => {

    const [zindexStyles, setZindexStyles] = useState({
        zIndex: 1,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        position: 'absolute',
        borderRadius: '25px',
        opacity: 0.95,
        marginTop: '15px',
    });


    useEffect(()=>{

        if (window.innerWidth > 708){
            setZindexStyles({ 
                display: 'none',
            })
            // console.log('loool')
        }

        // window.addEventListener(handleResize)
        // window.addEventListener(window.innerWidth)

    }, [window.innerWidth])

    

    return (
        <div className="min-h-screen">
            <div style={zindexStyles}>
                <div style={{padding:'30px'}}>
                    <b><p style={{color:"white", marginTop:"50%"}} >Please open the site in PC to access Metamask wallet, and make and see transactions.</p></b>
                </div>
            </div>
            <div className="gradient-bg-welcome">
                <Navbar />
                <Welcome />
                <Display />
                <Transactions />
            </div>
        </div>
    );
}

export default Home;