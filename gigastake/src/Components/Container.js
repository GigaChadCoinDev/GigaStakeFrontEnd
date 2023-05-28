
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
import OwnerChecks from './ownerChecks';
import LeftOver from './LeftOver';
import Terms from './Terms';




function Container() {


    
    const contractAddress = "0xae2Bb4450D4d18c18AB7352E75e734B8a5427D76";

    const [errorMessage, setErrorMessage] = useState(null);
    const [accountLoggedIn, setAccountLoggedIn] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
    const [connectButtonDisabled, setConnectButtonDisabled] = useState(false);


    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractSigner, setContractSigner] = useState(null);
    const [contractVal, setContractVal] = useState(null);
    

    const connectWalletHandler = () => {
           try{
            
                
            if (window.ethereum) {
                setConnectButtonDisabled(true);
                    window.ethereum.request({method: "eth_requestAccounts"})
                    .then(result => {
                        accountChangedHandler(result[0]);
                        setConnectButtonText("Wallet Connected");
                        setErrorMessage('');
                    }).catch ((e) => {
                        console.log(e);
                        if ('data' in e){
                            setErrorMessage(JSON.stringify(e.data.message));
                          } 
                          
                          else if ('reason' in e) {
                            setErrorMessage(JSON.stringify(e.reason));
                          }
                          else if ('message' in e) {
                            setErrorMessage(JSON.stringify(e.message));
                          }
                          else {
                            setErrorMessage("Something went wrong, please refresh page");}
                        setConnectButtonText("Refresh Page To Try Again");
                        
                    })
            } else {
                setErrorMessage('Need to install Metamask');
            } }
            catch(error){
                
                console.log(error);
                setConnectButtonText("Refresh Page To Try Again");
            }
    }

    const accountChangedHandler = (newAccount) => {
        setAccountLoggedIn(newAccount.slice(0,5) + "..." + newAccount.slice(-4,));
        
        updateEthers();
    }

    

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
        
        <Navbar connectWalletHandler={connectWalletHandler} connectButtonText={connectButtonText} connectButtonDisabled={connectButtonDisabled} />
        
        <div className="container">
        <div className="navigation">
             

            <div  className="grid">
               

                
                
                <div className="navigation">
                <i className="uil uil-user"><Icon icon="uil:user" /></i>
                
            
                <span className="flex"> Account: {accountLoggedIn} </span> 
                <div></div>
          
                </div>

            </div>
        </div>



        <div className="main-container">
       

           { errorMessage && <div className="justToCenter"><span className='transactionText'>{errorMessage}</span></div>      }
            <div className="box" data="1">
            
            <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/claimrewards" element={<ClaimRewards accountLoggedIn={accountLoggedIn}  contractSigner={contractSigner} />} />
            <Route path="/authorize" element={<AuthMan  accountLoggedIn={accountLoggedIn}  contractProvider={contract} contractSigner={contractSigner}  />} />
            <Route path="/addrewards" element={<AddRewards accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} contractAddress={contractAddress} />}/>
            <Route path="/stake" element={<Stake accountLoggedIn={accountLoggedIn} provider={provider} contractProvider={contract} contractSigner={contractSigner} contractAddress={contractAddress}  />} />
            <Route path="/unstake" element={<Unstake accountLoggedIn={accountLoggedIn}  contractSigner={contractSigner} />} />
            <Route path="/ownerChecks" element={<OwnerChecks accountLoggedIn={accountLoggedIn}  contractProvider={contract}  />} />
        {/*     <Route path="/leftOver" element={<LeftOver accountLoggedIn={accountLoggedIn}  contractSigner={contractSigner}  />} /> */}
            </Routes>  
            </div> 

        </div>
        
        </div>
        
        
        
        </div>
    );
}

export default Container;


