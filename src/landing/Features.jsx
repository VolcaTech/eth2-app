import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import secureLogo from './../assets/images/secure.png';
import cancellableLogo from './../assets/images/cancellable.png';
import nowalletLogo from './../assets/images/nowallet.png';
import web3Logo from './../assets/images/web3.png';


class Features extends React.Component {


    render() {
        return (
            <div className="features-block">
                <div className="title-row">
                    <div className="title">Features</div>
                </div>
		
                <Row>
                  <Col xs={12} sm={3}>
		    <div className="img-container">
                      <img className="img-responsive" src={secureLogo} />
		    </div>
                    <div className="feature-title">Secure</div>
                    <div className="feature-text">
		      Your funds are secured via Smart Contract before they are delivered to the receiver wallet. Even if our servers are compromised, attacker will not be able to steal your assets.		      
                    </div>
                  </Col>
		  
		  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <img className="img-responsive" src={web3Logo} />
		    </div>
                    <div className="feature-title">Private</div>
                    <div className="feature-text">
                      Phone numbers are never stored in blockchain. Our verification servers only keep them in hashed form. If we are hacked, no one will be able to link phones to Ethereum addresses.		      
                    </div>
                  </Col>		  

		  
                  <Col xs={12} sm={3}>
		    <div className="img-container">
                      <img className="img-responsive" src={cancellableLogo} />
		    </div>
                    <div className="feature-title">Cancellable</div>
                    <div className="feature-text">
		      All the transactions could be cancelled until received. That means if you’ve messed something up, you can always get your Ether back if receiver hasn’t yet requested them.
                    </div>
                  </Col>

                  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <img  className="img-responsive" src={nowalletLogo} />
		    </div>
                    <div className="feature-title">No wallet needed</div>
                    <div className="feature-text"> 
                      You can send Ether to your friends and family without Ethereum wallet. They will be instructed on how to create wallet easily and get the assets via our special link.
                    </div>
                  </Col>
                </Row>
            </div>
        );
    }
}


export default Features;
