import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import PendingTransfer from './PendingTransfer';


function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            sentTransferId: null,
            showPendingTransfer: false,
            step: 0,
            smsCode: "",
            buttonDisabled: true,
            buttonOpacity: 0.1
        };
    }

    async _sendTransfer() {
        try {
            const transfer = await this.props.sendTransfer({
                amount: 0.0123,
                phone: "+711111111",
                phoneCode: "7"
            });
            console.log({ transfer });
            this.setState({
                sentTransferId: transfer.id,
                step: 2
            });
        } catch (err) {
            console.log(err);
            this.setState({ errorMessage: err.message });
        }
    }

    _onSubmit() {
        this.setState({ showPendingTransfer: true, step: 1 });
        this._sendTransfer();
    }

    render() {
        return (
            <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>

                {this.state.showPendingTransfer ? <PendingTransfer step={this.state.step} transferId={this.state.sentTransferId} /> :
                    <div>
                        <div>
                            <NumberInput disabled={false} fontColor='black' backgroundColor='#fff' />
                        </div>
                        <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
                            {this.state.errorMessage}
                        </div>
                        <PhoneInput />
                        <div style={{ marginTop: 28, marginBottom: 28 }}><ButtonPrimary handleClick={this._onSubmit.bind(this)} buttonColor={e2pColors.green} disabled={this.state.buttonDisabled} opacity={this.state.buttonOpacity}>
                            Send
					      </ButtonPrimary>
                        </div>
                        <CheckBox onChange={() => this.setState({buttonDisabled: false, buttonOpacity: 1})}/>
                    </div>
                }
            </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);