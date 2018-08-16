import React, { Component } from 'react';
import * as e2pService from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import ConfirmSmsForm from './ConfirmSmsForm';
import { SpinnerOrError, Loader } from './../common/Spinner';
import { TransferScreen } from '../Transfer';


const styles = {
    button: {
	width: '78%',
	margin: 'auto'
    },
    amountContainer: {
	fontSize: 35,
	fontFamily: 'SF Display Bold',
	textAlign: 'center',
	marginBottom: 38
    },
    amountNumber: { color: '#0099ff' },
    amountSymbol: { color: '#999999'},
    infoMessage: {
	marginBottom: 30,
	marginTop: 10,
	textAlign: 'center',
	color: '#3b3b3b',
	fontFamily: "SF Display Bold",
	fontSize: 12
    },
    titleContainer: {
	textAlign: 'center',	
	marginTop:54,
	marginBottom: 39
    },
    title:{
	fontSize: 20,
	fontFamily: 'SF Display Bold'
    },    
    phone: {
	width: '78%',
	margin: 'auto',
	marginBottom: 22
    },
    txDetails: {
	marginTop: 56,
	textAlign: 'center'
    },
    blue: '#0099ff',
    green: '#2bc64f'    
}


class ConfirmPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
	    step: 'confirm-details',
	    fetching: false,
        };
	
    }

    async _sendSmsToPhone() {
	try {
	    const result = await e2pService.sendSmsToPhone({
	    	phone: this.props.phone,
	    	secretCode: this.props.secretCode,
	    	phoneCode: this.props.phoneCode
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
    
    _renderConfirmDetailsForm() {		
	// don't show button for next statuses	
	return (
	    <div style={{flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: 250}}>
	      <div style={styles.titleContainer}>
		<span style={styles.title}>Claim Ether</span>
	      </div>
	      
	      <div style={styles.amountContainer}>
		<span style={styles.amountNumber}>{this.props.transfer.amount} </span><span style={styles.amountSymbol}>ETH</span>
	      </div>
	      
	      <div style={styles.formContainer}>
		<div style={styles.phone}>
		  <NumberInput
		     backgroundColor='#f5f5f5'
		     disabled={true}
		     placeholder={this.props.phoneFormatted} />
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
	      </div>
	    </div>
	);
    }
    
    render() {
        return (
		<div>
		  { this.state.step === 'confirm-details' ?
		      this._renderConfirmDetailsForm() :
		  <ConfirmSmsForm {...this.props}/> }
		</div>
        );
    }
}


export default ConfirmPhoneScreen;
