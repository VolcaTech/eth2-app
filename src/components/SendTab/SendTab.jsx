import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import { parse, format, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Spinner from './../common/Spinner';


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
	    fetching: false
        };
    }

    async _sendTransfer(phone, phoneCode) {
        try {
	    console.log({phone, phoneCode});
            const transfer = await this.props.sendTransfer({
                amount: this.state.amount,
                phone,
                phoneCode
            });
            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log(err);
	    let errorMsg = err.message;
	    if (err.isOperational) errorMsg = "User denied transaction";
            this.setState({fetching: false, errorMessage: errorMsg });	    
        }

    }
    
    
    _onSubmit() {

        // hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
        let phone = this.phoneNumber.state.formattedNumber;

        // remove formatting from phone number
        phone = "+" + phone.replace(/\D+/g, "");

	const formatter = new asYouType();
	formatter.input(phone);
	
	const phoneCode = formatter.country_phone_code;
	
        // check amount
        if (this.state.amount <= 0) {
	    this.setState({fetching:false, errorMessage: "Amount should be more than 0"});	    
	    return;
        };
	
        // check that phone number is valid
        if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
	    this.setState({fetching:false, errorMessage: "Phone number is invalid"});
	    return;
        };

	// disabling button
	this.setState({fetching: true});
	
	// sending transfer
	setTimeout(() => {  // let ui update
            this._sendTransfer(phone, phoneCode);
	}, 100);
    };

    _renderForm() {
        return (
	    <div>
                <div>
                    <NumberInput
                        onChange={({ target }) => {
                            const amount = target.value;
                            this.setState({ amount });
                        }}
                        disabled={false}
                        fontColor='black'
                        backgroundColor='#fff'
                        placeholder="amount (ETH)"
                    />

                </div>


                <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginBottom: 25, marginTop:25 }}>
                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                </div>
                <div>
                  <ButtonPrimary
		     handleClick={this._onSubmit.bind(this)}
		     buttonColor={e2pColors.blue}
		     disabled={this.state.fetching}
		     >		    
                    Send
		  </ButtonPrimary>
		  <div style={{ height: 28, textAlign: 'center'}}>
		    { this.state.fetching ?
			<div style={{marginTop:10}}>
			      <Spinner/>
			    </div>:
			    <span style={{color: '#ef4234', fontSize: 9}}>{this.state.errorMessage}</span>
			    }		
		  </div>
		  
                </div>
                <div>
		  <CheckBox/>
		</div>
		<div style={{textAlign: 'center', marginTop:20}}>
                  <Link to="/history">Recent Transfers</Link>
		</div>
            </div>
        );
    }

    render() {
        return (
            <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>
                {this._renderForm()}
            </div>
        );
    }
}



const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);
