import React, { Component } from 'react';
import ReceiveVerifiedProxyTab from './VerifiedProxy/ReceiveVerifiedProxyTab';

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "receivePhone"
        };
    }

    changeTab(tabName){
        this.setState({activeTab: tabName});
    }

    render() {
        return (
            <div className="tabs-container">
                <div className="tabs-left">
                    <ul className="nav nav-tabs">
                        <li className={("receivePhone" === this.state.activeTab) ? "active" : ""}><a data-toggle="tab" href="#tab-6" onClick={() => this.changeTab("receivePhone")}>Verified Proxy</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="tab-6" className="tab-pane active">
                            <div className="panel-body">
                                {("receivePhone" === this.state.activeTab) ? <ReceiveVerifiedProxyTab /> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
