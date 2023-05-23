import React from 'react';
import styles from '../App.css';
import {Link} from "react-router-dom";

function Navbar({connectWalletHandler, connectButtonText}) {
    return (
        
        

        <nav className="nav" >
        {/*   <div className={"testeroo"}><div className={"testerootwo"}>wtfffffffffffffffff</div></div> */}  
            
            <div className="navLeft"> 

            <Link to="/" className='navLinks'>
                    <img src={"/img/gigachadPNG1_Cartoon_Favicon.png"} />
                </Link>

            </div>
            
            <div className="navContainer">
              
                
             
                    <Link to="/stake" className='navLinks'>Stake</Link>
              
                    <Link to="/unstake" className='navLinks'>Unstake</Link>
             
                    <Link to="/claimrewards" className='navLinks'>Claim Rewards</Link>
              
                    <Link to="/addrewards" className='navLinks'>Add Rewards</Link>
             
                    <Link to="/authorize" className='navLinks'>Authorize</Link>
                    
            </div>


            <div className="navRight"> 

            <button className="button-18" role="button" onClick={connectWalletHandler} > {connectButtonText} </button>

            </div>
            
            
        </nav>
    );
}

export default Navbar;
