import React from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { cancelTransfer } from '../../actions/transfer';
import styles from './styles';


const StatusCell = ({transfer, cancelTransfer}) => {    
    switch (transfer.status) {
    case "deposited":
        return (
            <CancelButton transfer={transfer} cancelTransfer={cancelTransfer}/>
	);
        break;
    case "received":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Received</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>
        );
        break;
    case "cancelled":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#f04234'}}>Cancelled</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>	    
        );
        break;
    case "depositing":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Depositing...</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>	    
        );	    
        break;
    case "receiving":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Receiving...</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>	    
        );	    
        break;
    case "cancelling":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Cancelling...</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>	    
        );	    
        break;
    default:
	return   (
	    <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>{transfer.status}</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>
	);
    }
    
}


const CancelButton = ({transfer, cancelTransfer}) => {
    return (
        <Button style={styles.cancelButton} onClick={async () => {
	      var r = confirm("Are you sure you want to cancel transfer?");
	      if (r) {
		  await cancelTransfer(transfer);		  
	      }
	  }}>
        Cancel
        </Button>
    );
}


const HistoryRow = ({transfer, cancelTransfer}) => {
     return (
        <div style={styles.row}>
          <div style={styles.amount}>{transfer.amount} ETH</div>
          <div style={styles.phone}>{transfer.receiverPhone}</div>
	  <StatusCell transfer={transfer} cancelTransfer={cancelTransfer}/>
        </div>                       
     )
 }


export default connect(null, {cancelTransfer})(HistoryRow);
