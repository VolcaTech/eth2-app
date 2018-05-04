import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButtonPrimary extends React.Component {

    render() {
        return (
            <Button disabled={this.props.disabled} style={{
                width: 205,
                height: 38,
                borderRadius: 12,
                borderColor: this.props.buttonColor,                
                backgroundColor: this.props.buttonColor,
                opacity: this.props.opacity,
                display: 'block', 
                margin: 'auto',
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
