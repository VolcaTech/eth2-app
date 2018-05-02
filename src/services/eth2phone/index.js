import Promise from "bluebird";
import escrowContract from "./escrowContract";
import * as verificationServer from "./verificationServer";
import {
    generateKeystoreWithSecret,
    generateTransferId, getSignatureForReceiveAddress } from './utils';


export const sendTransfer = async ({phoneCode, phone, amountToPay}) => {

    // 1. generate transit keystore, with private key encrypted with random code 
    const { address: transitAddress,
	    keystore: transitKeystore, secretCode } = generateKeystoreWithSecret(); // verification keystore

    // 2. register transfer to Verification Server 
    const transferId = generateTransferId(phoneCode, phone, secretCode);
    const result = await verificationServer.registerTransfer({
	transferId,
	phone,
	phoneCode,
	transitAddress,
	transitKeystore
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


// export const getSentTransfers = () => {
//     return verifiedProxyContractApi.getSentTransfers();
// }


// ask for confirmation code
export const sendSmsToPhone = async ({phoneCode, phone, secretCode}) => {
    const transferId = generateTransferId(phoneCode, phone, secretCode);
    const result = await verificationServer.claimPhone(transferId, phone);
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
    const result = await verificationServer.verifyPhone(transferId, phone, smsCode);
    
    if (!result || !result.success) {
	throw new Error((result.errorMessage || "Server error!"));
    }
	    
    // 2. sign address chosen by receiver with verification private key
    const { v, r, s } = getSignatureForReceiveAddress({
	address: receiverAddress,
	ksData: result.transfer.transitKeystore,
	password: secretCode
    });

    // 3. send signed address to server
    return verificationServer.confirmTx(
	transferId,
	phone,
	receiverAddress,
	v, r, s);
}
    
