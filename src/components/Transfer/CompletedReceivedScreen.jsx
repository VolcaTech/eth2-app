import React, { CAomponent } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { parse, format, asYouType } from 'libphonenumber-js';
import ButtonPrimary from './../../components/common/ButtonPrimary';
import wallets from '../NotConnectedScreens/NoWalletScreen/wallets';
import { getCurrentWalletId } from '../../utils';
import web3Service from './../../services/web3Service';


const styles = {
    titleContainer: {
	marginTop: 65,
	marginBottom: 12
    },
    buttonContainer: {
	width: '70%',
	margin: 'auto',	
	marginTop: 70
    },    
    helpContainer: {
	marginTop: 27
    },
    stepsBar: {
	marginTop: 60
    }    
}


const CompletedReceivedScreen = ({transfer}) => {

    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});    
    const formattedPhone = format(transfer.receiverPhone, 'International');
    
    let dappStoreUrl = "https://dapps.trustwalletapp.com/";
    // get current wallet id
    const web3 = web3Service.getWeb3();
    const currentWalletId = getCurrentWalletId(web3);

    // get dapp store url for wallet if it has one
    if (currentWalletId !== 'other' &&
	wallets[currentWalletId] &&
	wallets[currentWalletId].dappStoreUrl) {
	
	dappStoreUrl = wallets[currentWalletId].dappStoreUrl;
    }
	
    
    
    return (
	<div>
	  <div style={styles.stepsBar}>
            <TransferStepsBar
	       status={transfer.status}
	       direction={transfer.direction}
	       isError={transfer.isError}/>
	  </div>
	  <div className="text-center">
	    <div style={styles.titleContainer}>
	      
	      <div className="title center">
		You claimed <span className="text-blue">{transfer.amount}</span>
		<span className="text-gray"> ETH</span>
	      </div> 
	    </div>
	    
	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.buttonContainer}>
	      <a href={dappStoreUrl} className="send-button no-underline">
		<ButtonPrimary buttonColor="#0099ff" className="landing-send">How to spend</ButtonPrimary>		
	      </a>
	    </div>
	    
	  </div>
	</div>
    );
}


export default CompletedReceivedScreen;
