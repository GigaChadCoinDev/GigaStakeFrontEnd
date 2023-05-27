import React, { useState } from 'react';
import {ethers} from 'ethers';

function Stake({ accountLoggedIn, contractSigner}) {
    
    const [unstakeInputHeading, setunStakeInputHeading] = useState("");
    const [unstakeAmountInputHeading, setunStakeAmountInputHeading] = useState("");
       
    const [unstakeToken, setUnStakeToken] = useState('Token Address To Unstake');
    const [amountToUnStake, setAmountToUnStake] = useState('Amount To Unstake');

    const [isLoading, setIsLoading] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [unstakeDisableButton, setUnstakeDisableButton] = useState(false);
    const [unstakeButtonText, setUnstakeButtonText] = useState('Submit');
    const [validationMessage, setValidationMessage] = useState(null);
    const [validationAmountMessage, setValidationAmountMessage] = useState(null);

    const handleUnStakeTokenChange = (event) => {
        setUnStakeToken(event.target.value);
        validateFields(event);
      };
    
      const handleUnStakeAmountChange = (event) => {
        setAmountToUnStake(event.target.value);
        validateFields(event);
      };


      const handleUnStake = async (e) =>  {
        e.preventDefault();

        if ( validateFields(e) !== false){
        
        try{
          setUnstakeDisableButton(true);
          setUnstakeButtonText("Confirming...");
          setIsLoading(true);
        var unstaked = await contractSigner.unstake(unstakeToken, ethers.utils.parseUnits(amountToUnStake, "ether"));
        const unstakedReceipt = await unstaked.wait();
      if ( unstakedReceipt){
        setUnstakeButtonText("Staked tokens have been returned to your wallet");
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

          setUnstakeButtonText("Check message above & refresh page");

        }} 
      };

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
          else if (e.target.name === "unstakeAmount"){
            if ( e.target.value === ""){
              setValidationAmountMessage("Set valid amount to unstake");
              isValid = false;
            }
            else if ( e.target.value > 9999999999999999n) {
              setValidationAmountMessage("Set smaller value or contact us to bypass");
              isValid = false;
            }
            else {
              setValidationAmountMessage("");
              isValid = true;
            }
          }
          return isValid;
          
      };

      const handleClearInput = (e) => {
        if ( e.target.value === 'Token Address To Unstake'){
        setUnStakeToken("");
      setunStakeInputHeading("Enter the token address")}
        else if ( e.target.value === 'Amount To Unstake'){
          setAmountToUnStake("")
          setunStakeAmountInputHeading("Amount of tokens to unstake");
        }
      }

                
    
    return (
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
            <h2 className="actionHeader"> Unstake </h2>
                <form onSubmit={handleUnStake}>
                <div className="inputHeadings">{unstakeInputHeading}</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress" className="actionInputs form-control-lg" value={unstakeToken} onClick={handleClearInput} onChange={handleUnStakeTokenChange}></input>
                <div className="justToCenter"><span className='transactionText'>{validationMessage}</span></div>
                <div className="generalText">+</div>
                <div className="inputHeadings">{unstakeAmountInputHeading}</div>
                <input pattern="^[0-9]{1,16}$" minLength="1" maxLength="16" required  name="unstakeAmount" className="actionInputs form-control-lg" value={amountToUnStake} onClick={handleClearInput} onChange={handleUnStakeAmountChange}></input>
                <div className="justToCenter">
                <div className="justToCenter"><span className='transactionText'>{validationAmountMessage}</span></div>
                <button className="button-18" type="submit" style={{margin: 10}} disabled={accountLoggedIn === null || unstakeDisableButton}> {unstakeButtonText} </button>
                <br></br>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                </div>
                </form>
        </>
    );
}

export default Stake;