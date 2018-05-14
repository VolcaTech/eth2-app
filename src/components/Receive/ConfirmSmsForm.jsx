import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawTransfer } from '../../actions/transfer';
import { sendSmsToPhone } from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import Button from './../common/ButtonSmall';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import Timer from '../common/Timer';
import PropTypes from 'prop-types';
import Spinner from './../common/Spinner';


const Countdown = (props, context) => {
    const d = new Date(context.remaining);
    const { seconds } = {
        seconds: d.getUTCSeconds(),
    };
    return (
        <p>{`${seconds}`}</p>
    );
};

Countdown.contextTypes = {
    remaining: PropTypes.number,
};


const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}



class ConfirmSmsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smsCode: "",
            timer: true,
            smsButtonDisabled: true,
            fetching: false,
            remaining: 6000,
            errorMessage: ""
        };
    }

    async _confirmSmsAndWithdrawTransfer() {
        try {
            const withdrawParams = {
                phone: this.props.phone,
                phoneCode: this.props.phoneCode,
                secretCode: this.props.secretCode,
                smsCode: this.state.smsCode
            };
            console.log({ withdrawParams });
            const transfer = await this.props.withdrawTransfer(withdrawParams);
            console.log({ transfer });
            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log({ err });
            this.setState({ errorMessage: err.message, fetching: false });
        }
    }

    _onSubmit() {
        this.setState({ fetching: true });
        setTimeout(async () => {
            this._confirmSmsAndWithdrawTransfer();
        }, 100); // let UI update
    }

    _sendSmsAgain() {
        this.setState({ timer: false, smsButtonDisabled: true, fetching: true });
        setTimeout(async () => {
            console.log("sending sms");

            try {
                const result = await sendSmsToPhone({
                    phone: this.props.phone,
                    secretCode: this.props.secretCode,
                    phoneCode: this.props.phoneCode
                });
                console.log({ result });
                this.setState({ fetching: false, timer: true });
            } catch (err) {
                console.log({ err });
                this.setState({ errorMessage: err.message, fetching: false, timer: true });
            }
        }, 100);
    }


    render() {
        return (
            <div style={{ width: 290, margin: 'auto' }}>
                <div style={{ display: 'block', margin: 'auto', width: '70%', textAlign: 'center', fontSize: 15, lineHeight: 1, fontFamily: 'SF Display Regular', marginBottom: 20 }}><div style={{ fontFamily: 'SF Display Bold', display: 'inline' }}>Eth-2-phone</div> allows to send Ethereum to anybody by simply verifying phone number.</div>
                <div style={{ height: 22, width: 286, display: 'block', margin: 'auto', marginBottom: 28, textAlign: 'center', fontSize: 18, fontFamily: 'SF Display Regular'  }}>Enter SMS code you've received</div>
                <NumberInput type='tel' placeholder="Code from SMS" onChange={({ target }) => this.setState({ smsCode: target.value })} />
                <div style={{ height: 28, textAlign: 'center', paddingTop: 8 }}>
                    {this.state.fetching ?
                        <div style={{ width: 20, margin: 'auto' }}>
                            <Spinner />
                        </div> :
                        <span style={{ color: '#ef4234', fontSize: 15, fontFamily: 'SF Display Regular'  }}>{this.state.errorMessage}</span>
                    }
                </div>

                <div style={{ width: 285, height: 38, display: 'block', margin: 'auto', marginTop: 11, marginBottom: 43 }}>
                    <div style={{ display: 'inline-block', float: 'left' }}>
                        <Button
                            buttonColor='#0099ff'
                            disabled={this.state.smsButtonDisabled || this.state.fetching}
                            onClick={this._sendSmsAgain.bind(this)}>Send again</Button>
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <Button buttonColor='#2bc64f' onClick={this._onSubmit.bind(this)} disabled={this.state.fetching}>Receive</Button>
                    </div>
                </div>
                {this.state.timer ?
                    <div style={{ height: 28, width: 210, margin: 'auto', marginBottom: 46, display: this.state.timer ? 'block' : 'none', textAlign: 'center', fontSize: 15, fontFamily: 'SF Display Regular'  }}>Send code again in  seconds <Timer style={{ display: 'inline-block' }} afterComplete={() => this.setState({ smsButtonDisabled: false, timer: false })} interval={1000} remaining={60000}>
                        <Countdown />
                    </Timer>
                    </div> : null}
            </div>
        );
    }
}



export default connect(null, { withdrawTransfer, sendSmsToPhone })(ConfirmSmsForm);
