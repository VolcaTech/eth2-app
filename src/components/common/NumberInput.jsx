import React, { Component } from "react";
import { FormControl } from 'react-bootstrap';


class e2pInput extends React.Component {
    render() {
        return (
            <FormControl disabled={this.props.disabled} type="number" style={{
                width: 290,
                height: 38,
                borderRadius: 12,
                border: '2px solid #f5f5f5',
                backgroundColor: this.props.backgroundColor,
                fontSize: 16,
                letterSpacing: 1.94,
                textAlign: 'center',
                boxShadow: 0,
                display: 'block', 
                margin: 'auto',
                fontFamily: "SF Display Bold",                 
                color: this.props.fontColor
            }} placeholder={this.props.placeholder}>
            </FormControl>
        )
    }
}

export default e2pInput;
