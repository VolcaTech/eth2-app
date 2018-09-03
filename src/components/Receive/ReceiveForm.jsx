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
import { parse, format, formatNumber, asYouType, isValidNumber } from 'libphonenumber-js';
// import { isValidPhoneNumber } from 'react-phone-number-input';
const qs = require('querystring');
import web3Service from "../../services/web3Service";
import ConfirmTransfer from './ConfirmTransfer';
import { getDepositTxHash, getTxHashForStatus } from './utils';
import WithHistory from './../HistoryScreen/WithHistory';


class ReceiveScreen extends Component {
    constructor(props) {
        super(props);

        const queryParams = qs.parse(props.location.search.substring(1));

        // parse phone params
        let phone = queryParams.phone || queryParams.p;
        const secretCode = (queryParams.code || queryParams.c);
        const transitPrivateKey = queryParams.pk;
        const amount = queryParams.a;
        this.networkId = queryParams.chainId || queryParams.n || "1";
        phone = `+${phone}`;
        const formatter = new asYouType();
        formatter.input(phone);
        this.phoneParams = {
            phone,
            phoneCode: formatter.country_phone_code,
            phoneFormatted: "+" + formatter.country_phone_code + " " + format(phone, 'National')
        };
	
        this.state = {
            errorMessage: "",
            fetching: true,
            transfer: null,
            secretCode,
            transitPrivateKey,
            amount
        };
    }

    
    async componentDidMount() {
        if (this.state.secretCode || this.state.transitPrivateKey) {
            await this._fetchTransferFromServer();
        } else {
	    alert("No secret code or transit private key provided in url!");
            this.setState({ fetching: false });
	}
	}

    async _fetchTransferFromServer() {
        let result;
        try {
            this._checkNetwork();

            result = await e2pService.fetchTransferDetailsFromServer({
                phone: this.phoneParams.phone,
                phoneCode: this.phoneParams.phoneCode,
                secretCode: this.state.secretCode,
		transitPrivateKey: this.state.transitPrivateKey
            });

	    console.log({result});

            if (!result.success) { throw new Error(result.errorMessage || "Server error"); };
            result.transfer.txHash = getTxHashForStatus(result.transfer);
            result.transfer.networkId = this.props.networkId;
	    
            this.setState({
                fetching: false,
                transfer: result.transfer,
                transferStatus: result.transfer.status
            });

            // subscribe for update
            if (result.transfer.status === 'depositing') {
                const web3 = web3Service.getWeb3();
                const txHash = getDepositTxHash(result.transfer.events);
                const txReceipt = await web3.eth.getTransactionReceiptMined(txHash);
                result.transfer.txHash = txHash;
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
        this.setState({ fetching: false });
    }

    
    _checkNetwork() {
        if (this.networkId && this.networkId != this.props.networkId) {
            const networkNeeded = getNetworkNameById(this.networkId);
            const currentNetwork = getNetworkNameById(this.props.networkId);
            const msg = `Transfer is for ${networkNeeded} network, but you are on ${currentNetwork} network`;
	    alert(msg);
            throw new Error(msg);
        }
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
	    transitPrivateKey: this.state.transitPrivateKey
        };

        if (this.state.fetching) {
            return <Loader text="Getting transfer details..." textLeftMarginOffset={-40} />;
        }

	
	console.log("fetched ");
	console.log(this.state);

	if (this.state.errorMessage) {
            return <SpinnerOrError fetching={false} error={this.state.errorMessage} />;
	}
	
        return (
            <WithHistory {...this.props}>
                <Grid>
                    <Row>
                        <Col sm={4} smOffset={4}>
                          <ConfirmTransfer {...props} />
                        </Col>
                    </Row>
                </Grid>
            </WithHistory>
        );
    }
}


export default connect(state => ({ networkId: state.web3Data.networkId, receiverAddress: state.web3Data.address }))(ReceiveScreen);
