
import React, { useState } from 'react';
import {ethers} from 'ethers';



function AddRewards( {accountLoggedIn, provider, contractProvider, contractSigner, contractAddress} ) {
    
    const [durationToken, setDurationToken] = useState('Rewards Token Address');
    const [duration, setDuration] = useState('How Long Can Users Stake?');
    
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

    let tokenABI = [
        "function approve(address _spender, uint256 _value) public returns (bool success)"
    ];

    const handleDurationTokenChange = (event) => {
        setDurationToken(event.target.value);
      };

      const handleDurationRewardCheck = (event) => {
        setCheckText(event.target.value);
      };
    
      const handleDurationChange = (event) => {
        setDuration(event.target.value);
      };


      const handleRewardAddTokenChange = (event) => {
        setRewardAddToken(event.target.value);
      };
    
      const handleAmountToAddChange = (event) => {
        setAmountToAdd(event.target.value);
      };


      const handleSetDuration = async (e) => {
        e.preventDefault();

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
            }
      };


      const handleAddRewards = async (e) => {
        e.preventDefault();

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

            }
      };
    
    
    return (
        <span>
          
            <div>
            <div className="justToCenter"><span className="transactionText">{transactionMessage}</span></div>
                <h2 className="actionHeader"> Set Rewards Duration </h2>
                <form onSubmit={handleSetDuration} >
                <input  name="tokenAddress" className="actionInputs form-control-lg" value={durationToken} onChange={handleDurationTokenChange}></input>
                <div className="generalText">+</div>
                <input   name="rewardDuration" className="actionInputs form-control-lg" value={duration} onChange={handleDurationChange}></input>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={accountLoggedIn === null || durationButtonDisabled}> {durationButton} </button>
                <br></br><br></br>
                </div>
                </form>
                {isLoading === true && <div className="lds-circle"><div></div></div> }

            
                <h2 className="actionHeader"> Add Rewards </h2>
                <form onSubmit={handleAddRewards}>
                <input  name="tokenAddress" className="actionInputs form-control-lg" value={rewardAddToken} onChange={handleRewardAddTokenChange}></input>
                <div className="generalText">+</div>
                <input  name="amountOfRewards" className="actionInputs form-control-lg" value={amountToAdd} onChange={handleAmountToAddChange}></input>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" disabled={rewardButtonDisabled || accountLoggedIn === null}> {rewardButton} </button>
             
                <div className="generalText" >{rewardsAddedMessage}</div>
                <span className="connectWalletAlert"> {accountLoggedIn === null && "Connect Wallet To Use Features" }</span>
                
                </div>  </form>
                <br></br>
                <br></br>


                <h4 className="actionHeader"> Check Rewards & Duration: </h4>
                <form onSubmit={handleSetDuration} >
                <input  name="tokenAddress" className="actionInputs" value={checkText} onChange={handleDurationRewardCheck}></input>
                <div className="justToCenter">
                <button className="button-18" style={{margin: 10}} type="submit" > Submit </button>
                <br></br><br></br>
                </div>
                </form>

               </div>
                
            </span>
    );
}

export default AddRewards;