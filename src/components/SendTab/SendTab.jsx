import React, { Component } from 'react';
import VerifiedProxyTab from './VerifiedProxy/VerifiedProxyTab';
import web3Service from "../../services/web3Service";
import Header from './../common/Header.jsx';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';


function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}

export default class Tab extends Component {
    render() {
        return (
            <div style={{ alignContent: 'center' }}>
                <Header />
                <NumberInput />
                <div style={{
                    margin: 'auto',
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <PhoneInput />
                </div>
                <ButtonPrimary buttonColor={e2pColors.green}>
                    Send
                </ButtonPrimary>
            </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}
