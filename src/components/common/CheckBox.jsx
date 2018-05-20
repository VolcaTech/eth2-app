import React, { Component } from "react";
import { Checkbox } from 'react-bootstrap';


class CheckBox extends React.Component {


    render() {
        console.log(this.props)
        return (
            <div style={{ width: 225, height: 64, display: 'block', margin: 'auto' }}>
                <div style={{ verticalAlign: 'text-top', display: 'inline-block', height: 15, width: 15, marginRight: 5 }}>
                    <Checkbox onClick={this.props.onSubmit} readOnly disabled={this.props.disabled}>
                        <div style={{ width: 205, textAlign: 'center', display: 'inline-block', verticalAlign: 'text-top', fontSize: 12, fontFamily: 'SF Display Regular', color: this.props.textColor }}>I understand I am using beta software,
at my own risk. <div style={{ fontFamily: 'SF Display Bold', display: 'inline', color: '#0099ff' }}>Learn more</div></div>
                    </Checkbox>
                </div>
            </div>
        );
    }
}


export default CheckBox;
