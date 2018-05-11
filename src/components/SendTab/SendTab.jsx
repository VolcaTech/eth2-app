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
import HistoryScreen from './../HistoryScreen';
import E2PCarousel from './../common/E2PCarousel';

const styles = {
    title: {
        width: '90%',
        height: 48,
        display: 'block',
        margin: 'auto',
        fontSize: 22,
        lineHeight: 1,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        marginBottom: 14,
        marginTop: 27
    },
    text1: {
        width: '85%',
        height: 68,
        display: 'block',
        margin: 'auto',
        fontSize: 15,
        lineHeight: '17px',
        fontFamily: 'SF Display Regular',
        textAlign: 'center',
        marginBottom: 36
    },
    blue: '#0099ff'
}


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
            fetching: false,
        };
    }

    async _sendTransfer(phone, phoneCode) {
        try {
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
            this.setState({ fetching: false, errorMessage: errorMsg });
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
            this.setState({ fetching: false, errorMessage: "Amount should be more than 0" });
            return;
        };

	// check amount maximum
        if (this.state.amount > 1) {
            this.setState({ fetching: false, errorMessage: "Maximum 1 eth is allowed at current stage of the product." });
            return;
        };

	
        // check that phone number is valid
        if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
            this.setState({ fetching: false, errorMessage: "Phone number is invalid" });
            return;
        };

        // disabling button
        this.setState({ fetching: true });

        // sending transfer
        setTimeout(() => {  // let ui update
            this._sendTransfer(phone, phoneCode);
        }, 100);
    };

    _renderForm() {
        return (
            <div className="col-sm-4 col-sm-offset-4">
                <div style={styles.title}>Send ether to everyone.<br />Easy. Secure. No wallet needed.</div>
                <div style={styles.text1}>You can send ether to anyone using just a phone number. Person receives the assets to any Ethereum address with a special link.</div>
        <div style={{height: 155, display: 'flex', margin: 'auto', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                </div>
                <div style={{ display: 'block', margin: 'auto', width: '78%', height: 39, marginBottom: 19, marginTop: 19 }}>
                    <NumberInput
                        onChange={({ target }) => (this.setState({ amount: target.value }))}
                        disabled={false}
                        fontColor='#000000'
                        backgroundColor='#fff'
                        style={{ touchInput: 'manipulation' }}
                        placeholder="ETH amount"
                    />
                </div>
                <div style={{width: '78%', display: 'block', margin: 'auto'}}>
                    <ButtonPrimary
                        handleClick={this._onSubmit.bind(this)}
                        buttonColor={styles.blue}
                        disabled={this.state.fetching}
                    >
                        Send
                    </ButtonPrimary>
                    <div style={{ height: 28, textAlign: 'center', marginTop: 10 }}>
                        {this.state.fetching ?
                            <div style={{ width: 20, margin: 'auto' }}>
                                <Spinner />
                            </div> :
                            <span style={{ color: '#ef4234', fontSize: 12 }}>{this.state.errorMessage}</span>
                        }
                    </div>
                </div>
                </div>
            </div>
        );
    }

    render() {
        const SendForm = this._renderForm();
        const History = (
            <div style={{ marginTop: 56 }}>
                <HistoryScreen />
            </div>
        );
        return (
            <E2PCarousel slides={[SendForm, History]} />
        );
    }
}


export default connect(null, { sendTransfer })(Tab);
