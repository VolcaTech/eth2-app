import sha3 from 'solidity-sha3';
const Web3Utils = require('web3-utils');
const SIGNATURE_PREFIX = "\x19Ethereum Signed Message:\n32";
import ksHelper from '../../utils/keystoreHelper';


function generateRandomString(length)
{
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var i;
    var result = "";
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    if(window.crypto && window.crypto.getRandomValues)  {
	const values = new Uint32Array(length);
	window.crypto.getRandomValues(values);
	for(i=0; i<length; i++)	{
	    result += charset[values[i] % charset.length];
	}
	return result;
    }
    else if(isOpera)//Opera's Math.random is secure, see http://lists.w3.org/Archives/Public/public-webcrypto/2013Jan/0063.html
    {
	for(i=0; i<length; i++)
	{
	    result += charset[Math.floor(Math.random()*charset.length)];
	}
	return result;
    }
    else throw new Error("Your browser can't generate secure random numbers");
}


// transfer id is generated for server
// to fetch confirmation code from server via sms 
export const generateTransferId = (phoneCode, phone, secretCode) => {
    return sha3(phoneCode + phone + secretCode);
}

const generateSecretCode = (n) => {
    const secretCode = generateRandomString(20);
    return secretCode;
}

export const generateKeystoreWithSecret = () => {
    // generating secret code
    const secretCode = generateSecretCode(12);
    
    const { address, keystoreData: keystore } = ksHelper.create(secretCode);
    return { address, keystore, secretCode };
}


export const getSignatureForReceiveAddress = ({address, ksData, password}) => {
    const verificationHash = Web3Utils.soliditySha3(SIGNATURE_PREFIX, { type: 'address', value: address });		
    const signature = ksHelper.signTx(ksData, password, verificationHash);
    const v = signature.v;
    const r = '0x' + signature.r.toString("hex");
    const s = '0x' + signature.s.toString("hex");
    return { v, r, s };
}

export const getSignatureForLinkTransfer = ({address, transitPrivateKey}) => {
    console.log(transitPrivateKey)    
    const verificationHash = Web3Utils.soliditySha3(SIGNATURE_PREFIX, { type: 'address', value: address });		
    const signature = ksHelper.signWithPK(transitPrivateKey, verificationHash.toString("hex"));
    const v = signature.v;
    const r = '0x' + signature.r.toString("hex");
    const s = '0x' + signature.s.toString("hex");
    return { v, r, s };
}
