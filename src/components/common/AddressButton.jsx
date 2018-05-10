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
        const shorten = `${sanitized.slice(0, 3)}...${showEnd ? sanitized.slice(-num) : ''}`;
        return '0x'.concat(shorten);
    }

    render() {
        return (
            <Button style={{
            //width: 100,
            width: 85,
			height: 22,
			borderRadius: 6,
			borderWidth: 2,
			borderColor: this.props.color,                
			backgroundColor: (this.props.active ? this.props.color: "#fff"),
			color: (this.props.active ? "#fff": this.props.color),
			fontFamily: "SF Display Regular", 
			fontSize: 12,
			padding: 0,
			paddingTop: 2,
			paddingLeft:5,
			paddingRight:5
			
            }} onClick={this.props.handleClick}>
              <span>{this.shortAddress(this.props.address, 3)}</span>
	      {/* { this.props.networkId != "1" ? <span> ({this.props.networkName})</span> : null } */}
	      <i className={this.props.active ? 'fa fa-caret-up' : 'fa fa-caret-down'} style={{marginLeft: 5}}></i>
            </Button>
        );
    }
}


export default e2pAddressButton;
