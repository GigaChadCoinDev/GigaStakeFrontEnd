import React, { useState } from 'react';
import {ethers} from 'ethers';
import Form from 'react-bootstrap/Form';

function ClaimRewards({accountLoggedIn, contractSigner} ) {
    
  const [claimInputHeading, setclaimInputHeading] = useState("");

    const [tokenAddress, settokenAddress] = useState('Enter Token Address');

    const [isLoading, setIsLoading] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [claimDisableButton, setClaimDisableButton] = useState(false);
    const [claimButtonText, setClaimButtonText] = useState('Submit');
    const [validationMessage, setValidationMessage] = useState(null);

    const handletokenAddressChange = (event) => {
        
        settokenAddress(event.target.value);
        
        if (ethers.utils.isAddress(event.target.value) === true) {
          setValidationMessage("");
        } else {
          setValidationMessage( "Please enter a valid Eth address" );
        }
      };


      const handleClaimRewards = async (e) => {
        e.preventDefault();

        if (validateFields(e) !== false) {
          setValidationMessage("");
        
        
        try{

          setClaimDisableButton(true);
          setClaimButtonText("Confirming...");
          setIsLoading(true);

        var rewardsClaimed = await contractSigner.getReward(tokenAddress);
        const receipt = await rewardsClaimed.wait();

        if ( receipt){
          setClaimButtonText("Rewards have been added to your wallet");
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

          setClaimButtonText("Check message above & refresh page");

        }
      } else {
        setValidationMessage( "Please enter a valid Eth address" );
      }}

      const handleClearInput = (e) => {
        if ( e.target.value === "Enter Token Address"){
        settokenAddress("");
      setclaimInputHeading("Enter the token address");}
      }

      const validateFields = (e) => {
        var isValid = true; 
       
         if (e.target.name === "tokenAddress"){
           if (ethers.utils.isAddress(e.target.value) !== true){
             setValidationMessage("Please enter a valid ETH address");
             isValid = false;
           } else {
             setValidationMessage("");
             isValid = true;
           }} 
          
          return isValid;
          
          }
    
    
    return (
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
        <h2 className="actionHeader"> Claim Them Rewards </h2>
            <form onSubmit={handleClaimRewards}>
            <div className="inputHeadings">{claimInputHeading}</div>
            <Form.Select name="tokenAddress" className="actionInputs form-control-lg" value={tokenAddress} onChange={handletokenAddressChange}>
                <option>Select a Token</option>
                <option value="0xBd7E249F4C292a13b199d0303cAd0654B7CB6968">GigaChad Coin (0xBd...6968) </option>
                </Form.Select>


          {/*   <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress" className="actionInputs form-control-lg" value={tokenAddress} onClick={handleClearInput} onChange={handletokenAddressChange}></input> */}
            <div className="justToCenter"><span className='transactionText'>{validationMessage}</span></div>
            <div className="justToCenter">
            <button className="button-18" type="submit" style={{margin: 10}} disabled={accountLoggedIn === null|| claimDisableButton}> {claimButtonText} </button>
            <br></br>
            {isLoading === true && <div className="lds-circle"><div></div></div> }
            <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
            </div>
        </form>
        </>
    );
}

export default ClaimRewards;