export const getDepositTxHash = (events) => {
    const event = events
	      .filter(event => event.eventName === 'deposit' &&
		      event.txStatus === 'pending')
	      .sort((a,b) => b.gasPrice - a.gasPrice)[0]; 
    return event.txHash;	
};
    
    
export const getTxHashForMinedEvent = (events, eventName) => {
    const event = events
	      .filter(event => event.eventName === eventName &&
		      event.txStatus === 'success')[0];
    return event.txHash;	
}
    

// const getInfoMessageForStatus = (status) => {
//     let infoMessage, txHash;
//     switch (status)  {
//     case 'completed':	    
// 	infoMessage = 'Transfer has been received';
// 	break;
//     case 'cancelled': 
// 	infoMessage = 'Transfer has been cancelled';
// 	break;
//     case 'depositing': 
// 	infoMessage = 'Transaction has been initiated recently and has not been processed yet, please wait...';
// 	break;
//     case 'error':
// 	infoMessage = 'Transaction has failed. See transaction details for more info.';
// 	break;
//     }
//     return infoMessage;	
// }


export const getTxHashForStatus = (transfer) => {
    let infoMessage, txHash;
    switch (transfer.status)  {
    case 'completed':	    
	txHash = getTxHashForMinedEvent(transfer.events, 'withdraw');
	break;
    case 'cancelled': 
	txHash = getTxHashForMinedEvent(transfer.events, 'cancel');
	break;
    case 'depositing':
    case 'error':	
	txHash = getDepositTxHash(transfer.events);
	break;
    }
    return txHash;	
}


// export const getInfoMessageAndTxHashForStatus = (transfer) => {
//     const txHash = getTxHashForStatus(transfer);
//     const infoMessage = getInfoMessageForStatus(transfer.status);    
//     return { txHash, infoMessage };
// }
