import React, { useState } from 'react';

import {Link} from "react-router-dom";



function Navbar({connectWalletHandler, connectButtonText, connectButtonDisabled}) {

    const [dropDownMenuEnabled, setDropDownMenuEnabled] = useState(false);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleFocus = () => {
      
        setDropDownMenuEnabled(true);
    }

    const handleBlur = async () => {
      
        await timeout(250);
        setDropDownMenuEnabled(false);
    }

    return (
        
        

        <nav className="nav justToCenter" >
         
            
            <div className="navLeft"> 

            <Link to="/" className='navLinks'>
                    <img src={"/img/gigachadPNG1_Cartoon_Favicon2.png"} />
                </Link>

            </div>
            
            <div className="navContainer">
            
                

                    <Link to="/stake" className='navLinks'>Stake</Link>
              
                    <Link to="/unstake" className='navLinks'>Unstake</Link>
             
                    <Link to="/claimrewards" className='navLinks'>Claim Rewards</Link>
              
                    
             
                    

                <div className="dropDown">  
              
             <input onFocus={handleFocus} onBlur={handleBlur} className='navLinksDots' type="image" src={"/img/more.png"} />
                <div className="dropDown-menu information-grid"> 
                    
                <div>
                    <div className='dropdown-heading managerTools'>
                        <span className="dropDownHeaderText">Manager Tools</span>
                        <div >
                  { dropDownMenuEnabled &&     <Link className='dropdown-links' to="/addrewards" >Add Rewards</Link> }
                        </div>
                        
                  {/*      <div >
                        { dropDownMenuEnabled &&       <Link className='dropdown-links' to="/leftover" >Get Left Over Rewards</Link> }
                        </div>  */} 

                        <div >
                        { dropDownMenuEnabled &&       <Link className='dropdown-links' to="/authorize" >Authorize</Link> }
                        </div>

                    </div>
                </div>
                
                 </div>
                
                </div>  
                    
       
            </div>

            <div className="navRight"> 

       
         <button className="button-18" role="button" onClick={connectWalletHandler} disabled={connectButtonDisabled} > {connectButtonText} </button> 
         
        

            </div>
            
            
        </nav>
    );
}

export default Navbar;
