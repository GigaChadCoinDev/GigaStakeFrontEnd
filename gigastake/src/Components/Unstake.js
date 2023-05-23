import React, { useState } from 'react';
import {ethers} from 'ethers';

function Stake({ accountLoggedIn, provider, contractProvider, contractSigner}) {
    
       
    const [unstakeToken, setUnStakeToken] = useState('Token Address To Unstake');
    const [amountToUnStake, setAmountToUnStake] = useState('Amount To Unstake');

    const [isLoading, setIsLoading] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState('');
    const [unstakeDisableButton, setUnstakeDisableButton] = useState(false);
    const [unstakeButtonText, setUnstakeButtonText] = useState('Submit');

    const handleUnStakeTokenChange = (event) => {
        setUnStakeToken(event.target.value);
      };
    
      const handleUnStakeAmountChange = (event) => {
        setAmountToUnStake(event.target.value);
      };


      const handleUnStake = async (e) =>  {
        e.preventDefault();
        
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

        }
      };

                
    
    return (
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
            <h2 className="actionHeader"> Unstake </h2>
                <form onSubmit={handleUnStake}>
                <input  name="tokenAddress" className="actionInputs form-control-lg" value={unstakeToken} onChange={handleUnStakeTokenChange}></input>
                <div className="generalText">+</div>
                <input   name="stakeAmount" className="actionInputs form-control-lg" value={amountToUnStake} onChange={handleUnStakeAmountChange}></input>
                <div className="justToCenter">
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