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
                      At no time any of the single element of the system has enough data to steal your assets. I.e. even if you hack the server, you still don’t have the transaction code, and same for other.
                    </div>
                  </Col>
                  <Col xs={12} sm={3}>
		    <div className="img-container">
                      <img className="img-responsive" src={cancellableLogo} />
		    </div>
                    <div className="feature-title">Cancellable</div>
                    <div className="feature-text">
                      All the transactions could be cancelled until received. That means if you’ve messed something up, you can always get your Ether back if receiver hasn’t yet requested them. At the same time he can’t request the assets without the special link from you.
                    </div>
                  </Col>

                  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <img  className="img-responsive" src={nowalletLogo} />
		    </div>
                    <div className="feature-title">No wallet needed</div>
                    <div className="feature-text"> 
                      You can send Ether even to those who don’t have a wallet yet. These people will simply install one of suggested or any compatible wallets and follow the link to receive the assets. 
                    </div>
                  </Col>
                  <Col xs={12} sm={3}>
		    <div className="img-container">		    
                      <img className="img-responsive" src={web3Logo} />
		    </div>
                    <div className="feature-title">Web3 compatible</div>
                    <div className="feature-text">
                      The solution works well with any Web3 wallet and provides same experience. However, there is a list of suggested web wallets and wallet apps that we recommend for using. 
                    </div>
                  </Col>		  
                </Row>
            </div>
        );
    }
}

const styles = {

}

export default Features;
