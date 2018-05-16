import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import * as e2pService from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import { SpinnerOrError } from './../common/Spinner';
import { getQueryParams, getNetworkNameById } from '../../utils';
import ConfirmSmsForm from './ConfirmSmsForm';
import { parse, format, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
const qs = require('querystring');
import { TxDetailsBox } from '../Transfer/components';
import web3Service from "../../services/web3Service";
import ConfirmTransfer from './ConfirmTransfer';
import { getDepositTxHash } from './utils';


const styles = {
    container: { alignContent: 'center' },
    formContainer: {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	height: 215
    },
    titleContainer: {
	display: 'block',
	margin: 'auto',
	width: '70%',
	textAlign: 'center',
	fontSize: 12,
	lineHeight: 1,
	fontFamily: 'SF Display Regular'
    },
    title:{
	fontFamily: 'SF Display Bold',
	display: 'inline'
    },
    numberInput: {
	width: '78%',
	margin: 'auto'
    },
    button: {
	width: '78%',
	margin: 'auto'
    },
    green: '#2bc64f'    
}


class ReceiveScreen extends Component {
    constructor(props) {
        super(props);

	const queryParams = qs.parse(props.location.search.substring(1));
	
	// parse phone params
	const phone = `+${queryParams.phone}`;
	const formatter = new asYouType();
	formatter.input(phone);	
	
	this.phoneParams = {
	    phone,
	    phoneCode: formatter.country_phone_code,
	    //  phoneIsValid,
	};
	
	this.networkId = queryParams.chainId || "1";	

        this.state = {
            errorMessage: "",
	    fetching: false,
	    transfer: null,
	    hasCode: false,
	    secretCode: queryParams.code
        };

    }

    componentDidMount() {
	if (this.state.secretCode) {
	    this.setState({fetching: true });
	    this._fetchTransferFromServer();
	}
    }
    
    async _fetchTransferFromServer() {
	try {
	    this._checkNetwork();
	    
	    const result = await e2pService.fetchTransferDetailsFromServer({
		phone: this.phoneParams.phone,
		phoneCode: this.phoneParams.phoneCode,
		secretCode: this.state.secretCode
	    });

	    if (!result.success) { throw new Error(result.errorMessage || "Server error");};
	    this.setState({
		fetching: false,
		hasCode: true,
		transfer: result.transfer,
		transferStatus: result.transfer.status
	    });

	    // subscribe for update
	    if (result.transfer.status === 'depositing') {
		const web3 = web3Service.getWeb3();
		const txHash = getDepositTxHash(result.transfer.events);
		const txReceipt = await web3.eth.getTransactionReceiptMined(txHash);
		let transferStatus;
		if (txReceipt.status === '0x0') { // if error
		    result.transfer.status = 'error';
		} else {
		    result.transfer.status = 'deposited';
		    this.setState({
			transferStatus: result.transfer.status,
			transfer: result.transfer
		    });		
		}
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
    
    _onSubmit() {
	// // disabling button
	this.setState({fetching: true});
	
	// // sending request for sms-code
	this._fetchTransferFromServer();
    }

        
    _renderPasteCodeForm() {	
	return (
	    <div style={styles.formContainer}>
              <div style={styles.titleContainer}>
		<div style={styles.title}>Receive ether</div>
	      </div>
		  <div style={styles.numberInput}>
		    <NumberInput type="text" disabled={false} placeholder="Paste Code Here" onChange={({target}) => this.setState({secretCode: target.value})} />
		  </div>
		  <div style={styles.numberInput}>
		    <NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.phoneParams.phone} />
		  </div>
		  <div style={styles.button}>
		    <ButtonPrimary
		       handleClick={this._onSubmit.bind(this)}
		       disabled={this.state.fetching}		   
		       buttonColor={styles.green}>
		      Confirm
		    </ButtonPrimary>
		  </div>
		  
		  <SpinnerOrError fetching={this.state.fetching} error={this.state.errorMessage}/>
	    </div>
	);
    }
    
    render() {
	const props = {
	    ...this.props,
	    secretCode:this.state.secretCode,
	    phoneCode:this.phoneParams.phoneCode,
	    phone: this.phoneParams.phone,
	    transfer: this.state.transfer,
	    transferStatus: this.state.transferStatus
	};
	
        return (
	    <Grid>
	      <Row>
              <Col sm={4} smOffset={4}>	
		<div style={styles.container}>
		  <div>
		    { this.state.hasCode ?
			<ConfirmTransfer {...props}/>
			: this._renderPasteCodeForm() } 
		  </div>		  
		</div>
	      </Col>
	      </Row>
	    </Grid>
        );
    }
}


export default connect(state=> ({networkId: state.web3Data.networkId}))(ReceiveScreen);
