import React, { Component } from "react";
import { FormControl } from 'react-bootstrap';


class e2pInput extends React.Component {
    render() {
        return (
            <FormControl
	       onChange={this.props.onChange}
	       disabled={this.props.disabled}
	       componentClass='input'
	       value={this.props.value}
	       type={this.props.type || "number"} style={{
                   width: '100%',
                   height: 40,
                   borderRadius: 12,
                   border: this.props.error ? '2px solid #E64437' :  '2px solid #f5f5f5',
                   color: this.props.error ? '#E64437' : this.props.fontColor,		   
                   backgroundColor: this.props.backgroundColor,
                   fontSize: 18,
                   letterSpacing: 1.5,
                   textAlign: 'center',
                   boxShadow: 0,
                   display: 'block', 
                   margin: 'auto',
                   fontFamily: "SF Display Bold",                 
                   WebkitBoxShadow: 'none'
               }} placeholder={this.props.placeholder}>
            </FormControl>
        );
    }
}

export default e2pInput;
