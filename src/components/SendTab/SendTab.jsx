import React, { Component } from 'react';
import VerifiedProxyTab from './VerifiedProxy/VerifiedProxyTab';
import web3Service from "../../services/web3Service";

function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}

export default class Tab extends Component {
    render() {
        return (
            <div>
                {web3Service.getNetworkId() === "3" ? <VerifiedProxyTab /> : <WrongNetworkMessage />}
            </div>
        );
    }
}
