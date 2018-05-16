import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButtonPrimary extends React.Component {

    render() {
        let height = 38;
        this.props.buttonHeight ? height = this.props.buttonHeight : "";

        return (
            <Button disabled={this.props.disabled} style={{
			width: '100%',
			height: height,
			borderRadius: 12,
			borderColor: this.props.buttonColor,                
			backgroundColor: this.props.buttonColor,
			opacity: this.props.disabled ? 0.1 : 1,
			display: 'block', 
			color: "#fff",
			fontSize: 18,
			fontFamily: "SF Display Black",                 
            }} onClick={this.props.handleClick}>
                {this.props.children}
            </Button>
        );
    }
}


export default e2pButtonPrimary;
