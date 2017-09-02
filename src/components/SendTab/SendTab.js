import React, { Component } from 'react';
//import SendToAddress from './SendToAddress';
//import SendToPhone from './SendToPhone';
import VerifiedProxyTab from './VerifiedProxy/VerifiedProxyTab';
import DirectProxyTab from './VerifiedProxy/VerifiedProxyTab';

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "verifiedProxy"
        };
    }

    changeTab(tabName){
        this.setState({activeTab: tabName});
    }


    
    render() {
     //<li className={("DirectProxy" === this.state.activeTab) ? "active" : ""}><a data-toggle="tab" href="#tab-6" onClick={() => this.changeTab("DirectProxy")}>Address</a></li>	
        return (
            <div className="tabs-container">
                <div className="tabs-left">
                    <ul className="nav nav-tabs">
                        <li className={("verifiedProxy" === this.state.activeTab) ? "active" : ""}><a data-toggle="tab" href="#tab-6" onClick={() => this.changeTab("verifiedProxy")}>Verified Proxy</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="tab-6" className="tab-pane active">
                            <div className="panel-body">
                                 {("verifiedProxy" === this.state.activeTab) ? <VerifiedProxyTab /> : <DirectProxyTab /> }
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}
