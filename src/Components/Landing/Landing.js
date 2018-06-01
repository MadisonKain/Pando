import React from 'react';
import './Landing.css';
import { Navbar } from 'react-bootstrap/lib'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

function Landing() {
    return (
        <div className="landing-container">
            <div className="landingTitle" id="moreShopStuff">
                <h1 className="welcome-message">
                    WELCOME
                </h1>
            </div>
            <div className="bottomLandingContainer">
                <h1 className="things">
                    To {<br/>}
                    <p className="bigText">
                        P A N D O
                    </p>
                </h1>
            </div>
        </div>
    )
}

export default Landing
