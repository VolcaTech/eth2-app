import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
            buttonDisabled: true,
            buttonOpacity: 0.1
        };
    }

    async _sendTransfer({ phone, phoneCode }) {
        try {
            const transfer = await this.props.sendTransfer({
                amount: this.state.amount,
                phone,
                phoneCode
            });
            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log(err);
            this.setState({ errorMessage: err.message });
        }
    }

    _onSubmit() {
        // hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
        const phoneCode = this.phoneNumber.state.selectedCountry.dialCode;
        let phone = this.phoneNumber.state.formattedNumber;
        // remove formatting from phone number
        phone = "+" + phone.replace(/\D+/g, "");

        // check that phone number is valid
        // if (!isValidPhoneNumber(phone)) {
        //     this.setState({ errorMessage: "Phone number is invalid" });
        //     return null;
        // };

        // check amount
        if (this.state.amount <= 0) {
            this.setState({ errorMessage: "Amount should be more than 0" });
            return null;
        };


        // this.setState({showPendingTransfer: true, step: 1});	
        this._sendTransfer({ phone, phoneCode });
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
                <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
                    {this.state.errorMessage}
                </div>
                <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginBottom: 25 }}>
                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                </div>
                <div style={{marginBottom: 28}}>
                    <ButtonPrimary handleClick={this._onSubmit.bind(this)} disabled={this.state.buttonDisabled} opacity={this.state.buttonOpacity} buttonColor={e2pColors.green}>
                        Send
		</ButtonPrimary>
                </div>
                <div style={{marginBottom: 20}}><CheckBox onChange={() => this.setState({buttonDisabled: false, buttonOpacity: 1})}/></div>
                <Link to="/history">History</Link>
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

const SendForm = () => {
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
                <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
                    {this.state.errorMessage}
                </div>
                <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginBottom: 25 }}>
                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                </div>
                <div style={{marginBottom: 28}}>
                    <ButtonPrimary handleClick={this._onSubmit.bind(this)} disabled={this.state.buttonDisabled} opacity={this.state.buttonOpacity} buttonColor={e2pColors.green}>
                        Send
		</ButtonPrimary>
                </div>
                <div style={{marginBottom: 20}}><CheckBox onChange={() => this.setState({buttonDisabled: false, buttonOpacity: 1})}/></div>
                <Link to="/history">History</Link>
            </div>
    )
}


const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);
