import React from "react";
import { connect } from 'react-redux';
import { cancelTransfer } from '../../actions/transfer';
import styles from './styles';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import arrowUp from './../../assets/images/up.png';
import arrowDown from './../../assets/images/down.png';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import infoLogo from './../../assets/images/Info.png'



const StatusCell = ({ transfer, cancelTransfer }) => {


    if (transfer.isError) {
        return (
            <div style={styles.statusCell.container}>
                <div style={{ ...styles.statusCell.statusText, color: '#f04234' }}>Failed</div>
            </div>
        );
    }

    switch (transfer.status) {
        case "depositing":
            return (
                <div style={styles.statusCell.container}>
                    <div style={styles.statusCell.statusText}>Depositing...</div>
                </div>
            );
            break;
        case "deposited":
            return (
                <div style={styles.statusCell.container}>
                    <CancelButton transfer={transfer} cancelTransfer={cancelTransfer} />
                </div>
            );
            break;
        case "sent":
            return (
                <div style={styles.statusCell.container}>
                    <div style={{ ...styles.statusCell.statusText }}>Claimed</div>
                </div>
            );
            break;
        case "receiving":
            return (
                <div style={styles.statusCell.container}>
                    <div style={styles.statusCell.statusText}>Claiming...</div>
                </div>
            );
            break;
        case "received":
            return (
                <div style={styles.statusCell.container}>
                    <div style={{ ...styles.statusCell.statusText, color: '#2bc64f' }}>Received</div>
                </div>
            );
            break;
        case "cancelling":
            return (
                <div style={styles.statusCell.container}>
                    <div style={styles.statusCell.pendingStatusText}>Canceling...</div>

                </div>
            );
            break;
        case "cancelled":
            return (
                <div style={styles.statusCell.container}>
                    <div style={{ ...styles.statusCell.statusText }}>Canceled</div>

                </div>
            );
            break;
        default:
            return (
                <div style={styles.statusCell.container}>
                    <div style={styles.statusCell.pendingStatusText}>{transfer.status}</div>
                </div>
            );
    }

}


const CancelButton = ({ transfer, cancelTransfer }) => {
    return (
        <Button className="cancel-button" onClick={async () => {
            var r = confirm("Are you sure you want to cancel transfer?");
            if (r) {
                await cancelTransfer(transfer);
            }
        }}>
            Cancel
        </Button>
    );
}



const HistoryRow = ({ transfer, cancelTransfer, currentTransferId, address }) => {
    let link = (<Link
        onClick={() => {
            // hack for vertical spinner to go back to transfer page.
            // we reload the page as it doesn't go back when path is not changed
            if (currentTransferId === transfer.id) {
                window.location.reload();
            }
        }}
		to={`/transfers/${transfer.id}`}
		style={{}}
		className="no-underline"
		><span style={styles.statusCell.infoIcon}>i</span></Link>);
    return (
        <div>
        <Row style={{marginBottom: 15}}>
            <Col style={styles.colVertAlign} xs={3}>
                <div style={styles.amount}><img src={address === transfer.senderAddress ? arrowUp : arrowDown} style={{ display: 'inline', width: 'unset', marginLeft: 12, marginRight: 4, paddingBottom: 3 }}></img>{transfer.amount}&nbsp;<div style={{color: '#999999', display: 'inline'}}>ETH</div></div>
            </Col>

            <Col style={styles.colVertAlign} xs={4}>
              <div style={styles.phone}>{transfer.verificationType === 'none' ?  'special link' : transfer.receiverPhone }</div>
            </Col>

            <Col style={styles.colVertAlign} xs={5}>
                <div style={{ width: 120, display: 'flex', flexDirection: 'row', margin: 'auto', paddingRight: 10 }}>
                    <StatusCell transfer={transfer} cancelTransfer={cancelTransfer} />
                    <div style={{ display: 'inline', marginLeft: 'auto' }}>
                        {link}
                    </div>
                </div>
            </Col>
        </Row>
        </div>
     )
 }


export default connect(null, { cancelTransfer })(HistoryRow);
