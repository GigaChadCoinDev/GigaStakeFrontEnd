import React from 'react';
import {Link} from "react-router-dom";


function Welcome() {
    return (
        <div className="generalText">
            Welcome to Giga Stake <br></br>
            Please read the <Link to="/terms">terms and conditions</Link>
            <img src={"/img/gigachadPNG1_Cartoon.png"} />
        </div>
    );
}

export default Welcome;