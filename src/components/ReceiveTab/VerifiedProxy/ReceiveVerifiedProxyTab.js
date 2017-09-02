import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";
import ksHelper from'../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");
import PhoneForm from './PhoneForm';

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsPressed: false,
            phone: "",
            code: "",
            smsCode: "",
            to: ""
        };
    }

    componentDidMount() {
	const address = web3Api.getAddress();	
        this.setState({to: address });
    }

    onPhoneSuccess(phone, code) {
	console.log("onPhoneSuccess");
        const component = this;
        component.setState({
	    buttonIsPressed:true,
	    code,
	    phone
        });
    }

    submitSms() {
        const component = this;
        console.log(this.state);
        serverApi.verifyPhone(this.state.phone, this.state.code, this.state.smsCode).then(function(result) {
            console.log({result});
            component.setState({buttonIsPressed:true});
            return result;
        }).then(function(result) {
            console.log(result);
            const msg = sha3(component.state.to);
	    
            const signature = ksHelper.signTx(result.transfer.verificationKeystoreData, component.state.code, msg);
	    console.log("signature: ", signature);

	    const v = signature.v;
	    const r =  '0x' + signature.r.toString("hex");
	    const s =  '0x' + signature.s.toString("hex");	    	    
	    // const sigParams = `"${component.state.to}",${v},"${r}","${s}"`;
	    // console.log({sigParams});
	    
	    // TESTING SIG
	    // const pub = util.ecrecover(util.toBuffer(msg), signature.v, signature.r, signature.s);
	    // const adr = '0x' + util.pubToAddress(pub).toString('hex');
	    // console.log({adr});
	    // /TESTING SIG
	    
            return serverApi.confirmTx(
		component.state.phone, 
                component.state.code,  
                component.state.smsCode, 
                component.state.to, v, r, s);
        }).then(function(result) {
            console.log({result});
            alert("Success!");
        });
    }



    render() {
        const component = this;
        const smsVerifyForm = (
           <div>
            
        <div className="radio radio-warning">
          
            <input type="radio" value="wallet" checked={true} /><label>
            Wallet: { component.state.to }
            <div>
                <input type="text"  onChange={(event)=>this.setState({smsCode:event.target.value})} />
            </div>
          </label>
        </div>

        <div>
            <a className="btn btn-md btn-accent" onClick={()=>component.submitSms()}>Send</a>
        </div>
        </div>
        );

        return (
            <div>
                <div>{this.state.buttonIsPressed ? smsVerifyForm : <PhoneForm onSuccess={(phone, code) => component.onPhoneSuccess(phone, code)}/>}</div>
            </div>
        );
    }
}
