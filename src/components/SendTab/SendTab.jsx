import React, { Component } from 'react';
import VerifiedProxyTab from './VerifiedProxy/VerifiedProxyTab';
import web3Api from "../../apis/web3-common-api";

function WrongNetworkMessage() {

    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    )
}

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "verifiedProxy"
        };
    }

    changeTab(tabName) {
        this.setState({ activeTab: tabName });
    }


    render() {
        return (
            <div>
                {web3Api.getNetworkId() === "3" ? <VerifiedProxyTab /> : <WrongNetworkMessage />}
            </div>
        )
    }
}
