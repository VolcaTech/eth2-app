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
			opacity: this.props.opacity,
			color: '#fff',
			fontSize: 18,
		    }} onClick={this.props.onClick}
		    disabled={this.props.disabled}>
	      {this.props.children}
	    </Button>
	);
    }
}


export default e2pButtonSmall;
