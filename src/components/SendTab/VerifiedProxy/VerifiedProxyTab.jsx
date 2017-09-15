import React, { Component } from 'react';

import Form from "./Form";
import web3Api from "../../../apis/web3-common-api";


export default class VerifiedProxyTab extends Component {
    
    render() {
	if (!web3Api.isConnected()) {
	    return (
		    <div>
                      In order to send, web3 should be connected		    
		    </div>
	    );
	}	
	
        return (
            <div>
                <Form/>
            </div>
        );
    }
}

