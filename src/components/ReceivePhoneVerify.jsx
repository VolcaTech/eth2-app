import React, { Component } from 'react'
import ReceiveToWallet from "./ReceiveToWallet"
import ReceiveToOther from "./ReceiveToOther"


export default class ReceivePhoneVerify extends Component {



    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            choice: "wallet"
        };
    }

    radioHandler(changeEvent) {
        const component = this
        component.setState({
            choice: changeEvent.target.value})
    }

    render() {
        const component = this
        return (
          
           <div>
            
        <div className="radio radio-warning">
          
            <input type="radio" value="wallet" checked={component.state.choice === 'wallet'} 
                      onChange={(event)=>{this.radioHandler(event)}}/><label>
            Wallet
          </label>
        </div>

      
        <div>
            <a className="btn btn-md btn-accent" onClick={()=>component.submit()}>Send</a>
        </div>
               
        )
    }
}