import styles from '../App.css';
import React, { useState } from 'react';
import {ethers} from 'ethers';
import gigastake_abi from './gigastake_abi.json';


function AuthMan( {accountLoggedIn, provider, contractProvider, contractSigner} ) {
    
    const [token, setToken] = useState('Token Address');
    const [manager, setManager] = useState('Address To Authorize');

    const [tokenIsAuth, setTokenIsAuth] = useState('Token Address');
    const [managerIsAuth, setManagerIsAuth] = useState('Address To Check');


    const [testVar, setTestVar] = useState(null);
    const [isAuthed, setIsAuthed] = useState(null);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [authorizeDisableButton, setAuthorizeDisableButton] = useState(false);
    const [authorizeButtonText, setAuthorizeButtonText] = useState('Authorize');
    const [isLoading, setIsLoading] = useState(false);

    const handleTokenChange = (event) => {
        setToken(event.target.value);
      };
    
      const handleManagerChange = (event) => {
        setManager(event.target.value);
      };

      const handleTokenIsAuthChange = (event) => {
        setTokenIsAuth(event.target.value);
      };
    
      const handleManagerIsAuthChange = (event) => {
        setManagerIsAuth(event.target.value);
      };


      const handleAuth = async (e) =>  {
        e.preventDefault();
        
        try{
          setAuthorizeDisableButton(true);
          setAuthorizeButtonText("Confirming...");
          setIsLoading(true);
        var authorizing = await contractSigner.authorizeRewardManager(token,manager);
        const receipt = await authorizing.wait();
      if ( receipt){
        setAuthorizeButtonText("Complete");
       setIsLoading(false);
      }
        } catch (error){
          console.log(error);
          if ('data' in error){
            setTransactionMessage(JSON.stringify(error.data.message));
          } 
          
          else if ('reason' in error) {
            setTransactionMessage(JSON.stringify(error.reason));
          }
          else {
         setTransactionMessage(JSON.stringify(error.reason)); }
            setIsLoading(false);

          setAuthorizeButtonText("Check message above & refresh page");
        
        
        }
      };

      const handleAuthCheck = async (e) =>{
       
        try{
        
        e.preventDefault();
        var isAuthed = await contractProvider.rewardManagers(tokenIsAuth, managerIsAuth);
        if (isAuthed) {setTestVar("You are a rewards manager" );} else {setTestVar("You are not Authed" ); }
        
      
      } catch (error){
        console.log(error);
        setTransactionMessage(JSON.stringify(error));
      }
      
      
      };
    
    
    return( 
        <>
        <span className="transactionText">{transactionMessage}</span>
        <h2 className="actionHeader"> Authorize Rewards Manager </h2>
                <form onSubmit={handleAuth}>
                  <h3 className="actionHeader">Authorize Manager</h3>
                <input  name="tokenAddress" className="actionInputs form-control-lg"  value={token} onChange={handleTokenChange} ></input>
                <div className="generalText">+</div>
                <input   name="rewardsManagerAddress" className="actionInputs form-control-lg"  value={manager} onChange={handleManagerChange}></input>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null || authorizeDisableButton} > {authorizeButtonText} </button>
                </div></form>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                <form onSubmit={handleAuthCheck}>
                <h3 className="actionHeader" >Check If Authed </h3>
                <input  name="tokenAddress" className="actionInputs form-control-lg" value={tokenIsAuth} onChange={handleTokenIsAuthChange}></input>
                <div className="generalText">+</div>
                <input   name="rewardsManagerAddress" className="actionInputs form-control-lg"  value={managerIsAuth} onChange={handleManagerIsAuthChange}></input>
                <div className="justToCenter">
                
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Check </button>
                <br></br>
                <span className="generalText">{testVar}</span>
                </div>          
                </form>
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                
                </>
    );
}

export default AuthMan;