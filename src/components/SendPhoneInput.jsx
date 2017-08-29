import React, { Component } from 'react'
import VerificationCode from "./VerificationCode"
import ksHelper from'../keystoreHelper';
import web3Api from "../web3-api"
import serverApi from "../quid-server-api"
import sha3 from 'solidity-sha3';

export default class ReceiveToOther extends Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            phone: '',
            amount: '',
            code: '',
            confirmPressed: false
        };
    }

    randomGenerator() {
        const random = Math.random().toString(32).slice(5).toUpperCase();
        return random
    }

    generateWallet(secretCode) {
        const {address, keystoreData } = ksHelper.create(secretCode);
        return {address, ksData: keystoreData}
    }

     handleSubmit(event) {
        const component = this;
        if (this.state.phone.length > 0 && this.state.amount.length > 0) {
        const secretCode = this.randomGenerator()
        const {address, ksData} = this.generateWallet(secretCode)

        web3Api.sendVerificationProxyTransfer(address, this.state.amount, this.state.phone, secretCode).then(function(_from) {
            const txHash = sha3(component.state.phone, secretCode);
            console.log("txHAssh", txHash)
                return serverApi.sendToPhone(component.state.phone, component.state.amount, ksData, address, txHash, _from )
            })
            .then((result) => { 
                console.log("result in react: ", result)
                component.setState({
                    confirmPressed : true, 
                    code: secretCode
                })
            })
        }
    }

    render() {
        const form = (
            <div>

         <div class="row"> 
            <div class="col-sm-12">
            <div>
                <label>
                    Phone number
                </label>
            </div>
            <div>
                <input type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
            </div>
            <br />
            <div>
                <label>
                    Amount
                </label>
            </div>
            <div>
                <input type="text" value={this.state.amount} onChange={(event) => this.setState({ amount: event.target.value })} />
            </div>
            <br />
             <div>

                     <div>
                    <a className="btn btn-md btn-accent" onClick={() => this.handleSubmit()}>Send</a>
                 </div>

            </div>
            </div>
            </div>
            </div>)

        return ( 
           
            <div>
                
                 {this.state.confirmPressed === true ?  <VerificationCode code={this.state.code}/> : form}
                {this.state.confirmPressed === true ?     <a className="btn btn-md btn-accent" onClick={() => this.setState({confirmPressed:false})}>Back</a> : ""}

            </div>
        )
    }
 }