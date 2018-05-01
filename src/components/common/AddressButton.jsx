import React, { Component } from "react";
import { Button } from 'react-bootstrap';


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
        const shorten = `${sanitized.slice(0, num)}...${showEnd ? sanitized.slice(-num) : ''}`;
        return '0x'.concat(shorten);
    }

    render() {
        return (
            <Button style={{
                width: 100,
                height: 22,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#2bc64f",                
                backgroundColor: "white",
                color: "#999999",
                fontSize: 12,
                padding: 0,
                paddingTop: 2
            }} onClick={this.handleClick}>
                {this.shortAddress(this.props.address, 4)}
            </Button>
        );
    }
}


export default e2pAddressButton;
