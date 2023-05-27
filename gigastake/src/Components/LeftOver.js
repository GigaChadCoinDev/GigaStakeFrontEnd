import React, { useState } from 'react';
import {ethers} from 'ethers';

function LeftOver({accountLoggedIn, contractSigner} ) {
    
    const [revtrieveInputHeading, setrevtrieveInputHeading] = useState("");
    const [receiverInputHeading, setreceiverInputInputHeading] = useState("");

    const [tokenAddress, settokenAddress] = useState('Enter Rewards Token');

    const [isLoading, setIsLoading] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [retrieve, setretrieve] = useState(false);
    const [retrieveButtonText, setretrieveButtonText] = useState('Submit');
    const [validationMessage, setValidationMessage] = useState(null);
    const [validation2Message, setValidation2Message] = useState(null);

    const [tokenAddressToSendTo, setTokenAddressToSendTo] = useState('Where to Send Them?');
    

    const handletokenAddressChange = (event) => {
        
        settokenAddress(event.target.value);
        
        if (ethers.utils.isAddress(event.target.value) === true) {
          setValidationMessage("");
        } else {
          setValidationMessage( "Please enter a valid Eth address" );
        }
      };

    const  handletokenAddressToSendToChange = (event) => {
        setTokenAddressToSendTo(event.target.value);
        
        if (ethers.utils.isAddress(event.target.value) === true) {
          setValidation2Message("");
        } else {
          setValidation2Message( "Please enter a valid Eth address" );
        }
      };
      




      const handleLeftOver = async (e) => {
        e.preventDefault();
       
        if (ethers.utils.isAddress(tokenAddress) === true &&
        ethers.utils.isAddress(tokenAddressToSendTo) === true
        ) {
          setValidationMessage("");
        
        
        try{

          setretrieve(true);
          setretrieveButtonText("Confirming...");
          setIsLoading(true);

        var rewardsRetrieved = await contractSigner.transferLeftoverTokens(tokenAddress, tokenAddressToSendTo);
        const receipt = await rewardsRetrieved.wait();

        if ( receipt){
          setretrieveButtonText("All leftover rewards have been added to your wallet");
         setIsLoading(false);}

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

          setretrieveButtonText("Check message above & refresh page");

        }
      } else {
        setValidationMessage( "Please enter a valid Eth address" );
      }}

      const handleClearInput = (e) => {
        if ( e.target.value === "Enter Rewards Token"){
            settokenAddress("");
            setrevtrieveInputHeading("Enter token address");
        } else if (e.target.value === "Where to Send Them?"){
        setTokenAddressToSendTo("");
      setreceiverInputInputHeading("What address to send the leftover rewards to?")}
      };
    
    
    return (
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
        <h2 className="actionHeader"> Retrieve Leftover Rewards </h2>
            <form onSubmit={handleLeftOver}>
            <div className="inputHeadings">{revtrieveInputHeading}</div>
            <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress" className="actionInputs form-control-lg" value={tokenAddress} onClick={handleClearInput} onChange={handletokenAddressChange}></input>
            <div className="justToCenter"><span className='transactionText'>{validationMessage}</span></div>
            <div className="generalText">+</div>
            <div className="inputHeadings">{receiverInputHeading}</div>
            <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddressToSendTo" className="actionInputs form-control-lg" value={tokenAddressToSendTo} onClick={handleClearInput} onChange={handletokenAddressToSendToChange}></input>
            <div className="justToCenter"><span className='transactionText'>{validation2Message}</span></div>
            <div className="justToCenter">
            <button className="button-18" type="submit" style={{margin: 10}} disabled={accountLoggedIn === null|| retrieve}> {retrieveButtonText} </button>
            <br></br>
            {isLoading === true && <div className="lds-circle"><div></div></div> }
            <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
            </div>
        </form>
        </>
    );
}

export default LeftOver;