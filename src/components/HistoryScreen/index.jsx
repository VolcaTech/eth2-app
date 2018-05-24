import React from "react";
import { connect } from 'react-redux';
import { getTransfersForActiveAddress } from './../../data/selectors';
import HistoryRow from './row';
import { Row, Col } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


const styles = {
    screen: { paddingTop: 0, height: 600, paddingBottom: 30 },
    transfers: { textAlign: 'center', fontSize: 24, fontFamily: 'SF Display Black', marginBottom: 30 },
    noTransfersContainer: {textAlign: 'center', marginTop: 100},
    illustration: {width: 'unset', marginBottom: 10},
    illustrationText: {fontSize: 24, fontFamily: 'SF Display Bold', color: '#0099ff'}
}

class HistoryScreen extends React.Component {

    render() {
        // if currently on transfer page
        let currentTransferId = null;
        if (this.props.match && this.props.match.params) {
            currentTransferId = this.props.match.params.transferId;
        }
        return (
            <div style={styles.screen}>
                <div style={styles.transfers}>Transfers</div>
                {this.props.transfers.length === 0 ? (
                    <div style={styles.noTransfersContainer}>
                    <RetinaImage src="https://eth2.io/images/transfer_illustration.png" style={styles.illustration} />
                    <div style={styles.illustrationText}>Your future transfers<br/>will be here</div>
                    </div>
                ) :
                    (
                        <Row>
                            <Col sm={4} smOffset={4}>
                                {this.props.transfers.map(transfer => <HistoryRow transfer={transfer}
                                    key={transfer.id}
                                    currentTransferId={currentTransferId} address={this.props.address} />)}
                            </Col>
                        </Row>
                    )
                }
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
