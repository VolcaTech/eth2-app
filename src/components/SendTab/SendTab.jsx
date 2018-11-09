import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { parse, format, asYouType } from 'libphonenumber-js';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import { sendTransfer, sendSpecialLinkTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import PhoneOrLink from './../common/PhoneLinkButton';
import CheckBox from './../common/CheckBox';
import { Error, ButtonLoader } from './../common/Spinner';
import WithHistory from './../HistoryScreen/WithHistory';
import E2PCarousel from './../common/E2PCarousel';
import web3Service from './../../services/web3Service';


const styles = {
    title: {
        width: '90%',
        height: 110,
        display: 'block',
        margin: 'auto',
        fontSize: 24,
        lineHeight: 1.4,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        marginBottom: 10,
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
    blueOpacity: '#80ccff',
    hiddenInput: {
        height: 0,
        overflow: 'hidden'
    }
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
            phoneError: false,
            phoneOrLinkActive: false,
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

    async _sendLinkTransfer() {
        try {
            const transfer = await this.props.sendSpecialLinkTransfer({
                amount: this.state.amount,
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

    _onSpecialLinkSubmit() {

        //format balance
        let balance;
        const web3 = web3Service.getWeb3();
        if (this.props.balanceUnformatted) {
            balance = web3.fromWei(this.props.balanceUnformatted, 'ether').toNumber();
        }

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
            this._sendLinkTransfer()
        }, 100);
    };

    _onPhoneLinkButtonClick() {
        this.state.phoneOrLinkActive === false ? this.setState({ phoneOrLinkActive: true }) : this.setState({ phoneOrLinkActive: false })
    }



    _renderForm() {
        const { sendMode } = this.props;
        let phoneInputStyle;
        if (sendMode === 'link') {
            phoneInputStyle = styles.hiddenInput
        }
        return (
            <Row>
                <Col sm={4} smOffset={4}>

                    <div>
                        <div style={(this.state.phoneOrLinkActive && window.innerWidth < 321) ? {...styles.title, height: 140, width: '98%'} : styles.title}>Send <div style={{ display: 'inline', color: '#999999' }}>Ether</div> to anyone<br />
                            <div style={{ display: 'inline', verticalAlign: 'sub', marginRight: 6 }}>simply by</div><PhoneOrLink active={this.state.phoneOrLinkActive} height={this.state.phoneOrLinkActive === false ? 37.5 : 71} handleClick={this._onPhoneLinkButtonClick.bind(this)} /></div>
                        <div style={styles.container}>
                            <div style={phoneInputStyle}>
                                <PhoneInput onChange={() => this.setState({ phoneError: false, errorMessage: "" })}
                                    _ref={(ref) => { this.phoneNumber = ref; }} placeholder="Phone number" error={this.state.phoneError} />
                            </div>			    
			    
                            <div style={styles.numberInput}>
                                <NumberInput
                                    onChange={({ target }) => (this.setState({ amount: target.value, numberInputError: false, errorMessage: "" })
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
                                    handleClick={sendMode === 'phone' ? this._onSubmit.bind(this) : this._onSpecialLinkSubmit.bind(this)}
                                    buttonColor={this.state.fetching ? styles.blueOpacity : styles.blue}
                                    disabled={this.state.buttonDisabled}>
                                    {this.state.fetching ? <ButtonLoader /> : "Send"}

                                </ButtonPrimary>

                                {(this.state.fetching || this.state.errorMessage) ? (<Error
                                    fetching={this.state.fetching}
                                    error={this.state.errorMessage} />) :
                                    <div style={styles.betaContainer}>
                                        <span style={styles.betaText}>
                                            *In beta you can send
				 <span style={styles.betaBold}> 1 ETH</span> max
				 </span>
                                    </div>}
                            </div>
                            <CheckBox onSubmit={() => this.state.checked === false ? this.setState({ checked: true, buttonDisabled: false, checkboxTextColor: '#000' }) : this.setState({ checked: false, buttonDisabled: false, checkboxTextColor: '#000' })} textColor={this.state.checkboxTextColor} />
                        </div>
                    </div>
                </Col>
            </Row>

        );
    }

    render() {
        return (
            <WithHistory {...this.props}>
                {this._renderForm()}
            </WithHistory>
        );
    }
}


export default connect(state => ({
    networkId: state.web3Data.networkId,
    balanceUnformatted: state.web3Data.balance,
    sendMode: state.sendMode
}), { sendTransfer, sendSpecialLinkTransfer })(Tab);
