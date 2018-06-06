import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


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
                      <RetinaImage className="img-responsive" src="https://eth2.io/images/secure.png" />
		    </div>
                    <div className="feature-title">Secure</div>
                    <div className="feature-text">
		      Your funds are secured via Smart Contract before they are delivered to the receiver wallet. Even if our servers are compromised, attacker will not be able to steal your assets.		      
                    </div>
                  </Col>
		  
		  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <RetinaImage className="img-responsive" src="https://eth2.io/images/web3.png" />
		    </div>
                    <div className="feature-title">Private</div>
                    <div className="feature-text">
                      Phone numbers are never stored in blockchain. Our verification servers only keep them in hashed form. If we are hacked, no one will be able to link phones to ethereum addresses.		      
                    </div>
                  </Col>		  

		  
                  <Col xs={12} sm={3}>
		    <div className="img-container">
                      <RetinaImage className="img-responsive" src="https://eth2.io/images/cancellable.png" />
		    </div>
                    <div className="feature-title">Cancellable</div>
                    <div className="feature-text">
		      All the transactions could be cancelled until received. That means if you’ve messed something up, you can always get your ether back if receiver hasn’t yet requested them.
                    </div>
                  </Col>

                  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <RetinaImage  className="img-responsive" src="https://eth2.io/images/nowallet.png" />
		    </div>
                    <div className="feature-title">No wallet needed</div>
                    <div className="feature-text"> 
                      You can send ether to your friends and family without ethereum wallet. They will be instructed on how to create wallet easily and get the assets via our special link.
                    </div>
                  </Col>
                </Row>
            </div>
        );
    }
}


export default Features;
