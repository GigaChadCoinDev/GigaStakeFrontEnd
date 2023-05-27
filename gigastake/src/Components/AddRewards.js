
import React, { useState } from 'react';
import {ethers} from 'ethers';



function AddRewards( {accountLoggedIn, provider, contractProvider, contractSigner, contractAddress} ) {
    
    const [durationInputHeading, setDurationInputHeading] = useState("");
    const [durationAmountInputHeading, setDurationAmountInputHeading] = useState("");
    const [durationExample, setDurationExample] = useState("");

    const [addRewardsInputHeading, setAddRewardsInputHeading] = useState("");
    const [addRewardsAmountInputHeading, setAddRewardsAmountInputHeading] = useState("");
    const [checkInputHeading, setCheckInputHeading] = useState("");

    const [pleaseAllowMessage, setPleaseAllowMessage] = useState("Wait at least 60 seconds before refreshing");
    const [durationToken, setDurationToken] = useState('Rewards Token Address');
    const [duration, setDuration] = useState(0);
    
    const [rewardAddToken, setRewardAddToken] = useState('Rewards Token Address');
    const [amountToAdd, setAmountToAdd] = useState('Amount Of Rewards To Add');

    const [rewardButton, setRewardButton] = useState('Approve');
    const [rewardButtonDisabled, setRewardButtonDisabled] = useState(false);
    const [durationButtonDisabled, setDurationButtonDisabled] = useState(false);
    const [rewardsAddedMessage, setRewardsAddedMessage] = useState('');
    const [transactionMessage, setTransactionMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [durationButton, setDurationButton] = useState('Submit');

    const [checkText, setCheckText] = useState('Enter Token Address');

    const [rewardsDurationTokenMessage, setRewardsDurationTokenMessage] = useState(null);
    const [rewardsDurationMessage, setRewardsDurationMessage] = useState(null);

    const [rewardsAddMessage, setRewardsAddMessage] = useState(null);
    const [rewardsAddAmountMessage, setRewardsAddAmountMessage] = useState(null);
    const [rewardsCheckMessage, setRewardsCheckMessage] = useState(null);

    const [checkRewardsAndDurationMessage, setCheckRewardsAndDurationMessage] = useState(null);

    let tokenABI = [
        "function approve(address _spender, uint256 _value) public returns (bool success)"
    ];

    const handleDurationTokenChange = (event) => {
        setDurationToken(event.target.value);
        validateFields(event);
      };

      const handleDurationRewardCheck = (event) => {
        setCheckText(event.target.value);
        validateFields(event);
      };
    
      const handleDurationChange = (event) => {
        setDuration(event.target.value);
        validateFields(event);
      };


      const handleRewardAddTokenChange = (event) => {
        setRewardAddToken(event.target.value);
        validateFields(event);
      };
    
      const handleAmountToAddChange = (event) => {
        setAmountToAdd(event.target.value);
        validateFields(event);
      };


      const handleSetDuration = async (e) => {
        e.preventDefault();
        if ( validateFields(e) !== false){
        try{
          setIsLoading(true);
          setDurationButtonDisabled(true);
          setDurationButton("Confirming...");
          let durationSet = await contractSigner.setRewardsDuration(durationToken, duration);
            const receipt = await durationSet.wait();
         if (receipt){
           setDurationButton("Duration Set");
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
              setDurationButton("Check message above & refresh page");
            }}
      };


      const handleAddRewards = async (e) => {
        e.preventDefault();
        if ( validateFields(e) !== false){
        try{
            setRewardButtonDisabled(true);
            setRewardButton("Approving...");
            setRewardsAddedMessage("Do not refresh or process will restart");
            setIsLoading(true);
            
            let tempSigner = provider.getSigner();

            let tempContract = new ethers.Contract(rewardAddToken, tokenABI, provider);

            let tempContractSigner = tempContract.connect(tempSigner);
            
            //let approvalCheck = await tempContract.allowance
            var approving = await tempContractSigner.approve(contractAddress, amountToAdd);
            const receipt = await approving.wait();

            if (receipt){
                setRewardButton("Confirming...");
                var rewardsSet = await contractSigner.notifyRewardAmount(rewardAddToken, ethers.utils.parseUnits(amountToAdd, "ether"));
                const rewardsSetReceipt = await rewardsSet.wait();
                setRewardButton("Completed");
                setRewardsAddedMessage("Rewards have been successfully added")
                setIsLoading(false);
            }} catch (error){
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
              setRewardButton("Check message above & refresh page");

            }}
      };


      const handleClearInput = (e) => {
        if ( e.target.name === 'tokenAddress'){
          if (e.target.value === "Rewards Token Address"){
                setDurationToken("");
                setDurationInputHeading("Address of the token");

          }
      }

      else if (e.target.name === "tokenAddress2") {
        if (e.target.value === "Rewards Token Address"){
          setRewardAddToken("");
          setAddRewardsInputHeading("Enter token address to add rewards for stakers");
    }
      }

      else if (e.target.name === "amountOfRewards") {
        if (e.target.value === "Amount Of Rewards To Add"){
          setAmountToAdd("");
          setAddRewardsAmountInputHeading("Enter the amount of tokens to be rewarded over the duration");
    }
      }

      else if (e.target.name === "tokenAddress3") {
        if (e.target.value === 'Enter Token Address'){
          setCheckText("");
          setCheckInputHeading("Enter the token address to check")
    }
      }

      else if (e.target.name === "rewardDuration"){
        setDurationAmountInputHeading("The duration rewards will be available to stakers (in seconds)");
        setDurationExample("Ex: ( 1 week = 604800, 1 month = 2,628,000 )");
      }
    
    
    }


    const validateFields = (e) => {

      var isValid = true; 
      const amountRegex = /^[0-9]{1,16}$/;
      const durationRegex = /^[0-9]{1,8}$/;

      if (e.target.name === "tokenAddress"){
        if (ethers.utils.isAddress(e.target.value) !== true){
          setRewardsDurationTokenMessage("Please enter a valid ETH address");
          isValid = false;
        } else {
          setRewardsDurationTokenMessage("");
          isValid = true;
        }}
      else if (e.target.name === "tokenAddress2"){
          if (ethers.utils.isAddress(e.target.value) !== true){
            setRewardsAddMessage("Please enter a valid ETH address");
            isValid = false;
          } else {
            setRewardsAddMessage("");
            isValid = true;
          }}

          else if (e.target.name === "rewardDuration"){
             if (!e.target.value.match(durationRegex)){
            
              setRewardsDurationMessage("Please input valid rewards duration");
              isValid = false;
            } else {
              setRewardsDurationMessage("");
              isValid = true;
            }}

            else if (e.target.name === "amountOfRewards"){
              if (!e.target.value.match(amountRegex)){
             
               setRewardsAddAmountMessage("Please input valid rewards amount");
               isValid = false;
             } else {
               setRewardsAddAmountMessage("");
               isValid = true;
             }}

             else if (e.target.name === "tokenAddress3"){
              if (ethers.utils.isAddress(e.target.value) !== true){
                setRewardsCheckMessage("Please enter a valid ETH address");
                isValid = false;
              } else {
                setRewardsCheckMessage("");
                isValid = true;
              }}

              return isValid;
            
          
        
        



    }

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


    
    
    return (
        <span>
          
            <div>
            <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
                <h2 className="actionHeader"> Set Rewards Duration </h2>
                <form onSubmit={handleSetDuration} >
                <div className="inputHeadings">{durationInputHeading}</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress" className="actionInputs form-control-lg" value={durationToken} onClick={handleClearInput} onChange={handleDurationTokenChange}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsDurationTokenMessage}</span></div>
                <div className="generalText">+</div>
                <div className="inputHeadings">{durationAmountInputHeading}</div>
                <div className="inputHeadings">{durationExample}</div>
                <input  pattern="^[0-9]{1,8}$" min="1" max="99999999" type="number" required name="rewardDuration" className="actionInputs form-control-lg" value={duration} onClick={handleClearInput} onChange={handleDurationChange}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsDurationMessage}</span></div>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null || durationButtonDisabled}> {durationButton} </button>
                <br></br><br></br>
                </div>
                </form>
                {isLoading === true && <div className="lds-circle"><div></div></div> }
                {isLoading === true && <div className='generalText'>{pleaseAllowMessage}</div> }
            
                <h2 className="actionHeader"> Add Rewards </h2>
                <form onSubmit={handleAddRewards}>
                <div className="inputHeadings">{addRewardsInputHeading}</div>
                <input pattern="^0x[a-fA-F0-9]{40}$" minLength="42" maxLength="42" required name="tokenAddress2" className="actionInputs form-control-lg" value={rewardAddToken} onClick={handleClearInput} onChange={handleRewardAddTokenChange}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsAddMessage}</span></div>
                <div className="generalText">+</div>
                <div className="inputHeadings">{addRewardsAmountInputHeading}</div>
                <input pattern="^[0-9]{1,16}$" minLength="1" maxLength="16" required name="amountOfRewards" className="actionInputs form-control-lg" value={amountToAdd} onClick={handleClearInput} onChange={handleAmountToAddChange}></input>
                <div className="justToCenter"><span className='transactionText'>{rewardsAddAmountMessage}</span></div>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={rewardButtonDisabled || accountLoggedIn === null}> {rewardButton} </button>
             
                <div className="generalText" >{rewardsAddedMessage}</div>
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                
                </div>  </form>
                <br></br>
                <br></br>


                <h4 className="actionHeader"> Check Rewards & Duration: </h4>
                <form onSubmit={handleRewardsInfoCheck} >
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

               </div>
                
            </span>
    );
}

export default AddRewards;