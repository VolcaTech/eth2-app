import React, { Component } from 'react'
import web3Api from "../web3-api"

export default class ReceiveToWallet extends Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            code: "",
            isConnected: web3Api.isConnected(),
            address: web3Api.getAddress()
        };
    }

    componentDidMount() {
        console.log("component DID mount")
        const component = this
        web3Api.getBalance().then(function (balance) {
            component.setState({ balance: balance })
        })
    }

    render() {
        return (
            <form>
                <div>
                    <label>
                        SMS code
                </label>
                </div>
                <div>
                    <input type="text" value={this.state.amount} onChange={(value)=>this.setState({code:value})} />
                </div>
                <br />
            </form>
        )
    }
}