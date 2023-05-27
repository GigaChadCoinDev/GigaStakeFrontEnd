
import React, { useState } from 'react';
import {ethers} from 'ethers';



function AuthMan( {accountLoggedIn, contractProvider, contractSigner} ) {
    
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

    const [authTokenMessage, setAuthTokenMessage] = useState(null);
    const [authAddressMessage, setAuthAddressMessage] = useState(null);

    const [checkTokenMessage, setCheckTokenMessage] = useState(null);
    const [checkAddressMessage, setCheckAddressMessage] = useState(null);


    const handleTokenChange = (event) => {
        setToken(event.target.value);
        validateFields(event);
      };
    
      const handleManagerChange = (event) => {
        setManager(event.target.value);
        validateFields(event);
      };

      const handleTokenIsAuthChange = (event) => {
        setTokenIsAuth(event.target.value);
        validateFields(event);
      };
    
      const handleManagerIsAuthChange = (event) => {
        setManagerIsAuth(event.target.value);
        validateFields(event);
      };


      const handleAuth = async (e) =>  {
        e.preventDefault();
        if ( validateFields(e) !== false){
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
        
        
        }}
      };

      const handleAuthCheck = async (e) =>{
       
         e.preventDefault();


        if ( validateFields(e) !== false){
        try{
        
        
        
        var isAuthed = await contractProvider.rewardManagers(tokenIsAuth, managerIsAuth);
        if (isAuthed) {setTestVar("You are a rewards manager" );} else {setTestVar("You are not Authed" ); }
        
      
      } catch (error){
        console.log(error);
        setTransactionMessage(JSON.stringify(error));
      }}
      
      
      };


      const validateFields = (e) => {
        var isValid = true; 
        
       
         if (e.target.name === "tokenAddress"){
           if (ethers.utils.isAddress(e.target.value) !== true){
             setAuthTokenMessage("Please enter a valid ETH address");
             isValid = false;
           } else {
             setAuthTokenMessage("");
             isValid = true;
           }}
           else if (e.target.name === "rewardsManagerAddress"){
            if (ethers.utils.isAddress(e.target.value) !== true){
              setAuthAddressMessage("Please enter a valid ETH address");
              isValid = false;
            } else {
              setAuthAddressMessage("");
              isValid = true;
            }
           }
           else if (e.target.name === "tokenAddressCheck"){
            if (ethers.utils.isAddress(e.target.value) !== true){
              setCheckTokenMessage("Please enter a valid ETH address");
              isValid = false;
            } else {
              setCheckTokenMessage("");
              isValid = true;
            }
           }
           else if (e.target.name === "rewardsManagerAddressCheck"){
            if (ethers.utils.isAddress(e.target.value) !== true){
              setCheckAddressMessage("Please enter a valid ETH address");
              isValid = false;
            } else {
              setCheckAddressMessage("");
              isValid = true;
            }
           }
         
         return isValid;
         
     };


     const handleClearInput = (e) => {
      
      if ( e.target.value === 'Token Address'){
       if ( e.target.name === "tokenAddress"){
        setToken("");
       }
       else if ( e.target.name === "tokenAddressCheck"){
          setTokenIsAuth("");
       }
    }
      else if ( e.target.value === 'Address To Authorize'){
        setManager("");
      }
      else if ( e.target.value === 'Address To Check'){
        setManagerIsAuth("");
      }
    }
    
    
    return( 
        <>
        <span className="transactionText">{transactionMessage}</span>
        <h2 className="actionHeader"> Authorize Rewards Manager </h2>
                <form onSubmit={handleAuth}>
                  <h3 className="actionHeader">Authorize Manager</h3>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required  name="tokenAddress" className="actionInputs form-control-lg"  value={token} onClick={handleClearInput} onChange={handleTokenChange} ></input>
                <div className="justToCenter"><span className='transactionText'>{authTokenMessage}</span></div>
                <div className="generalText">+</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required  name="rewardsManagerAddress" className="actionInputs form-control-lg"  value={manager} onClick={handleClearInput} onChange={handleManagerChange}></input>
                <div className="justToCenter"><span className='transactionText'>{authAddressMessage}</span></div>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null || authorizeDisableButton} > {authorizeButtonText} </button>
                </div></form>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                <form onSubmit={handleAuthCheck}>
                <h3 className="actionHeader" >Check If Authed </h3>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddressCheck" className="actionInputs form-control-lg" value={tokenIsAuth} onClick={handleClearInput} onChange={handleTokenIsAuthChange}></input>
                <div className="justToCenter"><span className='transactionText'>{checkTokenMessage}</span></div>
                <div className="generalText">+</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required  name="rewardsManagerAddressCheck" className="actionInputs form-control-lg"  value={managerIsAuth} onClick={handleClearInput} onChange={handleManagerIsAuthChange}></input>
                <div className="justToCenter"><span className='transactionText'>{checkAddressMessage}</span></div>
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