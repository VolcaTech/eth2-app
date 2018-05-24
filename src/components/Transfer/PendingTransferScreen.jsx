// import React, { Component } from 'react';
// import { getEtherscanLink } from './components';
// import TransferStepsBar from './../common/TransferStepsBar';



// const styles = {
//     link: {
// 	color: '#0099ff',
// 	fontFamily: 'SF Display Bold',
//     },
//     titleContainer: {
// 	display: 'flex',
// 	flexDirection: 'column',
// 	justifyContent: 'space-between',
// 	marginTop: 65,
// 	marginBottom: 12
//     },
//     title: {
// 	display: 'block',
// 	margin: 'auto',
// 	fontSize: 20,
// 	fontFamily: 'SF Display Black',
// 	textAlign: 'center',
// 	lineHeight: '28px'
//     },
//     subTitleContainer: {
// 	width: 300,
// 	margin: 'auto',
//     },
//     subTitle: {
// 	fontSize: 14,	
// 	lineHeight: 1.25
//     },
//     helpContainer: {
// 	marginTop: 31.5	
//     },
//     helpText: {
// 	fontSize: 14,		
// 	lineHeight: 1.25
//     },
//     stepsBar: {
// 	marginTop: 60
//     },
//     center: {
// 	textAlign: 'center'
//     },
//     blue: {
// 	color: '#0099ff'
//     },
//     gray: {
// 	color: "#999999"
//     }
    
// }


// const PendingScreen = ({transfer}) => {
//     let title, subtitle;
//     if (transfer.status === "cancelling") {
// 	title = (<div style={styles.title}>Canceling transfer...</div>);
// 	const subtitle = (
// 	    <div style={styles.subTitle}>Having problems? Text us in <a href="https://t.me/eth2phone" style={styles.link}>Telegram</a><br/>
// 	      we are there to help</div>
// 	);

//     } else {
// 	title = (
// 	    <div style={styles.title}>
// 	      Transaction is processing...<br/>
// 	      Receiving <span style={styles.blue}>{transfer.amount}</span>
// 	      <span style={styles.gray}> ETH</span>
// 	    </div>
// 	);
// 	subtitle = (
// 	    <div style={styles.subTitle}>It may take 1-2 min. You can close the screen<br/>
// 	      and check the status later in "Transfer"</div>)
// 	;
//     }

//     const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});    
    
//     return (
// 	<div>
// 	  <div style={styles.stepsBar}>
//             <TransferStepsBar
// 	       status={transfer.status}
// 	       direction={transfer.direction}
// 	       isError={transfer.isError}/>
// 	  </div>
// 	  <div style={styles.center}>
// 	    <div style={styles.titleContainer}>
// 	      <div style={styles.title}>{title}</div>	      
// 	    </div>
// 	    <div style={styles.subTitleContainer}>
// 	      { subtitle } 
// 	    </div>

// 	    <div style={styles.helpContainer}>
// 	      <div style={styles.helpText}>Transaction details on <a href={etherscanLink} style={styles.link}>Etherscan</a> 
// 	      </div>	      
// 	    </div>
// 	  </div>
// 	</div>
//     );
// }


// export default PendingScreen;
