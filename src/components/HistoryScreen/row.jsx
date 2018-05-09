import React from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { cancelTransfer } from '../../actions/transfer';
import styles from './styles';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


const StatusCell = ({transfer, cancelTransfer}) => {
    let link = (<Link to={`/transfers/${transfer.id}`} style={styles.statusCell.infoIcon}>i</Link>);
    switch (transfer.status) {
    case "depositing":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Depositing...</div>
              { link }
	    </div>	    
        );	    
        break;	
    case "deposited":
        return (
            <div style={styles.statusCell.container}>
              <CancelButton transfer={transfer} cancelTransfer={cancelTransfer}/>
              { link }
	    </div>
	);
        break;
    case "sent":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Sent</div>
              { link }
	    </div>
	);
        break;		
    case "receiving":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Receiving...</div>
              { link }
	    </div>	    
        );	    
        break;
    case "received":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Received</div>
              { link }
	    </div>
        );
        break;	
    case "cancelling":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Cancelling...</div>
              { link }
	    </div>	    
        );	    
        break;
    case "cancelled":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#f04234'}}>Cancelled</div>
              { link }
	    </div>	    
        );
        break;	
    default:
	return   (
	    <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>{transfer.status}</div>
              { link }
	    </div>
	);
    }
    
}


const CancelButton = ({transfer, cancelTransfer}) => {
    return (
        <div style={{width: 147, height: 25}}>
        <Button style={styles.cancelButton} onClick={async () => {
	      var r = confirm("Are you sure you want to cancel transfer?");
	      if (r) {
		  await cancelTransfer(transfer);		  
	      }
	  }}>
        Cancel
        </Button>
        </div>
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
