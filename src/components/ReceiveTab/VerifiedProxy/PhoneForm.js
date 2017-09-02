import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
//import web3Api from "../../../utils/web3-common-api";
//import ksHelper from'../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            code: "",
	    error: ""
        };
    }

    
    submit() {
        const component = this;
        console.log(this.state);
        serverApi.claimPhone(this.state.phone, this.state.code).then(function(result) {
            console.log({result});
	    if (!result.success) {
		throw new Error((result.errorMessage || "Server error"));
	    }
	    component.props.onSuccess(component.state.phone, component.state.code);
        }).catch(function(err) {
	    console.log({err});
	    component.setState({
		error: err.message
	    });
	});
    }

    
    render() {
        const component = this;
        return (
            <form>
                    <div>
                        <label>
                            Your phone number
                </label>
                    </div>
                    <div>
                    <input className="form-control" type="text" onChange={(event)=>this.setState({phone:event.target.value})} />
                    </div>
                    <br />
                    <div>
                        <label>
                            Verification code
                </label>
                    </div>
                    <div>
                        <input className="form-control" type="text"  onChange={(event)=>this.setState({code:event.target.value})} />
                    </div>
                    <br />
                <div>
                <a className="btn btn-md btn-accent" onClick={()=>component.submit()}>Send</a>
		
		<span style={ {color: "red"}} > {component.state.error }</span>

                </div>

            </form>
        );
    }
}
