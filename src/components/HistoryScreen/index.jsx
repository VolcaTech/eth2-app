import React from "react";
import { connect } from 'react-redux';
import { getTransfersForActiveAddress } from './../../data/selectors';
import HistoryRow from './row';
import { Row, Col } from 'react-bootstrap';


class HistoryScreen extends React.Component {

    render() {
        // if currently on transfer page
        let currentTransferId = null;
        if (this.props.match && this.props.match.params) {
            currentTransferId = this.props.match.params.transferId;
        }
        return (
            <div style={{ paddingTop: 0, height: 600, paddingBottom: 30 }}>
                <div style={{ textAlign: 'center', fontSize: 20, fontFamily: 'SF Display Black', marginBottom: 30 }}>Transfers</div>
                <Row>
                    <Col sm={4} smOffset={4}>
                        {this.props.transfers.map(transfer => <HistoryRow transfer={transfer}
                            key={transfer.id}
                            currentTransferId={currentTransferId} address={this.props.address} />)}
                    </Col>
                </Row>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        transfers: getTransfersForActiveAddress(state),
        address: state.web3Data.address
    };
}


export default connect(mapStateToProps)(HistoryScreen);
