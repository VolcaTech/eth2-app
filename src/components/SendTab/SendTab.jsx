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
import { Row, Col } from 'react-bootstrap';


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
        marginBottom: 50,
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
    container: {
        height: 155,
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    numberInput: {
        display: 'block',
        margin: 'auto',
        width: '78%',
        height: 39,
        marginBottom: 19,
        marginTop: 19
    },
    sendButton: {
        width: '78%',
        display: 'block',
        margin: 'auto'
    },
    spinner: {
        height: 28,
        textAlign: 'center',
        marginTop: 10
    },
    betaText: {
        fontSize: 12,
        fontFamily: 'SF Display Regular',
        opacity: 0.4,
        textAlign: 'center',
        margin: 10
    },
    betaBold: {
        display: 'inline',
        fontFamily: 'SF Display Bold'
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
            buttonDisabled: false,
            checked: false,
            checkboxTextColor: '#000',
            numberInputError: false,
            phoneError: false
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

        // get dial code from phone number
        const formatter = new asYouType();
        formatter.input(phone);
        const phoneCode = formatter.country_phone_code;

        // check that phone number is valid
        if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
            this.setState({ fetching: false, errorMessage: "Phone number is invalid", phoneError: true });
            return;
        };

        // check amount
        if (this.state.amount <= 0) {
            this.setState({ fetching: false, errorMessage: "Amount should be more than 0", numberInputError: true });
            return;
        };

        // check amount maximum
        if (this.state.amount > 1 && this.props.networkId === "1") {
            this.setState({ fetching: false, errorMessage: "Maximum 1 eth is allowed at current stage of the product.", numberInputError: true });
            return;
        };

        if (this.state.checked === false) {
            this.setState({ buttonDisabled: true, checkboxTextColor: '#e64437' })
            return;
        }

        // disabling button
        this.setState({ fetching: true });

        // sending transfer
        setTimeout(() => {  // let ui update
            this._sendTransfer(phone, phoneCode);
        }, 100);
    };

    _renderForm() {
        return (
            <Row>
                <Col sm={4} smOffset={4}>

                    <div>
                        <div style={styles.title}>Send Ether to everyone<br />just by phone number</div>
                        <div style={styles.container}>
                            <div>
                                <PhoneInput onChange={() => this.setState({phoneError: false, errorMessage: ""})}
                                 _ref={(ref) => { this.phoneNumber = ref; }} error={this.state.phoneError}/>
                            </div>
                            <div style={styles.numberInput}>
                                <NumberInput
                                    onChange={({ target }) => (this.setState({ amount: target.value, numberInputError: false, errorMessage: ""})
                                )}
                                    disabled={false}
                                    fontColor='#000000'
                                    backgroundColor='#fff'
                                    style={{ touchInput: 'manipulation' }}
                                    placeholder="ETH amount"
                                    error={this.state.numberInputError}
                                />
                            </div>
                            <div style={styles.sendButton}>
                                <ButtonPrimary
                                    handleClick={this._onSubmit.bind(this)}
                                    buttonColor={styles.blue}
                                    disabled={this.state.buttonDisabled}
                                >
                                    Send
                    </ButtonPrimary>
                                <div style={styles.spinner}>
                                    {this.state.fetching ?
                                        <div style={{ width: 20, margin: 'auto' }}>
                                            <Spinner />
                                        </div> :
                                        <span style={{ color: '#ef4234', fontSize: 15 }}>{this.state.errorMessage}</span>
                                    }
                                </div>
                            </div>
                            <div style={styles.betaText}>*In beta you can send &nbsp;<div style={styles.betaBold}>&nbsp;1 ETH</div> max</div>
                            <CheckBox onSubmit={() => this.setState({ checked: true, buttonDisabled: false, checkboxTextColor: '#000' })} textColor={this.state.checkboxTextColor} />
                        </div>
                    </div>
                </Col>
            </Row>

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


export default connect(state => ({
    networkId: state.web3Data.networkId
}), { sendTransfer })(Tab);
