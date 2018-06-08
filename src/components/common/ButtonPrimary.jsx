import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButtonPrimary extends React.Component {

    render() {
        return (
            <Button className="button-primary" disabled={this.props.disabled} style={{
			width: '100%',
			height: this.props.buttonHeight || 38,
			borderRadius: 12,
			borderColor: this.props.buttonColor,                
			backgroundColor: this.props.buttonColor,
			opacity: this.props.disabled ? 0.5 : 1,
			display: 'block', 
			color: "#fff",
			fontSize: this.props.fontSize ? this.props.fontSize : 18,
			fontFamily: "SF Display Black",                 
            }} onClick={this.props.handleClick}>
                {this.props.children}
            </Button>
        );
    }
}


export default e2pButtonPrimary;
