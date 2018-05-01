import React, { Component } from "react";
import { Button } from 'react-bootstrap';


class e2pButton extends React.Component {
    handleClick = () => {
        console.log("button pressed");
    };

    render() {
        return (
            <Button style={{
                width: 133,
                height: 38,
                borderRadius: 12,
                borderColor: this.props.buttonColor,
                backgroundColor: this.props.buttonColor,
                opacity: this.props.opacity,
                color: this.props.fontColor,
                fontSize: 18
            }} onClick={this.handleClick}>
                {this.props.children}
            </Button>
        );
    }
}


export default e2pButton;
