import React, { Component } from 'react'

export default class ReceiveToWallet extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
                code: ""
            };
        }
    
    render(){
        return(
            <div style={{marginBottom: "50px"}}>
                Verification code: 
                <span style={{color: "white", fontWeight: "bold"}}> {this.props.code} </span>
            </div>
        )
    }
    
    
    }