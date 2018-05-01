import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButtonPrimary extends React.Component {
    handleClick = () => {
        console.log("button pressed");
    };

    render() {
        return (
            <div style={{
                margin: "auto",                
            }}>
            <Button style={{
                width: 205,
                height: 38,
                borderRadius: 12,
                borderColor: this.props.buttonColor,                
                backgroundColor: this.props.buttonColor,
                color: "#fff",
                fontSize: 18
            }} onClick={this.handleClick}>
                {this.props.children}
            </Button>
            </div>
        );
    }
}


export default e2pButtonPrimary;
