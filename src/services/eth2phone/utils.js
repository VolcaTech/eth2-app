import sha3 from 'solidity-sha3';
const Web3Utils = require('web3-utils');
const SIGNATURE_PREFIX = "\x19Ethereum Signed Message:\n32";
import ksHelper from '../../utils/keystoreHelper';


export const generateTransferId = (phoneCode, phone, secretCode) => {
    return sha3(phoneCode + phone + secretCode);
}

export const generateKeystoreWithSecret = () => {
    // generating secret code
    const secretCode = Math.random().toString(32).slice(5).toUpperCase();
    
    const { address, keystoreData } = ksHelper.create(secretCode);
    return { verAddress: address, verKeystore: keystoreData, secretCode };
}


export const getSignatureForReceiveAddress = ({address, ksData, password}) => {
    const verificationHash = Web3Utils.soliditySha3(SIGNATURE_PREFIX, { type: 'address', value: address });		
    const signature = ksHelper.signTx(ksData, password, verificationHash);
    const v = signature.v;
    const r = '0x' + signature.r.toString("hex");
    const s = '0x' + signature.s.toString("hex");
    return { v, r, s };
}
