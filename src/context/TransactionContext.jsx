import { createContext, useEffect, useState } from 'react';
import { ContractAddress, ContractABI } from '../utils/Contract';
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import db from '../firebase';

const ContextProvider = createContext();

const { ethereum } = window;

const createEthereumContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(ContractAddress, ContractABI, signer);

    return transactionContract;

}


const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState();
    const [transactioData, setTransactionData] = useState({
        amount: "",
        keyword: "",
        message: "",

    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0);

    const [recievedTransactions, setRecievedTransactions] = useState([]);


    const getAllTransactions = async () => {
        if (ethereum) {

            const transactionsContract = createEthereumContract();
            const allTransactions = await transactionsContract.getAllTransactions();

            const structuredTransactions = allTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18),
                id: uuidv4()
            }))

            setRecievedTransactions(structuredTransactions);


        } else {
            console.error("Ethereum Is NOT PRESENT!");
        }
    }

    const checkIfWalletIsConnected = async () => {
        
        try {
            if (!ethereum) {
                return alert("Please Install Metamask Wallet.");
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Accounts Found!");
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllTransactions()
    }, [])

    const connectToWallet = async () => {

        try {
            if(!ethereum) {
                return alert("Please Install Metamask To Access Ethereum")
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }

    }

    const getTransactionData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setTransactionData({ ...transactioData, [name]: value })
    }

    const[ideaAddress, setIdeaAddress] = useState()
    // console.log(ideaAddress)
    const sendTransaction = async () => {

        if(!transactioData.amount || !transactioData.keyword || !transactioData.message){
            alert("Please Fill All The Details.")
            return
        }

        console.log(transactioData);

        const transactionsContract = createEthereumContract()

        const parsedAmount = ethers.utils.parseEther(transactioData.amount);

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: ideaAddress,
                gas: "0x5208",
                value: parsedAmount._hex
            }]
        })
        console.log(transactioData);

        const transactionHash = await transactionsContract.addTransaction(ideaAddress, parsedAmount, transactioData.keyword, transactioData.message)
        const innerTransationCount = await transactionsContract.transactionCount();

        setTransactionCount(innerTransationCount.toString());

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        // setTransactionCount(innerTransationCount.toString());
        // console.log();

    }
    // console.log(transactionCount);
    return (
        <ContextProvider.Provider value={{ connectToWallet, currentAccount, getTransactionData, sendTransaction, recievedTransactions, ideaAddress, setIdeaAddress }}>
            {children}
        </ContextProvider.Provider>
    );
}

export { ContextProvider };
export default TransactionsProvider;


