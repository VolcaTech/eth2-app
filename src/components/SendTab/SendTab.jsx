import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import VerifiedProxyTab from './VerifiedProxy/VerifiedProxyTab';
import web3Service from "../../services/web3Service";
import Header from './../common/Header.jsx';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';


function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}

class Tab extends Component {
    state = {
	phone: '',
	amount: 0,
	phoneCode: ''
    }
    
    async _onSubmit() {
	try {
	    const transfer = this.props.sendTransfer({
		amount: 0.0123,
		phone: "+711111111",
		phoneCode: "7"
	    });
	    console.log({transfer});
	} catch(err) {
	    console.log(err);
	}
    }
    
    render() {
        return (
            <div style={{ alignContent: 'center' }}>
              <Header />
              <NumberInput />
              <div style={{
		       margin: 'auto',
		       marginTop: 10,
		       marginBottom: 10
                   }}>
                <PhoneInput />
              </div>
              <ButtonPrimary handleClick={this._onSubmit.bind(this)} buttonColor={e2pColors.green}>
                Send
              </ButtonPrimary>
            </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, {sendTransfer})(Tab);
