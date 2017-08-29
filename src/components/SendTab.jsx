import React, { Component } from 'react'
import SendToAddress from './SendToAddress'
import SendToPhone from './SendToPhone'

export default class Tab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "sendToPhone"
        }
    }

    changeTab(tabName){
        this.setState({activeTab: tabName})
    }

    render() {
        return (
            <div className="tabs-container">
                <div className="tabs-left">
                    <ul className="nav nav-tabs">
                        <li className={("sendToPhone" === this.state.activeTab) ? "active" : ""}><a data-toggle="tab" href="#tab-6" onClick={() => this.changeTab("sendToPhone")}>Phone</a></li>
                        <li className={("sendToAddress" === this.state.activeTab) ? "active" : ""}><a data-toggle="tab" href="#tab-6" onClick={() => this.changeTab("sendToAddress")}>Address</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="tab-6" className="tab-pane active">
                            <div className="panel-body">
                                {("sendToPhone" === this.state.activeTab) ? <SendToPhone /> : <SendToAddress />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}