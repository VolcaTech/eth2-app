import Promise from "bluebird";
import escrowContract from "./escrowContract";
import * as verificationServer from "./verificationServer";
import {
    generateKeystoreWithSecret,
    generateTransferId, getSignatureForReceiveAddress } from './utils';
import { sha3 } from 'web3-utils';


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
    console.log({result, amountToPay, transitAddress, contract: escrowContract.getContractAddress()});
    const txHash = await escrowContract.deposit(transitAddress, amountToPay);
    return { txHash, secretCode, transferId, transitAddress };
}


export const cancelTransfer = ((transitAddress) => escrowContract.cancel(transitAddress));
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
	ksData: verResult.transfer.transitKeystore,
	password: secretCode
    });

    // 3. send signed address to server
    const result = await verificationServer.confirmTx(
	transferId,
	receiverAddress,
	v, r, s);

    console.log({result});
    if (!result.success) {
	throw new Error((result.errorMessage || "Server error on withdrawal!"));
    }

    
    return { txHash: result.txHash, amount: result.amount, transfer: verResult.transfer };
}
    
