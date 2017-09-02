import React, { Component } from 'react'
import History from "./SendToAddressHistory"
import web3Api from "../web3-api"

export default class SendToAddress extends Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            sendaddress: '',
            amount: '',
            isConnected: web3Api.isConnected(),
            address: web3Api.getAddress(),
            balance: 0
        };
    }

    componentDidMount() {
        console.log("component DID mount")
        const component = this
        web3Api.getBalance().then(function (balance) {
            component.setState({ balance: balance })
        })
    }
    componentWillMount() {
        console.log("component WILL mount")
    }

    componentWillUpdate() {
        console.log("componet will update")
    }
    componentDidUpdate() {
        console.log("componet did update")
    }
    // handleChangeAddress(event) {
    //     this.setState({ sendaddress: event.target.value });
    // }

    // handleChangeAmount(event) {
    //     this.setState({ amount: event.target.value });
    // }

    handleSubmit(event) {
        alert('You have sent' + this.state.sendaddress + this.state.amount + ' ETH');
        event.preventDefault();
    }

    render() {
        return(
            <div>
            <strong className="c-white">Your wallet {this.state.isConnected ? "is connected" : "not connected"}: </strong><span className="c-accent">{this.state.address}</span>
            <br />
            <strong className="c-white">Balance: </strong><span className="c-accent">{this.state.balance} ETH</span>
            <br />
            <br />
            <form>
                <div>
                    <label>
                        Receiver address
                    </label>
                </div>
                <div>
                    <input type="text" value={this.state.sendaddress} onChange={(event)=>this.setState({sendaddress:event.target.value})} />
                </div>
                <br />
                <div>
                    <label>
                        Amount
                    </label>
                </div>
                <div>
                    <input type="text" value={this.state.amount} onChange={(event)=>this.setState({amount:event.target.value})} />
                </div>
                <br />
                <div>
                    <a className="btn btn-md btn-accent"onClick={this.handleSubmit}>Send</a>
                </div>
            </form>
            <br />
            <History />
        </div>
        )
    }
}