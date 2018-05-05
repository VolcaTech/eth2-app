import React from "react";
import { Button } from 'react-bootstrap';
import styles from './styles';


const StatusCell = ({transfer}) => {    
    switch (transfer.status) {
    case "sent":
        return (
            <CancelButton transfer={transfer}/>
	);
        break;
    case "completed":
        return (
            <div style={styles.statusCell.container}>
              <div style={{...styles.statusCell.statusText, color: '#33aeff'}}>Completed</div>
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
    case "pending":
        return (
            <div style={styles.statusCell.container}>
              <div style={styles.statusCell.pendingStatusText}>Pending...</div>
              <div style={styles.statusCell.infoIcon}>i</div>
	    </div>	    
        );	    
        break;
    }
    
}


const CancelButton = ({transfer}) => {
    return (
        <Button style={styles.cancelButton}>
        Cancel
        </Button>
    );
}


const HistoryRow = ({transfer}) => {
     return (
        <div style={styles.row}>
          <div style={styles.amount}>{transfer.amount} ETH</div>
          <div style={styles.phone}>{transfer.receiverPhone}</div>
	  <StatusCell transfer={transfer}/>
        </div>                       
     )
 }


export default HistoryRow;
