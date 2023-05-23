import React, { useState } from 'react';
import {ethers} from 'ethers';

function Stake({accountLoggedIn, provider, contractProvider, contractSigner, contractAddress}) {
    
    

    const [isLoading, setIsLoading] = useState(false);
    const [disableStakeButton, setDisableStakeButton] = useState(false);
    const [stakeButtonText, setStakeButtonText] = useState("Submit");
    const [transactionMessage, setTransactionMessage] = useState('');

    let tokenABI = [
        "function approve(address _spender, uint256 _value) public returns (bool success)"
    ];
       
    const [stakeToken, setStakeToken] = useState('Token Address To Stake');
    const [amountToStake, setAmountToStake] = useState('Amount To Stake');

    const handleStakeTokenChange = (event) => {
        setStakeToken(event.target.value);
      };
    
      const handleStakeAmountChange = (event) => {
        setAmountToStake(event.target.value);
      };


      const handleStake = async (e) =>  {
        e.preventDefault();
        
        try{
            setIsLoading(true);
            setDisableStakeButton(true);
            setStakeButtonText("Approving...");
            let tempSigner = provider.getSigner();

            let tempContract = new ethers.Contract(stakeToken, tokenABI, provider);

            let tempContractSigner = tempContract.connect(tempSigner);

            var approving = await tempContractSigner.approve(contractAddress, amountToStake);
            const receipt = await approving.wait();
            
            if (receipt){
              setStakeButtonText("Confirming...");
                var staked = await contractSigner.stake(stakeToken,ethers.utils.parseUnits(amountToStake, "ether"));
                const stakedSetReceipt = await staked.wait();
                setIsLoading(false);
                setStakeButtonText("Tokens Have Been Staked");
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
          setStakeButtonText("Check message above & refresh page");


        }
      };

                
    
    return (
        
        
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
            <h2 className="actionHeader"> Stake </h2>
                <form onSubmit={handleStake}>
                <input  name="tokenAddress" className="actionInputs form-control-lg" value={stakeToken} onChange={handleStakeTokenChange}></input>
                <div className="generalText">+</div>
                <input   name="stakeAmount" className="actionInputs form-control-lg" value={amountToStake} onChange={handleStakeAmountChange}></input>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} role="button" type="submit" disabled={accountLoggedIn === null || disableStakeButton}> {stakeButtonText} </button>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                <br></br>
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                </div>
                </form>
        </>
    );
}

export default Stake;