import React, { useState } from 'react';

function ClaimRewards({accountLoggedIn, provider, contractProvider, contractSigner} ) {
    
    const [tokenAddress, settokenAddress] = useState('Enter Token Address');

    const [isLoading, setIsLoading] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [claimDisableButton, setClaimDisableButton] = useState(false);
    const [claimButtonText, setClaimButtonText] = useState('Submit');

    const handletokenAddressChange = (event) => {
        
        settokenAddress(event.target.value);
      };

      const handleClaimRewards = async (e) => {
        e.preventDefault();
        
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
      };

      const handleClearInput = (e) => {
        if ( e.target.value === "Enter Your Address"){
        settokenAddress("");}
      }
    
    
    return (
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
        <h2 className="actionHeader"> Claim Them Rewards </h2>
            <form onSubmit={handleClaimRewards}>
            <input name="tokenAddress" className="actionInputs form-control-lg" value={tokenAddress} onClick={handleClearInput} onChange={handletokenAddressChange}></input>
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