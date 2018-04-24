import React from 'react';
import './Landing.css';
import { Navbar } from 'react-bootstrap/lib'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

function Landing() {
    return (
        <div className="landing-container">
            <div className="landingTitle" id="moreShopStuff">
                <strong>
                    <h1 className="welcome-message">
                        WELCOME
                    </h1>
                </strong>
            </div>
            <div className="bottomLandingContainer">
                <h1 className="things">
                    To {<br/>}
                    <h1 className="bigText">
                        P A N D O
                    </h1>
                </h1>
            </div>
        </div>
    )
}

export default Landing
