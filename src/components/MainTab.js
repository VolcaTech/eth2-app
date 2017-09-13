import React, { Component } from 'react';
import SendTab from './SendTab/SendTab';
import ReceiveTab from  './ReceiveTab/ReceiveTab';

export default class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.parseLink().activeTab,
            url: this.parseLink().url,
            code: this.parseLink().code,
            phone: this.parseLink().phone
        };
        //this.getLink();
        console.log("STATE: ", this.state.url, this.state.code, this.state.phone)
    }

    parseLink() {
        //console.log(window.location.href)
        let parameters = {}

        if (location.hash.includes("receive") === true) {
            const component = this;
            const url = window.location.href.slice(window.location.href.indexOf('#') + 1).split('?');
            const params = url[1].split('&');
            const code = params[0].split('=');
            const phone = params[1].split('=');
            parameters = { activeTab: "receiveTab", url: url[0], code: code[1], phone: phone[1] };
        }
        else{
            parameters = { activeTab: "sendTab", url: "", code: "", phone: ""};
        }

        return parameters;
    }

    

    // getLinkProps(){
    //     const component = this.state;
    //     this.getLink()
    //     .then(function(url, code, phone){
    //         console.log("PARAMS: ", url,code,phone)
    //         component.setState({
    //             url: url[0],
    //             code: code[1],
    //             phone: phone [1]
    //         })
    //     })
    // }

    changeTab(tabName){
        this.setState({activeTab: tabName});
    }

    render() {
        //{(this.state.url === "/receive") ? this.changeTab("receiveTab") : ""}
        //console.log("LOCATION HASH: ",location.hash)
        return (
            <div className="tabs-container">
                <ul className="nav nav-tabs">
                    <li className={("sendTab" === this.state.activeTab) ? "active" : ""}><a href="#" onClick={()=>this.changeTab("sendTab")}>Send</a></li>
                    <li className={("receiveTab" === this.state.activeTab) ? "active" : ""}><a href="#" onClick={()=>this.changeTab("receiveTab")}>Receive</a></li>
                </ul>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane active">
                        <div className="panel-body">
                            
                          {("sendTab" === this.state.activeTab) ? <SendTab/> : <ReceiveTab code={this.state.code} phone={this.state.phone}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
