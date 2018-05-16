import React, { Component } from 'react';
import * as e2pService from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import ConfirmSmsForm from './ConfirmSmsForm';
import { TxDetailsBox } from '../Transfer/components';
import web3Service from "../../services/web3Service";
import { SpinnerOrError } from '../common/Spinner';
import { getDepositTxHash, getInfoMessageAndTxHashForStatus } from './utils';


const styles = {
    button: {
	width: '78%',
	margin: 'auto'
    },
    amount: {
	width: '40%',
	margin: '25px auto',
	textAlign: 'center',
	color: '#2bc64f',
	fontSize: 18,
	height: 18,
	fontFamily: 'SF Display Black'
    },
    infoMessage: {
	marginBottom: 30,
	marginTop: 10,
	textAlign: 'center',
	color: '#3b3b3b',
	fontFamily: "SF Display Bold",
	fontSize: 12
    },
    formContainer: {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	height: 215
    },
    phone: {
	width: '78%',
	margin: 'auto'
    },
    txDetails: {
	marginTop: 56,
	textAlign: 'center'
    },
    blue: '#0099ff',
    green: '#2bc64f'    
}


class ConfirmTrasfer extends Component {
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

    
    _renderTransferStatusInfo() {
	const { infoMessage, txHash } = getInfoMessageAndTxHashForStatus(this.props.transfer);
	if (!txHash) {
	    // if something is wrong render button,
	    // so user can try to withdraw
	    return null;
	}
	return (
	    <div>
	      <div style={styles.infoMessage}>
		{ infoMessage }
              </div>
	      <div style={styles.txDetails}>
		<TxDetailsBox
		   txHash={txHash}
		   networkId={this.props.networkId}
		   />
		</div>
	    </div>	    
	);	
    }

    
    _renderConfirmDetailsForm() {
	// don't show button for next statuses
	const notWithdrawable = (this.props.transferStatus === 'completed'||
				 this.props.transferStatus === 'cancelled' ||
				 this.props.transferStatus === 'error' ||
				this.props.transferStatus === 'depositing');
	
	return (
	    <div>
	      <div style={styles.amount}>
		{this.props.transfer.amount} ETH
	      </div>
	      
	      <div style={styles.formContainer}>
		<div style={styles.phone}>
		  <NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.props.phone} />
		</div>
		{ notWithdrawable ? null :
		    <div style={styles.button}>
			  <ButtonPrimary
				 handleClick={this._onSubmit.bind(this)}
				 disabled={this.state.fetching}		   
				 buttonColor={styles.green}>
				Confirm
			      </ButtonPrimary>
			</div>
		    }

		    <SpinnerOrError fetching={this.state.fetching} error={this.state.errorMessage}/>
		    { this._renderTransferStatusInfo() }
		    
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


export default ConfirmTrasfer;
