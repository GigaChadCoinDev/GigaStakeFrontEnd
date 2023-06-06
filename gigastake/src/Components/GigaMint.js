import React, { useEffect, useState } from 'react';
import gigastake_abi from './gigachads_abi.json';
import {ethers} from 'ethers';

const GigaMint = () => {


    const contractAddress = "0xDE3d4d390304cb7e1F88327DB24847fF635FBAE3";


    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [accountLoggedIn, setAccountLoggedIn] = useState("Connect Your Wallet");
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contractSigner, setContractSigner] = useState(null);

    const [amountMinted, setAmountMinted] = useState(null);
    const [amountToMint, setAmounToMint] = useState(1);

    const [buttonText, setButtonText] = useState("Connect");
    const [buttonEnabled, setButtonEnabled] = useState(true);
   

    const handleMintAmountChange = (e) => {
        if (e === "-"){
            if ( amountToMint >= 2){
                setAmounToMint(amountToMint - 1);
            }
        }
        else if (e === "+"){
            if ( amountToMint <= 9){
                setAmounToMint(amountToMint + 1);
            }
        }
    }

    const accountChangedHandler = (newAccount) => {
        setAccountLoggedIn("Signed In: " + newAccount.slice(0,5) + "..." + newAccount.slice(-4,));
        
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, gigastake_abi, tempProvider);
        setContract(tempContract);

        let tempContractSigner = tempContract.connect(tempSigner);
        setContractSigner(tempContractSigner);

        
    }

    const handleMintButton = async () => {
        if (accountLoggedIn === "Connect Your Wallet"){
            //console.log("connecting");
            try{
                setIsLoading(true);
                setButtonText("Connecting..");
                setButtonEnabled(false);
                if (window.ethereum) {
                    
                        window.ethereum.request({method: "eth_requestAccounts"})
                        .then(result => {
                            accountChangedHandler(result[0]);
                            setIsLoading(false);
                            setButtonText("Mint");
                            setButtonEnabled(true);
                            setErrorMessage(null);
                        }).catch ((e) => {
                            console.log(e);
                            if ('data' in e){
                                setErrorMessage(JSON.stringify(e.data.message));
                              } 
                              
                              else if ('reason' in e) {
                                setErrorMessage(JSON.stringify(e.reason));
                              }
                              else if ('message' in e) {
                                setErrorMessage(JSON.stringify(e.message));
                              }
                              else {
                                setErrorMessage("Something went wrong, please refresh page");}
                                setButtonEnabled(false);
                                setButtonText("Refresh Page");
                                setIsLoading(false);
                            
                        })
                } else {
                    setErrorMessage('Need to install Metamask');
                } }
                catch(error){
                    
                    console.log(error);
                    setButtonText("Refresh Page");
                    
                }
        }
        else{
            console.log("minting");
            try{
                setIsLoading(true);
                setButtonText("Confirming..");
                setButtonEnabled(false);
                let amountToParse = (0.005 * amountToMint);
                var minting = await contractSigner.mint(amountToMint, {value: ethers.utils.parseEther(amountToParse.toString())});
                const receipt = await minting.wait();
                if (receipt){
                    setButtonText("Minted Successfully");
                    setIsLoading(false);
                  }

            }
            catch(e){
                console.log(e);
                if ('data' in e){
                    setErrorMessage(JSON.stringify(e.data.message));
                  } 
                  
                  else if ('reason' in e) {
                    setErrorMessage(JSON.stringify(e.reason));
                  }
                  else if ('message' in e) {
                    setErrorMessage(JSON.stringify(e.message));
                  }
                  else {
                    setErrorMessage("Something went wrong, please refresh page");}
                    setButtonText("Refresh Page");
                    setIsLoading(false);
            }
            
        }
    }

    const getData = async () => {
        if (accountLoggedIn !== "Connect Your Wallet" && contractAddress !== null) {
         
          try{
          var totalSupply = await contract.totalSupply();
         setAmountMinted(parseInt(totalSupply));
         
        }
        catch(error){
            console.log(error);
        }
      }};

    useEffect(() => {
        getData();
    }, [accountLoggedIn]);

    return (
        <div className="gigaMintContainer custom-cursor">
            <div className="containerBackgroundLeftHalf">
                
            </div >
            <div className="containerBackgroundRightHalf">
                
            </div >
            <div className="mintContainer">
                    <div className="mintContainerUpper">
                        <div className='countLeft'>{amountMinted}/777</div>
                        <div className='address'>{accountLoggedIn}</div>
                        <div className='cost'><span className="releaseStage">Pre-Sale</span> Cost:<br></br> .002 ETH</div>
                        <div className='gasfees'>(Excluding gas fees)</div>
                        <div className='desc' >The GIGA CHADs NFT collection is limited to only 777 pieces to create scarcity and demand. GIGA CHADs NFTs will also be used as proof of membership to allow community members to receive exclusive benefits. </div>
                        
                    { errorMessage != null &&    <div className="gigaMintErrorTextBG"> <span className="gigaMintErrorText"> {errorMessage} </span> </div> }
                    </div>
                    
                    
                    
                    <div className="mintContainerLower">
                    <div className='clickToSecure'>Click Below to secure your GIGA CHADs.</div>
                    {isLoading === true &&     <span>        
                    <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                    </div>

                    <div className="spinner2">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                    </div> </span>     }

                    <button className="mintButton" disabled={!buttonEnabled} onClick={handleMintButton}>{buttonText}</button>
                    <br></br>
                  { accountLoggedIn!= "Connect Your Wallet" && <span><input className="incrementerButton" type="button" value="-" onClick={() => handleMintAmountChange("-")}></input><span className="amountToMint">{amountToMint}</span><input className="incrementerButton" type="button" value="+" onClick={() => handleMintAmountChange("+")}></input></span> }
                    </div>
                    
            </div>

            <div className="circleImageContainerLeft"></div>
            <div className="circleImageContainerRight"></div>
            <div className='gigaChadsTitleContainer'><div className='gigaChadsTitle'>GIGA CHADs</div></div>

        </div>
    );
};

export default GigaMint;