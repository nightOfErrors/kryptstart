import Navbar from './Navbar';
import Welcome from './Welcome';
import Display from './Display';
import Transactions from './Transactions';


const Home = () => {

    return (
        <div className="min-h-screen">
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