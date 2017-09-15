import Promise from "bluebird";
import sha3 from 'solidity-sha3';

import ksHelper from '../utils/keystoreHelper';
import verifiedProxyContractApi from "./verified-proxy-contract-api";
import web3Api from "./web3-common-api";
import serverApi from "./eth2phone-server-api";

const Web3Utils = require('web3-utils');
const SIGNATURE_PREFIX = "\x19Ethereum Signed Message:\n32";



function generateWeb3Api() {

    function addCommission(amount) {
	const verifierCommission = verifiedProxyContractApi.getCommission();
	const amountWithCommissionWei = web3Api.toBigNumber(web3Api.toWei(amount, "ether")).plus(verifierCommission);
	const amountWithCommission = web3Api.fromWei(amountWithCommissionWei, 'ether');
	return amountWithCommission;
    }

    function generateTransferId(phoneCode, phone, secretCode) {
	return sha3(phoneCode + phone + secretCode);
    }
    
    function sendTransfer(phoneCode, phone, amountToPay) {

	function _generateKeystoreWithSecret() {
	    // generating secret code
	    const secretCode = Math.random().toString(32).slice(5).toUpperCase();
	    
	    const { address, keystoreData } = ksHelper.create(secretCode);
	    return { address, ksData: keystoreData, secretCode };
	}

	const verKS = _generateKeystoreWithSecret(); // verification keystore 
	const transferId = generateTransferId(phoneCode, phone, verKS.secretCode);

	return serverApi.sendTransferKeystore(transferId, phone, phoneCode, verKS.ksData)
	    .then(function (result) {
		let errorMsg = "";
		if (!result || !result.success) {
		    errorMsg = result.errorMsg || "Server error!";
		    throw new Error(errorMsg);
		}
		return verifiedProxyContractApi.deposit(verKS.address, amountToPay, transferId);
	    }).then((txHash) => {
		return {txHash, secretCode: verKS.secretCode};
	    });
    }

    function cancelTransfer(transferId) {
	return verifiedProxyContractApi.cancel(transferId);
    }
    
    function getSentTransfers() {
	return verifiedProxyContractApi.getSentTransfers();
    }


    // ask for sms code
    function sendSmsToPhone(phoneCode, phone, code) {
	const transferId = generateTransferId(phoneCode, phone, code);
	return serverApi.claimPhone(transferId, phone); 
    }

    // verify code from SMS
    function verifyPhoneAndWithdraw(phoneCode, phone, code, smsCode, addressTo) {
	const transferId = generateTransferId(phoneCode, phone, code);	
	return serverApi.verifyPhone(transferId, phone, smsCode)
	    .then(function (result) {
		if (!result || !result.success) {
		    throw new Error((result.errorMessage || "Server error!"));
		}
		
		const verificationHash = Web3Utils.soliditySha3(SIGNATURE_PREFIX, { type: 'address', value: addressTo });		
		const signature = ksHelper.signTx(result.transfer.verificationKeystoreData, code, verificationHash);
		const v = signature.v;
		const r = '0x' + signature.r.toString("hex");
		const s = '0x' + signature.s.toString("hex");
		
		return serverApi.confirmTx(
		    transferId,
		    phone,
		    smsCode,
		    addressTo,
		    v, r, s);
	    });
    }
    
    // api
    return {
	// sender apis
	addCommission,
	sendTransfer,
	cancelTransfer,
	getSentTransfers,

	// receiver apis
	sendSmsToPhone, // 1 verification step
	verifyPhoneAndWithdraw // confirm sms and withdraw transfer
    };
}


export default generateWeb3Api();
