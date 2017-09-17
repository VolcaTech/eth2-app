import React, { Component } from 'react';
import SendTab from './SendTab/SendTab';

import ReceiveTab from './ReceiveTab/ReceiveTab';
import { getQueryParams } from '../utils/helpers';

export default class Tab extends Component {

    constructor(props) {
        super(props);

	// for mobile's change tabs style
	let tabClass = "";
	let DEFAULT_TAB = "receiveTab";
	if (window.innerWidth > 600) {
	    tabClass = "tabs-left";
	    DEFAULT_TAB =  "sendTab";
	}
	console.log({tabClass});
	
        const queryParams = getQueryParams();
        this.state = {
            activeTab: (queryParams.tab || DEFAULT_TAB),
            code: (queryParams.code || ""),
            phone: (queryParams.phone || ""),
	    tabClass
        };


    }

    changeTab(tabName) {
        this.setState({ activeTab: tabName });
    }

    render() {
        return (
            <div>
                <div className="tabs-container">
                  <div className={this.state.tabClass}>
                        <ul className="nav nav-tabs">
                            <li className={("sendTab" === this.state.activeTab) ? "active" : ""}><a href="#" onClick={() => this.changeTab("sendTab")}>Send</a></li>
                            <li className={("receiveTab" === this.state.activeTab) ? "active" : ""}><a href="#" onClick={() => this.changeTab("receiveTab")}>Receive</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="tab-6" className="tab-pane active">
                                <div className="panel-body">
                                    {("sendTab" === this.state.activeTab) ? <SendTab /> : <ReceiveTab code={this.state.code} phone={this.state.phone} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
