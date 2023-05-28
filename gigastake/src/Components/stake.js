import React, { useState } from 'react';
import {ethers} from 'ethers';
import Form from 'react-bootstrap/Form';

function Stake({accountLoggedIn, provider, contractProvider, contractSigner, contractAddress}) {
    
    const [pleaseAllowMessage, setPleaseAllowMessage] = useState("Allow at least 60 seconds before refreshing");
    const [stakeInputHeading, setStakeInputHeading] = useState("");
    const [stakeAmountInputHeading, setStakeAmountInputHeading] = useState("");
    const [checkInputHeading, setCheckInputHeading] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [disableStakeButton, setDisableStakeButton] = useState(false);
    const [stakeButtonText, setStakeButtonText] = useState("Submit");
    const [transactionMessage, setTransactionMessage] = useState('');

    const [validationMessage, setValidationMessage] = useState(null);
    const [validationAmountMessage, setValidationAmountMessage] = useState(null);

    const [checkText, setCheckText] = useState('Enter Token Address');

    const [checkRewardsAndDurationMessage, setCheckRewardsAndDurationMessage] = useState(null);

    let tokenABI = [
        "function approve(address _spender, uint256 _value) public returns (bool success)"
    ];
       
    const [stakeToken, setStakeToken] = useState('Token Address To Stake');
    const [amountToStake, setAmountToStake] = useState('Amount To Stake');
    const [rewardsCheckMessage, setRewardsCheckMessage] = useState(null);

    const handleStakeTokenChange = (event) => {
        setStakeToken(event.target.value);
        validateFields(event);
      };
    
      const handleStakeAmountChange = (event) => {
        setAmountToStake(event.target.value);
        validateFields(event);
      };

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
          "This token has had a total of " + ethers.utils.formatUnits(rewardsAddedThisDuration, "ether") + 
          " rewards added with avaiability until " + date + " " + time +
          ". This token has a total of " + ethers.utils.formatUnits(totalAmountOfThisTokenStaked, "ether")
          + " tokens staked currently."
        );
          
        }

      const handleStake = async (e) =>  {
        e.preventDefault();
        if ( validateFields(e) !== false){
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
      }};


      const validateFields = (e) => {
        var isValid = true; 
        const amountRegex = /^[0-9]{1,16}$/;
       
         if (e.target.name === "tokenAddress"){
           if (ethers.utils.isAddress(e.target.value) !== true){
             setValidationMessage("Please enter a valid ETH address");
             isValid = false;
           } else {
             setValidationMessage("");
             isValid = true;
           }}
         else if (e.target.name === "stakeAmount"){
           if ( e.target.value === ""){
             setValidationAmountMessage("Set valid amount to stake");
             isValid = false;
           }
           else if ( e.target.value > 9999999999999999n) {
             setValidationAmountMessage("Set smaller value or contact us to bypass");
             isValid = false;
           }
           else if (!e.target.value.match(amountRegex)){
            
            setValidationAmountMessage("Please input valid stake amount");
            isValid = false;
          }
           
           else {
             setValidationAmountMessage("");
             isValid = true;
           }
         }
         else if (e.target.name === "tokenAddress3"){
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
      if ( e.target.value === 'Token Address To Stake'){
      setStakeToken("");
      setStakeInputHeading("Address of the token to stake");
    }
      else if ( e.target.value === 'Amount To Stake'){
        setAmountToStake("");
        setStakeAmountInputHeading("Amount of tokens to stake");
      }
      else if ( e.target.value === 'Enter Token Address'){
        setCheckText("");
        setCheckInputHeading("Enter token address to check");
      }
    }

                
    
    return (
        
        
        <>
        <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
            <h2 className="actionHeader"> Stake </h2>
                <form onSubmit={handleStake}>
                <div className="inputHeadings">{stakeInputHeading}</div>
                <Form.Select name="tokenAddress" className="actionInputs form-control-lg" value={stakeToken} onChange={handleStakeTokenChange}>
                <option>Select a Token</option>
                <option value="0xBd7E249F4C292a13b199d0303cAd0654B7CB6968">GigaChad Coin (0xBd...6968) </option>
                </Form.Select>
          {/*  <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress" className="actionInputs form-control-lg" value={stakeToken} onClick={handleClearInput} onChange={handleStakeTokenChange}></input>  */}  
                <div className="justToCenter"><span className='transactionText'>{validationMessage}</span></div>
                <div className="generalText">+</div>
                <div className="inputHeadings">{stakeAmountInputHeading}</div>
                <input  pattern="^[0-9]{1,16}$" minLength="1" maxLength="16" required name="stakeAmount" className="actionInputs form-control-lg" value={amountToStake} onClick={handleClearInput} onChange={handleStakeAmountChange}></input>
                <div className="justToCenter"><span className='transactionText'>{validationAmountMessage}</span></div>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} role="button" type="submit" disabled={accountLoggedIn === null || disableStakeButton}> {stakeButtonText} </button>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                {isLoading === true && <div className='generalText'>{pleaseAllowMessage}</div> }
                <br></br>
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                </div>
                </form>


                <br></br>
                <br></br>

                <h4 className="actionHeader"> Check Rewards & Duration of a Token: </h4>
                <form onSubmit={handleRewardsInfoCheck}>
                <div className="inputHeadings">{checkInputHeading}</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress3" className="actionInputs" value={checkText} onClick={handleClearInput} onChange={handleDurationRewardCheck}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsCheckMessage}</span></div>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null} > Submit </button>
                <br></br>
                
                <span className="generalText"> {checkRewardsAndDurationMessage} </span> 
                
                <br></br>
                </div>
                </form>
        </>
    );
}

export default Stake;