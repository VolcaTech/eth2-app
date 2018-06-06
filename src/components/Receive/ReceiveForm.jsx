import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import * as e2pService from '../../services/eth2phone';
import CodeInput from './../common/CodeInput';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import { SpinnerOrError, Loader } from './../common/Spinner';
import { getQueryParams, getNetworkNameById } from '../../utils';
import ConfirmSmsForm from './ConfirmSmsForm';
import { parse, format, formatNumber, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
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


class ReceiveScreen extends Component {
    constructor(props) {
        super(props);

        const queryParams = qs.parse(props.location.search.substring(1));

        // parse phone params
        let phone = queryParams.phone || queryParams.p;
        const secretCode = (queryParams.code || queryParams.c);
        this.networkId = queryParams.chainId || queryParams.n || "1";
        phone = `+${phone}`;
        const formatter = new asYouType();
        formatter.input(phone);
        this.phoneParams = {
            phone,
            phoneCode: formatter.country_phone_code,
            //  phoneIsValid,
            phoneFormatted: "+" + formatter.country_phone_code + " " + format(phone, 'National')
        };


        this.state = {
            errorMessage: "",
            firstLoading: true,
            fetching: false,
            transfer: null,
            hasCode: false,
            secretCode,
            codeFromUrl: (secretCode && secretCode.length > 10)
        };


    }

    async componentDidMount() {
        if (this.state.secretCode) {
            this.setState({ fetching: true });
            await this._fetchTransferFromServer();
        }
        this.setState({ firstLoading: false });
    }

    async _fetchTransferFromServer(code = null, hasCode = true) {
        try {
            this._checkNetwork();

            const result = await e2pService.fetchTransferDetailsFromServer({
                phone: this.phoneParams.phone,
                phoneCode: this.phoneParams.phoneCode,
                secretCode: code || this.state.secretCode
            });

            if (!result.success) { throw new Error(result.errorMessage || "Server error"); };
            result.transfer.txHash = getTxHashForStatus(result.transfer);
            result.transfer.networkId = this.props.networkId;
            this.setState({
                fetching: false,
                hasCode,
                firstLoading: false,
                transfer: result.transfer,
                transferStatus: result.transfer.status
            });

            // subscribe for update
            if (result.transfer.status === 'depositing') {
                const web3 = web3Service.getWeb3();
                const txHash = getDepositTxHash(result.transfer.events);
                const txReceipt = await web3.eth.getTransactionReceiptMined(txHash);
                result.transfer.txHash = txHash;
                let transferStatus;
                if (txReceipt.status === '0x0') { // if error
                    result.transfer.status = 'error';
                    result.transfer.isError = true;

                } else {
                    result.transfer.status = 'deposited';
                    this.setState({
                        transferStatus: result.transfer.status,
                        transfer: result.transfer
                    });
                }
            }
        } catch (err) {
            this.setState({ fetching: false, errorMessage: err.message, transfer: null });
        }
        this.setState({ firstLoading: false });
    }


    _checkNetwork() {
        if (this.networkId && this.networkId != this.props.networkId) {
            const networkNeeded = getNetworkNameById(this.networkId);
            const currentNetwork = getNetworkNameById(this.props.networkId);
            const msg = `Transfer is for ${networkNeeded} network, but you are on ${currentNetwork} network`;
            throw new Error(msg);
        }
    }

    _onSubmit() {
        // // disabling button
        this.setState({ fetching: true });

        // // sending request for sms-code
        this._fetchTransferFromServer();
    }

    _onSecretCodeInputChange({ target }) {
        let text = target.value;
        if (text.length > 20) {
            const words = text.split(" ");
            const codeCandidates = words.filter(w => w.length === 20);
            if (codeCandidates.length === 1) {
                text = codeCandidates[0];
            }
        }
        this.setState({ secretCode: text, errorMessage: null });

        // try fetch transfer if code is right length
        if (text.length === 20) {
            this._fetchTransferFromServer(text, false);
        }
    }

    _renderPasteCodeForm() {
        return (
            <div>            
                <div style={styles.titleContainer}>
                    <span style={{...styles.title, fontSize: window.innerWidth === 320 ? 22 : 24}}>Receive ether</span>
                </div>

                {this.state.transfer && this.state.transfer.amount ?
                    <div style={styles.amountContainer}>
                        <span style={styles.amountNumber}>{this.state.transfer.amount} </span><span style={styles.amountSymbol}>ETH</span>
                    </div> : null
                }


                <div style={styles.numberInput} className={this.state.errorMessage ? "errorInput" : null}>
                    <CodeInput type="text"
                        disabled={false}
                        placeholder="Paste message with code"
                        error={this.state.errorMessage}
                        value={this.state.secretCode}
                        onChange={this._onSecretCodeInputChange.bind(this)} />
                </div>
                <div style={{...styles.numberInput, width: '100%'}}>
                    <PhoneInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.phoneParams.phoneFormatted} />
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
        );
    }

    render() {
        // add flag that transfer fetched from server
        const transfer = this.state.transfer && { ...this.state.transfer, fetchedFromServer: true };

        const props = {
            ...this.props,
            ...this.phoneParams,
            secretCode: this.state.secretCode,
            transfer,
            transferStatus: this.state.transferStatus,
            codeFromUrl: this.state.codeFromUrl
        };
        console.log({ props, state: this.state });

        if (this.state.firstLoading) {
            return <Loader text="Getting transfer details..." textLeftMarginOffset={-40} />;
        }

        return (
            <WithHistory {...this.props}>
                <Grid>
                    <Row>
                        <Col sm={4} smOffset={4}>
                            <div style={styles.container}>
                                <div>
                                    {this.state.hasCode ?
                                        <ConfirmTransfer {...props} />
                                        : this._renderPasteCodeForm()}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </WithHistory>
        );
    }
}


export default connect(state => ({ networkId: state.web3Data.networkId }))(ReceiveScreen);
