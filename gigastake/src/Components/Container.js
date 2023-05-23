import styles from '../App.css';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import AuthMan from './AuthMan';
import {ethers} from 'ethers';
import gigastake_abi from './gigastake_abi.json';
import AddRewards from './AddRewards';
import Stake from './stake';
import Unstake from './Unstake';
import ClaimRewards from './ClaimRewards';
import Navbar from './Navbar';
import {Route, Routes} from "react-router-dom";
import Welcome from './Welcome';

//import { Connect, authorizeRewardManager } from '../block.js';


function Container() {


    //const tokenAddress = "0xc1EA5572c1b72a61E068d5A5D23747F2cB315C88";
    //const testAccountAddress = "0x3e0F6f247Ec73e49C947C378d19f35fEd76f4f4f";
    const contractAddress = "0x1a13Cf460f8c2Ba9E08C98309ba451e544624Bf4";

    const [errorMessage, setErrorMessage] = useState(null);
    const [accountLoggedIn, setAccountLoggedIn] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");


    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractSigner, setContractSigner] = useState(null);
    const [contractVal, setContractVal] = useState(null);
    

    const connectWalletHandler = () => {
           try{
        
            if (window.ethereum) {
                    window.ethereum.request({method: "eth_requestAccounts"})
                    .then(result => {
                        accountChangedHandler(result[0]);
                        setConnectButtonText("Wallet Connected");
                    })
            } else {
                setErrorMessage('Need to install Metamask');
            } }
            catch(error){
                console.log(error);
            }
    }

    const accountChangedHandler = (newAccount) => {
        setAccountLoggedIn(newAccount.slice(0,5) + "..." + newAccount.slice(-4,));
        updateEthers();
    }

    /*
    const getAccountEthBalance = async () => {
        try {
        var balance = await provider.getBalance(accountLoggedIn);
        setContractVal(ethers.utils.formatEther(balance)); }
        catch (error){
            console.log(error);
        }
        
       // var contractName = await contract.rewardsManager();
       // console.log(contractName);
       
       //await contractSigner.authorizeRewardManager(tokenAddress, testAccountAddress);

        //contractSigner.setRewardsDuration(tokenAddress, 1000);
    }   */

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, gigastake_abi, tempProvider);
        setContract(tempContract);

        let tempContractSigner = tempContract.connect(tempSigner);
        setContractSigner(tempContractSigner);

        
    }

    return (
        <div>
        
        <Navbar connectWalletHandler={connectWalletHandler} connectButtonText={connectButtonText} />
        
        <div className="container">
        <div className="navigation">
             {/*
            <div className="navigation-head">
            <i className="uil uil-align-left">
            <Icon icon="uil:align-left" />
            </i>
            
            </div> */}

            <div  className="grid">
               {/* <div className="navigation-menu">
                    <span className="flex">
                        <i className="uil uil-estate">
                            <Icon icon="uil:estate" />
                        </i>
                        <small>Home</small>
                    </span>
                    <span className="flex">
                        <i className="uil uil-trophy"><Icon icon="uil:trophy" /></i>
                        <small>Project</small>
                    </span>
                    <span className="flex">
                        <i className="uil uil-bill"><Icon icon="uil:bill" /></i>
                        <small>Socials</small>
                    </span>
                    <span className="flex">
                        <i className="uil uil-graph-bar"><Icon icon="uil:graph-bar" /></i>
                        <small>Buy GigaChad</small>
                    </span>
                    <span className="flex">
                        <i className="uil uil-cog"><Icon icon="uil:cog" /></i>
                        <small>Whitepaper</small>
                    </span>
                    <div>
                    {errorMessage}
                </div>
                </div> */}

                
                
                <div className="navigation">
                <i className="uil uil-user"><Icon icon="uil:user" /></i>
                
            {/*   <button className="button-18" role="button" onClick={getAccountEthBalance} disabled={accountLoggedIn === null}> Get Balance </button> */}
                <span className="flex"> Account: {accountLoggedIn} </span> 
                <div></div>
             {/*   <span > Eth Balance: {contractVal} </span>   */}
                </div>

            </div>
        </div>



        <div className="main-container">
            {/*
            
            <div className="box" data="1">
                <img src={"/img/gigachadPNG1_Cartoon.png"} />
                <div className="box" >
                <ClaimRewards accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} />
                </div>
            </div>
                     
            <div className="box" data="1">
                <AuthMan  accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner}  />
            </div>
            <div className="box" data="1">
            <AddRewards accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} contractAddress={contractAddress}/>
            </div>
            
            <div className="box" data="1">
            
            </div>
                    */}

                  
            <div className="box" data="1">
            
            <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/claimrewards" element={<ClaimRewards accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} />} />
            <Route path="/authorize" element={<AuthMan  accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner}  />} />
            <Route path="/addrewards" element={<AddRewards accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} contractAddress={contractAddress} />}/>
            <Route path="/stake" element={<Stake accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} contractAddress={contractAddress}  />} />
            <Route path="/unstake" element={<Unstake accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} />} />
            </Routes>  
            </div> 

        </div>
        
        </div>
        
        
        
        </div>
    );
}

export default Container;


