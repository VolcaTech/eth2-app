import React, { Component } from 'react';
import Phone, { formatPhoneNumber, parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import { parse, format, asYouType, isValidNumber } from 'libphonenumber-js';
import serverApi from "../../../utils/quid-server-api";
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

export default class ReceivePhoneTab extends Component {
    constructor(props) {
	let phoneParams = {};
        super(props);
	if (this.props.phone) {
	    phoneParams = this._checkPhone(this.props.phone);
	}
	
        this.state = {
            phone: this.props.phone,
            phoneCode: phoneParams.phoneCode,
            phoneIsValid: phoneParams.phoneIsValid,
            code: this.props.code,
            error: "",
            isFetching: false
        };
    }

    submit() {
        const component = this;
        console.log(this.state);
        this.setState({ isFetching: true });
        const transferId = sha3(component.state.phoneCode + component.state.phone + component.state.code);
        serverApi.claimPhone(transferId).then(function (result) {
            console.log({ result });
            if (!result.success) {
                throw new Error((result.errorMessage || "Server error"));
            }
            component.setState({ isFetching: false });
            component.props.onSuccess(transferId, component.state.phone, component.state.code);
        }).catch(function (err) {
            console.log({ err });
            component.setState({
                error: err.message,
                isFetching: false
            });
        });
    }

    _checkPhone(phone)  {
        const phoneIsValid = isValidNumber(phone);
        const formatter = new asYouType();
        formatter.input(phone);
        const phoneParams =  { phoneCode: formatter.country_phone_code, phone, phoneIsValid };
	console.log({phoneParams});
	return phoneParams;
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
              <div className="input-container">
		<div style={{ width: "90%", float: "left" }}>
		  <Phone value={component.state.phone} onChange={phone => component.setState(component._checkPhone(phone))} />
		</div>
		<div style={{ width: "10%", float: "right" }}>{this.state.phoneIsValid ?  <div className="green-tick" >&#10003;</div> : ""}</div></div>

              
              <br />
              <div>
                <label>
                  Verification code
                </label>
              </div>
              <div className="input-container">
		<div style={{ width: "90%", float: "left" }}>
                  <input className="form-control" type="text" value={component.state.code} onChange={(event) => this.setState({ code: event.target.value })} />
                </div><div style={{ width: "10%", float: "right" }}>{this.state.code.length === 8 ? <div className="green-tick" >&#10003;</div> : ""}</div></div>
              <br />
              <div>
                {this.state.isFetching ? <div className="loader-spin"></div> : ""}

                <a className="btn btn-md btn-default" onClick={() => this.props.goBack()}> Go Back </a>
                <a className="btn btn-md btn-accent btn-margin-left" onClick={() => component.submit()}> Submit </a>

                <span style={{ color: "red" }} > {component.state.error}</span>

              </div>
            </form>
        );
    }
}
