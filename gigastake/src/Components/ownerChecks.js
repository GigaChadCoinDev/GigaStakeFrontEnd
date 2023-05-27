import React, { useState } from 'react';
import {ethers} from 'ethers';

function OwnerChecks({accountLoggedIn, contractProvider}) {
    
    
    const [transactionMessage, setTransactionMessage] = useState('');


    const [checkText, setCheckText] = useState('Enter Token Address');

    const [checkRewardsAndDurationMessage, setCheckRewardsAndDurationMessage] = useState(null);
    const [uniqueTokensStaked, setUniqueTokensStaked] = useState(null);
       
    const [rewardsCheckMessage, setRewardsCheckMessage] = useState(null);


      const handleDurationRewardCheck = (event) => {
        setCheckText(event.target.value);
        validateFields(event);
      };
      

      const handleRewardsInfoCheck = async (e) => {
        e.preventDefault();
        var finishAt = await contractProvider.finishAt(checkText);
        var dateObj = new Date(finishAt * 1000);
        const date = dateObj.toLocaleDateString()
        const time = dateObj.toLocaleTimeString(); 
  
        var rewardsAdded = await contractProvider.rewardsAdded(checkText);
        var rewardsAddedThisDuration = rewardsAdded.toString();
  
        var totalStaked = await contractProvider.totalSupply(checkText);
        var totalAmountOfThisTokenStaked = totalStaked.toString();
        
        setCheckRewardsAndDurationMessage(
          "This token has had a total of " + rewardsAddedThisDuration + 
          " rewards added with avaiability until " + date + " " + time +
          ". This token has a total of " + {totalAmountOfThisTokenStaked} 
          + " tokens staked currently."
        );
          
        }
        

        const handleGetUniqueTokensStaked = async (e) => {
            e.preventDefault();
            var tokensCount = await contractProvider.totalSupply();
            console.log(tokensCount);
            //setUniqueTokensStaked(tokensCount);
        }

      const validateFields = (e) => {
        var isValid = true; 
       
       
         if (e.target.name === "tokenAddress3"){
          if (ethers.utils.isAddress(e.target.value) !== true){
            setRewardsCheckMessage("Please enter a valid ETH address");
            isValid = false;
          } else {
            setRewardsCheckMessage("");
            isValid = true;
          }
         }
         return isValid;
         
     }

     const handleClearInput = (e) => {
      if ( e.target.value === 'Enter Token Address'){
        setCheckText("");
      }
    }

                
    
    return (
        
        
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
                          <br></br>

                <h4 className="actionHeader"> Various Checks: </h4>
                <form onSubmit={handleGetUniqueTokensStaked}>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress3" className="actionInputs" value={checkText} onClick={handleClearInput} onChange={handleDurationRewardCheck}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsCheckMessage}</span></div>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get number of unique tokens staked: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                {uniqueTokensStaked}
                </div>
                </form>

                <br></br>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get token address at index: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                </div>
                </form>

                <br></br>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get number of unique RMs: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                </div>
                </form>

                <br></br>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get RM address at index: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                </div>
                </form>

                <br></br>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get numbers of stakers: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                </div>
                </form>

                <br></br>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="justToCenter">
                    <br></br><br></br>
                <h6 className="actionHeader"> Get staker at index: </h6>
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                </div>
                </form>
        </>
    );
}

export default OwnerChecks;