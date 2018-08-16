import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawLinkTransfer } from './../../actions/transfer';
import { Row, Col, Grid } from 'react-bootstrap';
import * as e2pService from '../../services/eth2phone';
import CodeInput from './../common/CodeInput';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import { SpinnerOrError, Loader } from './../common/Spinner';
import { getQueryParams, getNetworkNameById } from '../../utils';
import ConfirmSmsForm from './ConfirmSmsForm';
import { parse, format, formatNumber, asYouType, isValidNumber } from 'libphonenumber-js';
// import { isValidPhoneNumber } from 'react-phone-number-input';
const qs = require('querystring');
import web3Service from "../../services/web3Service";
import ConfirmTransfer from './ConfirmTransfer';
import { getDepositTxHash, getTxHashForStatus } from './utils';
import WithHistory from './../HistoryScreen/WithHistory';


const styles = {
    container: { alignContent: 'center' },
    titleContainer: {
        textAlign: 'center',
        marginTop: 54,
        marginBottom: 39
    },
    amountContainer: {
        fontSize: 35,
        fontFamily: 'SF Display Bold',
        textAlign: 'center',
        marginBottom: 38
    },
    amountNumber: { color: '#0099ff' },
    amountSymbol: { color: '#999999' },
    title: {
        fontSize: 24,
        fontFamily: 'SF Display Bold'
    },
    numberInput: {
        width: '78%',
        margin: 'auto',
        marginBottom: 21
    },
    button: {
        width: '78%',
        margin: 'auto'
    },
    green: '#2bc64f'
}


class ConfirmLinkScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
	    fetching: false
        };
    }

    
    async _withdrawWithPK() {
        let result;
        try {
            const transitPrivateKey = this.props.transitPrivateKey;
            const result = await this.props.withdrawLinkTransfer({transitPrivateKey});
            this.props.history.push(`/transfers/${result.id}`);
        } catch (err) {
            this.setState({ fetching: false, errorMessage: err.message, transfer: null });
        }
    }

 
    _onSubmit() {
        // // disabling button
        this.setState({ fetching: true });

        // // sending request for sms-code
        this._withdrawWithPK();
    }


    render() {
        return (
            <div style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: 250 }}>
                    <div style={styles.titleContainer}>
                        <span style={styles.title}>Claim Ether</span>
                    </div>

                    <div style={styles.amountContainer}>
                        <span style={styles.amountNumber}>{this.props.transfer.amount} </span><span style={styles.amountSymbol}>ETH</span>
                    </div>

                    <div style={styles.button}>
                        <ButtonPrimary
                           handleClick={this._onSubmit.bind(this)}
                           disabled={this.state.fetching}
                           buttonColor={styles.green}>
                          Confirm
		        </ButtonPrimary>
                    </div>

                    <SpinnerOrError fetching={this.state.fetching} error={this.state.errorMessage} />

                </div>
            </div>
        )
    }

}


export default connect(null, {withdrawLinkTransfer})(ConfirmLinkScreen);
