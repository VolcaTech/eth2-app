import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';


function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        };
    }

    render() {
        return (<div>
            <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>
                <div style={{ marginBottom: 17 }}><NumberInput disabled={false} fontColor='black' backgroundColor='#fff' /></div>
                <div><NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder="123" /></div>
                <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
                    {this.state.errorMessage}
                </div>
                <PhoneInput />
                <div style={{ marginTop: 28 }}>
                    <Link style={{ textDecoration: 'none', width: 205, height: 38 }} to="/transaction">
                        <ButtonPrimary buttonColor={e2pColors.green}>
                            Add a book
                </ButtonPrimary>
                    </Link>
                </div>
            </div>
        </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}