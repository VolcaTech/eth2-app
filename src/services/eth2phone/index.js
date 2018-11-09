import Promise from "bluebird";
import escrowContract from "./escrowContract";
import * as verificationServer from "./verificationServer";
import {
    generateKeystoreWithSecret,
    generateTransferId, getSignatureForReceiveAddress, getSignatureForLinkTransfer } from './utils';
import { sha3 } from 'web3-utils';
import getWeb3 from './../../utils/getWeb3';
const Wallet = require('ethereumjs-wallet');



export const sendTransfer = async ({phoneCode, phone, amountToPay, senderAddress}) => {

    // 1. generate transit keystore, with private key encrypted with random code 
    const { address: transitAddress,
	    keystore: transitKeystore, secretCode } = generateKeystoreWithSecret(); // verification keystore

    // 2. register transfer to Verification Server 
    const transferId = generateTransferId(phoneCode, phone, secretCode);

    // salt hash in order to prevent bruteforce attack in the case if server's database is stolen
    const salt = sha3(secretCode, phone);
    const phoneHash = sha3(phone, transferId, salt);
    
    
    const result = await verificationServer.registerTransfer({
	transferId,
	phoneHash,
	transitAddress,
	transitKeystore,
	senderAddress,
	amount: amountToPay
    });

    // if server error interrupt execution and don't send deposit to smart-contract
    if (!result || !result.success) {
	const errorMsg = result.errorMsg || "Server error!";
	throw new Error(errorMsg);
    }
    
    // 3. send deposit to smart contract
    const txHash = await escrowContract.deposit(transitAddress, amountToPay);
    return { txHash, secretCode, transferId, transitAddress };
}

const _generateTransferIdForLink = (address) => {
    return `link-${address}`;
}

export const sendLinkTransfer = async ({amountToPay, senderAddress}) => {

    const wallet = Wallet.generate();
    const transitAddress = wallet.getChecksumAddressString();
    const transitPrivateKey = wallet.getPrivateKeyString().substring(2);
    const transferId = _generateTransferIdForLink(transitAddress);
    
    // 3. send deposit to smart contract
    const txHash = await escrowContract.deposit(transitAddress, amountToPay);
    return { txHash, transitPrivateKey, transferId, transitAddress };
}


export const cancelTransfer = ((transitAddress, contractVersion) => escrowContract.cancel(transitAddress, contractVersion));
export const getAmountWithCommission = ((amount) => escrowContract.getAmountWithCommission(amount));
export const getWithdrawalEvents = ((address, fromBlock) => escrowContract.getWithdrawalEvents(address, fromBlock));


// ask for confirmation code
export const sendSmsToPhone = async ({phoneCode, phone, secretCode}) => {
    const transferId = generateTransferId(phoneCode, phone, secretCode);
    // salt hash in order to prevent bruteforce attack in the case if server's database is stolen
    const salt = sha3(secretCode, phone);
    
    const result = await verificationServer.claimPhone({transferId, phone, dialCode: phoneCode, salt});
    if (!result.success) {
	throw new Error(result.errorMessage);
    }
    return result;    
}

const _getAddressFromPrivateKey = (privateKey) => {
   return '0x' + Wallet.fromPrivateKey(
       new Buffer(privateKey, 'hex')).getAddress().toString('hex');
}


export const fetchTransferDetailsFromServer = ({phoneCode, phone, secretCode=null, transitPrivateKey=null}) => {
    
    let transferId;

    // if transfer is with authentication
    if (secretCode) { 
	transferId = generateTransferId(phoneCode, phone, secretCode);
    } else {
	// if transfer via special link
	const transitAddress = _getAddressFromPrivateKey(transitPrivateKey);
	transferId = _generateTransferIdForLink(transitAddress);    	
    }
    
    return verificationServer.fetchTransfer(transferId);
}


export const withdrawLinkTransfer = async ({transitPrivateKey, receiverAddress}) => {
    const transitAddress = _getAddressFromPrivateKey(transitPrivateKey);
    const transferId = _generateTransferIdForLink(transitAddress);
    
    const { v, r, s } = getSignatureForLinkTransfer({
        address: receiverAddress,
        transitPrivateKey
    });
    const result = await verificationServer.confirmLinkTx(
        transitAddress,
        receiverAddress,
        v, r, s);
    
    
    if (!result.success) {
        throw new Error((result.errorMessage || "Server error on withdrawal!"));
    }
    
    
    return { txHash: result.txHash, amount: result.amount, transferId };
}


// verify code from SMS and withdraw transfer
export const verifyPhoneAndWithdraw = async ({phoneCode, phone, secretCode, smsCode, receiverAddress}) => {
    const transferId = generateTransferId(phoneCode, phone, secretCode);
    
    // 1. verify phone by sending confirmation code from sms
    // and get verification keystore 
    const verResult = await verificationServer.verifyPhone({transferId, phone, dialCode: phoneCode, smsCode});
    
    if (!verResult.success) {
	throw new Error((verResult.errorMessage || "Server error on verification!"));
    }
	    
    // 2. sign address chosen by receiver with verification private key
    const { v, r, s } = getSignatureForReceiveAddress({
	address: receiverAddress,
	ksData: verResult.transitKeystore,
	password: secretCode
    });

    // 3. send signed address to server
    const result = await verificationServer.confirmTx(
	transferId,
	receiverAddress,
	v, r, s);


    if (!result.success) {
	throw new Error((result.errorMessage || "Server error on withdrawal!"));
    }

    
    return { txHash: result.txHash, amount: result.amount, transferId };
}
    
