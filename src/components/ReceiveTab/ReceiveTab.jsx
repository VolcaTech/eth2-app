import React, { Component } from 'react';
import ReceiveVerifiedProxyTab from './VerifiedProxy/ReceiveVerifiedProxyTab';

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "receivePhone",
            code: this.props.code,
            phone: this.props.phone
        };
    }

    changeTab(tabName) {
        this.setState({ activeTab: tabName });
    }

    render() {
        return (
            <div>
              {("receivePhone" === this.state.activeTab) ? <ReceiveVerifiedProxyTab code={this.state.code} phone={this.state.phone} /> : ""}
            </div>
        );
    }
}
