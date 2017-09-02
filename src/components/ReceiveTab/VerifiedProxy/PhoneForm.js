import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            code: "",
	    error: "",
	    isFetching: false
        };
    }

    
    submit() {
        const component = this;
        console.log(this.state);
	this.setState({isFetching: true});
        serverApi.claimPhone(this.state.phone, this.state.code).then(function(result) {
            console.log({result});
	    if (!result.success) {
		throw new Error((result.errorMessage || "Server error"));
	    }
	    component.setState({isFetching: false});	    
	    component.props.onSuccess(component.state.phone, component.state.code);
        }).catch(function(err) {
	    console.log({err});
	    component.setState({
		error: err.message,
		isFetching: false
	    });
	});
    }

    goBack() {
	this.props.goBack();
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
                {this.state.isFetching ? <div className="loader-spin"></div> : ""}
		
                <a className="btn btn-md btn-default" onClick={()=>component.goBack()}> Go Back </a>		
                <a className="btn btn-md btn-accent" onClick={()=>component.submit()}> Submit </a>
		
		<span style={ {color: "red"}} > {component.state.error }</span>

                </div>
		</form>
        );
    }
}
