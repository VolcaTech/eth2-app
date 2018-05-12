import React from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { cancelTransfer } from '../../actions/transfer';
import styles from './styles';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


const StatusCell = ({transfer, cancelTransfer}) => {
    if (transfer.isError) {
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.pendingStatusText, color: 'red'}}>Error</div>
	    </div>	    
        );	    
    }
    
    switch (transfer.status) {
    case "depositing":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Depositing...</div>
	    </div>	    
        );	    
        break;	
    case "deposited":
        return (
            <div style={styles.statusCell.container}>
              <CancelButton transfer={transfer} cancelTransfer={cancelTransfer}/>              
	    </div>
	);
        break;
    case "sent":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Sent</div>              
	    </div>
	);
        break;		
    case "receiving":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Receiving...</div>
              
	    </div>	    
        );	    
        break;
    case "received":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Received</div>
              
	    </div>
        );
        break;	
    case "cancelling":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Cancelling...</div>
              
	    </div>	    
        );	    
        break;
    case "cancelled":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#f04234'}}>Cancelled</div>
              
	    </div>	    
        );
        break;	
    default:
	return   (
	    <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>{transfer.status}</div>              
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



const HistoryRow = ({transfer, cancelTransfer, currentTransferId}) => {
    let link = (<Link
		onClick={() => {
		    // hack for vertical spinner to go back to transfer page.
		    // we reload the page as it doesn't go back when path is not changed
		    if (currentTransferId === transfer.id) {
    			window.location.reload();
		    }		    
		}}
		to={`/transfers/${transfer.id}`}
		style={styles.statusCell.infoIcon}>i</Link>);

    
    return (
        <div style={styles.row}>
          <div style={styles.amount}>{transfer.amount} ETH</div>
          <div style={styles.phone}>{transfer.receiverPhone}</div>
	  <div style={styles.statusCellContainer}>	  
	    <StatusCell  transfer={transfer} cancelTransfer={cancelTransfer}/>
	  </div>
	  <div style={styles.infoLinkContainer}>
	    { link }	    
	  </div>
        </div>                       
     )
 }


export default connect(null, {cancelTransfer})(HistoryRow);
