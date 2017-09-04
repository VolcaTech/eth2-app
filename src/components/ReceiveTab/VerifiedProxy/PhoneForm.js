import React, { Component } from 'react';
import Phone, { formatPhoneNumber, parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import { parse, format, asYouType } from 'libphonenumber-js';
import serverApi from "../../../utils/quid-server-api";
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
	    phoneCode: '',	    
            code: "",
	    error: "",
	    isFetching: false
        };
    }
    
    submit() {
        const component = this;
        console.log(this.state);
	this.setState({isFetching: true});
	const transferId = sha3(component.state.phoneCode + component.state.phone + component.state.code);
        serverApi.claimPhone(transferId).then(function(result) {
            console.log({result});
	    if (!result.success) {
		throw new Error((result.errorMessage || "Server error"));
	    }
	    component.setState({isFetching: false});	    
	    component.props.onSuccess(transferId, component.state.phone, component.state.code);
        }).catch(function(err) {
	    console.log({err});
	    component.setState({
		error: err.message,
		isFetching: false
	    });
	});
    }

    goBack() {
	this.props.goBack();
    }
    
    render() {
        const component = this;
        return (
            <form>
                    <div>
                        <label>
                            Your phone number
                </label>
                    </div>
                    <div>
			<Phone
		    value={component.state.phone} onChange={phone => {
			const phoneIsValid = isValidPhoneNumber(phone);
			const formatter = new asYouType();
			formatter.input(phone);
			console.log(formatter.country_phone_code);
			this.setState({ phoneCode: formatter.country_phone_code, phone, phoneIsValid  });
		    }
							   } />

                    </div>
                    <br />
                    <div>
                        <label>
                            Verification code
                        </label>
                    </div>
                    <div>
                        <input className="form-control" type="text"  onChange={(event)=>this.setState({code:event.target.value})} />
                    </div>
                    <br />
                <div>
                {this.state.isFetching ? <div className="loader-spin"></div> : ""}
		
                <a className="btn btn-md btn-default" onClick={()=>component.goBack()}> Go Back </a>		
                <a className="btn btn-md btn-accent" onClick={()=>component.submit()}> Submit </a>
		
		<span style={ {color: "red"}} > {component.state.error }</span>

                </div>
		</form>
        );
    }
}
