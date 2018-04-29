import React, { Component } from 'react';

import Form from "./Form";
import web3Service from "../../../services/web3Service";


export default class VerifiedProxyTab extends Component {
    
    render() {
	if (!web3Service.isConnected()) {
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

