import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import * as e2pService from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import Spinner from './../common/Spinner';
import { getQueryParams, getNetworkNameById } from '../../utils';
import ConfirmSmsForm from './ConfirmSmsForm';
import { parse, format, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
const qs = require('querystring');
import { TxDetailsBox } from '../Transfer/components';
import web3Service from "../../services/web3Service";


class ReceiveScreen extends Component {
    constructor(props) {
        super(props);

	//const queryParams = {}
	const queryParams = qs.parse(props.location.search.substring(1));
	console.log({queryParams});

	// parse phone params
	const phone = `+${queryParams.phone}`;
	const phoneIsValid = isValidPhoneNumber(phone);
	const formatter = new asYouType();
	formatter.input(phone);	
	
	this.phoneParams = {
	    phone,
	    phoneCode: formatter.country_phone_code,
	    phoneIsValid,
	};
	
	this.secretCode = queryParams.code;
	this.networkId = queryParams.chainId || "1";	

        this.state = {
            errorMessage: "",
	    step: 'confirm-details',
	    fetching: true,
	    gotTransfer: false,
	    amount: null,
	    transferStatus: null
        };

    }

    componentDidMount() {
	this.fetchTransferFromServer();
    }
    
    async fetchTransferFromServer() {
	try {
	    this._checkNetwork();
	    
	    const result  = await e2pService.fetchTransferDetailsFromServer({
		phone: this.phoneParams.phone,
		phoneCode: this.phoneParams.phoneCode,
		secretCode: this.secretCode
	    });

	    console.log(result)
	    if (!result.success) { throw new Error(result.errorMessage || "Server error");};
	    console.log({result});
	    this.setState({
		fetching: false,
		gotTransfer: true,
		transfer: result.transfer
	    });

	    if (result.transfer.status === 'depositing') {
		const web3 = web3Service.getWeb3();
		const txHash = this._getDepositTxHash();
		const txReceipt = await web3.eth.getTransactionReceiptMined(txHash);
		if (txReceipt.status === '0x0') { // if error
		    result.transfer.status = 'error';
		} else {
		    result.transfer.status = 'deposited';
		}
		this.setState({transfer: result.transfer});		    
	    }
	    
	} catch(err) {
	    this.setState({ fetching: false, errorMessage: err.message });
	    
	}	
    }

    
    _checkNetwork() {
	if (this.networkId && this.networkId != this.props.networkId) {
	    const networkNeeded = getNetworkNameById(this.networkId);
	    const currentNetwork = getNetworkNameById(this.props.networkId);
	    const msg = `Transfer is for ${networkNeeded} network, but you are on ${currentNetwork} network`;
	    throw new Error(msg);
	}
    }

    
    async _sendSmsToPhone() {
	try {

	    this._checkNetwork();
	    
	    const result = await e2pService.sendSmsToPhone({
	    	phone: this.phoneParams.phone,
	    	secretCode: this.secretCode,
	    	phoneCode: this.phoneParams.phoneCode
	    });
	    this.setState({step: 'confirm-sms'});
	} catch(err) {
	    this.setState({ errorMessage: err.message });
	    // disabling button
	    this.setState({fetching: false});	    
	}
    }
    
    _onSubmit() {
	// disabling button
	this.setState({fetching: true});
	
	// sending request for sms-code
	this._sendSmsToPhone();
    }

    _renderButtonOrInfo() {
	// depending on status:
	// 1) if sender's tx is mined, show button
	if (this.state.transfer.status === 'deposited') { 
	    return (
		<div style={{width: '78%', margin: 'auto'}}>
		  <ButtonPrimary
		     handleClick={this._onSubmit.bind(this)}
		     disabled={this.state.fetching}		   
		     buttonColor={e2pColors.green}>
		    Receive
		  </ButtonPrimary>
		</div>
	    );
	}

	let infoMessage, txHash;
	if (this.state.transfer.status === 'completed') {
	    infoMessage = 'Transfer has been received';
	    txHash = this._getTxHashForMinedEvent('withdraw');
	} else if (this.state.transfer.status === 'cancelled') {
	    infoMessage = 'Transfer has been cancelled';
	    txHash = this._getTxHashForMinedEvent('cancel');	    
	} else if (this.state.transfer.status === 'depositing') {
	    txHash = this._getDepositTxHash();
	    infoMessage = 'Transaction has been initiated recently and has not been processed yet, please wait...';
	} else if (this.state.transfer.status === 'error') {
	    txHash = this._getDepositTxHash();
	    infoMessage = 'Transaction has failed. See transaction details for more info.';	    
	} else {
	    // return if other status
 	    return null;
	}

	return (
	    <div>
	      <div style={{
		       marginBottom: 30,
		       marginTop: 10,
		       textAlign: 'center',
		       color: '#3b3b3b',
		       fontFamily: "SF Display Bold",
		   fontSize: 12   }}>
		{ infoMessage }
	      </div>
	      <div style={{marginTop: 56, textAlign: 'center'}}>
		<TxDetailsBox
		   txHash={txHash}
		   networkId={this.networkId}
		   />
	      </div>
	    </div>
	);	
    }

    _getDepositTxHash() {
	const event = this.state.transfer.events
		  .filter(event => event.eventName === 'deposit' &&
			  event.txStatus === 'pending')
		  .sort((a,b) => b.gasPrice - a.gasPrice)[0]; 
	return event.txHash;	
    }
    
    
    _getTxHashForMinedEvent(eventName) {
	const event = this.state.transfer.events
		  .filter(event => event.eventName === eventName &&
			  event.txStatus === 'success')[0];
	return event.txHash;	
    }
    
    _renderSpinnerOrError() {
	return (
	    <div style={{ height: 28, textAlign: 'center', paddingTop: 8 }}>
	      { this.state.fetching ?
		  <div style={{width: 20, margin: 'auto'}}>
			<Spinner/>
		      </div> :
		      <span style={{color: '#ef4234', fontSize: 9}}>{this.state.errorMessage}</span>
		      }			   
	    </div>
	);
    }
    
    _renderConfirmDetailsForm() {
	
	return (
	    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 215}}>
              <div style={{display: 'block', margin: 'auto', width: '70%', textAlign: 'center', fontSize: 12, lineHeight: 1, fontFamily: 'SF Display Regular'}}><div style={{fontFamily: 'SF Display Bold', display: 'inline'}}>Eth-2-phone</div> allows to send Ethereum to anybody by simply verifying phone number.</div>
		  <div style={
			   {width: '40%',
			    margin: '25px auto',
			    textAlign: 'center',
			    color: '#2bc64f',
			    fontSize: 18,
			    height: 18,
		       fontFamily: 'SF Display Black'}}>
		    { this.state.gotTransfer ? 
		    <span>{this.state.transfer.amount} ETH </span>: null }</div>

		  <div style={{width: '78%', margin: 'auto'}}>
		    <NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.phoneParams.phone} />
		  </div>
		  { this._renderSpinnerOrError() }				
		  
		  { this.state.gotTransfer ?
		      <div>
		        { this._renderButtonOrInfo() }
		      </div>
		  : null }
	    </div>
	);
    }
    
    render() {
	const props = {
	    ...this.props,
	    secretCode:this.secretCode,
	    phoneCode:this.phoneParams.phoneCode,
	    phone: this.phoneParams.phone
	};
        return (
	    <Grid>
	      <Row>
              <Col sm={4} smOffset={4}>	
		<div style={{ alignContent: 'center' }}>
		  <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>		  
		  <div>
		    { this.state.step === 'confirm-details' ?
		    this._renderConfirmDetailsForm() : <ConfirmSmsForm {...props}/> }
		  </div>		  
		</div>
	      </Col>
	      </Row>
	    </Grid>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(state=> ({networkId: state.web3Data.networkId}))(ReceiveScreen);
