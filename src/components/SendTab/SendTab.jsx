import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import { parse, format, asYouType } from 'libphonenumber-js';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Error, ButtonLoader } from './../common/Spinner';
import WithHistory from './../HistoryScreen/WithHistory';
import E2PCarousel from './../common/E2PCarousel';
import { Row, Col } from 'react-bootstrap';
import web3Service from './../../services/web3Service';


const styles = {
    title: {
        width: '90%',
        height: 48,
        display: 'block',
        margin: 'auto',
        fontSize: 24,
        lineHeight: 1,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        marginBottom: 30,
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
        fontSize: 13,
        fontFamily: 'SF Display Regular',
        opacity: 0.4,
    },
    betaContainer: {
	paddingTop: 8,
	height: 28,
	textAlign: 'center',	
    },
    betaBold: {
        fontFamily: 'SF Display Bold'
    },
    blue: '#0099ff',
    blueOpacity: '#80ccff'
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
	
        //format balance
        let balance;
        const web3 = web3Service.getWeb3();
        if (this.props.balanceUnformatted) {
            balance = web3.fromWei(this.props.balanceUnformatted, 'ether').toNumber();
	}

        // check that phone number is valid
	const isValidNumber = (phone || "").length >= 9;
        if (!isValidNumber) {
            this.setState({ fetching: false, errorMessage: "Phone number is invalid", phoneError: true });
            return;
        };

        // check amount
        if (this.state.amount <= 0) {
            this.setState({ fetching: false, errorMessage: "Amount should be more than 0", numberInputError: true });
            return;
        };

        // check amount maximum
        if (this.state.amount > 1) {
            this.setState({ fetching: false, errorMessage: (<span>*In beta you can send <span style={styles.betaBold}>1 ETH</span> max.</span>), numberInputError: true });
            return;
        };

        // check wallet has enough ether
        if (this.state.amount > balance) {
            this.setState({ fetching: false, errorMessage: "Not enough ETH on your balance", numberInputError: true });
            return;
        };

        // check if checkbox is submitted
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
                        <div style={styles.container}>
			  <div className="text">Service is at maintenance. Deposits are temporarily stopped. </div>
                        </div>
                    </div>
                </Col>
            </Row>

        );
    }

    render() {
	return (
	    <WithHistory {...this.props}>
	      { this._renderForm() } 
	    </WithHistory>
	);
    }
}


export default connect(state => ({
    networkId: state.web3Data.networkId,
    balanceUnformatted: state.web3Data.balance
}), { sendTransfer })(Tab);
