import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import gitLogo from './../assets/images/git-black.png';
import sendLogo from './../assets/images/send-logo.png';
import ButtonPrimary from './../components/common/ButtonPrimary';
import GotStuck from './../components/common/GotStuck';
import './landing.css';

const styles = {
    titleContainer: {
	marginTop: 41
    },
    subTitleContainer: {
	marginTop: 25
    },
    greyText: {
	color: '#999999',
	opacity: 0.8,
	fontSize: 20,
	fontFamily: 'SF Display Regular'
    },    
    formContainer: {
	width: '80%',
	margin: 'auto',
	marginBottom: 50,
	marginTop: 50,
	height: 350,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: 50,
	borderRadius: 10,
	boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)'
    },
    sendLogo: {
	width: '100%'
    },
    sendButton: {
	textDecoration: 'none'
    }
}


const TitleBlock = () => (
    <div>
      <div className="title" style={styles.titleContainer}>
	Send Ether to anyone<br/>
        simply by phone number
      </div>
      <div className="text" style={styles.subTitleContainer}>
	Eth2Phone allows you to send Ether to anyone just verifying him by phone number. The recipient even without a wallet could receive the assets using special link.
      </div>
    </div>
)


const Buttons = () => (
    <div> 
      <Row className="buttons-row">
	<Col xs={12}>
	  <div style={{display: 'inline-block'}}>
	    <div style={{marginTop: 8.5}}>	  
	      <Link className="text link" to="faq">
		How it works?
	      </Link>
	    </div>
	  </div>		    
	  
	  <div style={{display: 'inline-block', float: 'right'}}>
            <a href="https://github.com/eth2phone/eth2phone-dapp" target="_blank" className="github-button">
	      <div className="github-btn-container">
		<img src={gitLogo}></img>
		<div className="text">View source</div>
	      </div>
	    </a>
	  </div>
	
	</Col>
      </Row>
      <Row>
	<Col xs={12}>
	  <GotStuck />
	</Col>
      </Row>
    </div>
)

    
const Form = () => (
      <div className="hidden-xs" style={styles.formContainer}>
        <div style={{ fontSize: 24, fontFamily: 'SF Display Black' }}>Send Ether</div>
        <div>
	  <img style={styles.sendLogo} src={sendLogo}></img>
	</div>
        <Link to="send" style={styles.sendButton}>                            
          <ButtonPrimary buttonColor="#0099ff">Send</ButtonPrimary>
        </Link>
        <div style={styles.greyText}>You should have metamask installed</div>
      </div>
    
)

class FormBlock extends React.Component {


    render() {
        return (
              <Row>
                <Col xs={12} sm={6}>
		  <div className="landing-title-container">
		    <TitleBlock/>
		    <Buttons/>
		  </div>
                </Col>
		<Col xs={12} sm={5}>
		  <Form/>
		</Col>		
              </Row>

        )
    }
}


export default FormBlock;
