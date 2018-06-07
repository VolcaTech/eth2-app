import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import ButtonPrimary from './../components/common/ButtonPrimary';
import GotStuck from './../components/common/GotStuck';
import './landing.css';
import RetinaImage from 'react-retina-image';


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
	fontSize: 16,
	fontFamily: 'SF Display Regular',
	textAlign: 'center',	
    },    
    formContainer: {
	maxWidth: 450,
	margin: 'auto',
	marginBottom: 50,
	marginTop: 120,
	height: 350,
	paddingLeft: 57,
	paddingRight: 57,
	paddingTop: 43,
	paddingBottom: 37,
	borderRadius: 10,
	boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)'
    },
    formTitle: {
	fontSize: 24,
	fontFamily: 'SF Display Black',
	textAlign: 'center',
    },
    sendLogo: {
	width: '100%'
    },
}


const SendButton = () => (
    <Link to="send" className="send-button">
      <ButtonPrimary buttonColor="#0099ff" fontSize={24}>Send</ButtonPrimary>
    </Link>    
);

const TitleBlock = () => (
    <div>
      <div className="title" style={styles.titleContainer}>
	Send ether to anyone<br/>
        simply by phone number
      </div>
      <div className="hidden-sm hidden-md hidden-lg">
	<div style={{marginTop: 32.5, marginBottom: 2.5}}>
	  <SendButton/>
	</div>
      </div>
      <div className="text" style={styles.subTitleContainer}>
	Eth2Phone lets you send ether to anyone even without ethereum wallet. The receiver will get the special link and be verified using phone number	
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
		<RetinaImage src="https://eth2.io/images/git-black.png" />
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
        <div style={styles.formTitle}>Send ether</div>
        <div style={{marginTop: 37, marginBottom: 48}}>
	  <RetinaImage style={styles.sendLogo} src="https://eth2.io/images/send-logo.png" />
	</div>
	<div style={{marginBottom: 25}}>
	  <SendButton/>
  	</div>
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
		<Col xs={12} sm={6}>
		  <Form/>
		</Col>		
              </Row>
        );
    }
}


export default FormBlock;
