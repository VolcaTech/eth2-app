import React, { Component } from 'react'
import History from "./SendToPhoneHistory"
import SendPhoneInput from "./SendPhoneInput"
import web3Api from "../web3-api"

export default class SendToPhone extends Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            confirmPressed: false,
            isConnected: web3Api.isConnected(),
            address: web3Api.getAddress(),
            balance: 0
        };
        const component = this
    }

    componentDidMount() {
        const component = this
        web3Api.getBalance().then(function (balance) {
            component.setState({ balance: balance })
        })
    }

    render() {

        return (
            <div>
                <strong className="c-white">Your wallet {this.state.isConnected ? "is connected" : "not connected"}: </strong>
                <span className="c-accent">{this.state.address}</span>
                <br />
                <strong className="c-white">Balance: </strong><span className="c-accent">{this.state.balance} ETH</span>
                <br />
                <br />

                <br />
                <SendPhoneInput/>
                <History />
            </div>
        );
    }
}