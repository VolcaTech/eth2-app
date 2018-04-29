import Promise from "bluebird";
import verifiedProxyContractApi from "./contract";
import web3Service from "../web3Service";
import * as server from "./server";
import { generateKeystoreWithSecret, generateTransferId, getSignatureForReceiveAddress } from './utils';



export const sendTransfer = async (phoneCode, phone, amountToPay) => {

    // 1. generate transit verification key pair, with private key encrypted with secret code 
    const { verAddress, verKeystore, secretCode } = generateKeystoreWithSecret(); // verification keystore

    // 2. send transfer to serve
    const transferId = generateTransferId(phoneCode, phone, secretCode);
    const result = await server.sendTransferKeystore(
	transferId,
	phone,
	phoneCode,
	verKeystore
    );

    // if server error interrupt execution and don't send deposit to smart-contract
    if (!result || !result.success) {
	const errorMsg = result.errorMsg || "Server error!";
	throw new Error(errorMsg);
    }
    
    // 3. send deposit to smart contract
    const txHash = await verifiedProxyContractApi.deposit(verAddress, amountToPay);
    return { txHash, secretCode };
}


export const cancelTransfer = ((verAddress) => verifiedProxyContractApi.cancel(verAddress));
export const getAmountWithCommission = ((amount) => verifiedProxyContractApi.getAmountWithCommission(amount));


// export const getSentTransfers = () => {
//     return verifiedProxyContractApi.getSentTransfers();
// }


// ask for confirmation code
export const sendSmsToPhone = (phoneCode, phone, code) => {
    const transferId = generateTransferId(phoneCode, phone, code);
    return server.claimPhone(transferId, phone); 
}

// verify code from SMS and withdraw transfer
export const verifyPhoneAndWithdraw = async (phoneCode, phone, secretCode, smsCode, addressTo) => {
    const transferId = generateTransferId(phoneCode, phone, secretCode);

    // 1. verify phone by sending confirmation code from sms
    // and get verification keystore 
    const result = await server.verifyPhone(transferId, phone, smsCode);
    
    if (!result || !result.success) {
	throw new Error((result.errorMessage || "Server error!"));
    }
	    
    // 2. sign address chosen by receiver with verification private key
    const { v, r, s } = getSignatureForReceiveAddress({
	address: addressTo,
	ksData: result.transfer.verificationKeystoreData,
	password: secretCode
    });

    // 3. send signed address to server
    return server.confirmTx(
	transferId,
	phone,
	smsCode,
	addressTo,
	v, r, s);
}
    
