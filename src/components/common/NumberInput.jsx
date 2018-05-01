import React, { Component } from "react";
import { FormControl } from 'react-bootstrap';


class e2pInput extends React.Component {
    render() {
        return (
            <FormControl style={{
                width: 290,
                height: 38,
                borderRadius: 12,
                border: '2px solid #f5f5f5',
                backgroundColor: '#fff',
                fontSize: 16,
                textAlign: 'center',
                boxShadow: 0,
                margin: 'auto',
                marginTop: 10,
                marginBottom: 10,
                
            }} placeholder={this.props.placeholder}>
                {this.props.children}
            </FormControl>
        )
    }
}

export default e2pInput;
