import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


class e2pAddressButton extends React.Component {
    isPrefixed(str = '') {
        return str.slice(0, 2) === '0x';
    }

    dePrefix(str = '') {
        if (this.isPrefixed(str)) {
            return str.slice(2);
        }
        return str;
    }

    shortAddress(address, num, showEnd = true) {
        const sanitized = this.dePrefix(address);
        const shorten = `${sanitized.slice(0, 3)}...${showEnd ? sanitized.slice(-num) : ''}`;
        return '0x'.concat(shorten);
    }

    render() {
        console.log(this.props.networkName)
        return (
            <div className="address-btn">

                <Button style={{
                    borderColor: this.props.color,
                    backgroundColor: (this.props.active ? this.props.color : "#fff"),
                    color: (this.props.active ? "#fff" : this.props.color),
                    fontFamily: "SF Display Regular"
                }} onClick={this.props.handleClick}>
                    <RetinaImage src={this.props.networkName === 'Ropsten' ? "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/wallet_icon_orange.png" : "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/wallet_icon_green.png"} style={{width: 12.5, height: 11, verticalAlign: 'initial', marginRight: 5}} />
                    <span>{this.shortAddress(this.props.address, 3)}</span>
                    <i className={this.props.active ? 'fa fa-caret-up' : 'fa fa-caret-down'}></i>
                </Button>
            </div>
        );
    }
}


export default e2pAddressButton;
