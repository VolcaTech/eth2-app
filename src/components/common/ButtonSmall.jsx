import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButtonSmall extends React.Component {

    render() {
	return (
	    <Button style={{
			width: 133,
			height: 38,
			borderRadius: 12,
			borderColor: this.props.buttonColor,
			backgroundColor: this.props.buttonColor,
			opacity: this.props.disabled ? 0.1 : 1,
			color: '#fff',
            fontSize: 18,
            fontFamily: "SF Display Black",
            lineHeight: 1                          
		    }} onClick={this.props.onClick}
		    disabled={this.props.disabled}>
	      {this.props.children}
	    </Button>
	);
    }
}


export default e2pButtonSmall;
