import React, { Component } from "react";
import { Checkbox } from 'react-bootstrap';


class CheckBox extends React.Component {


    render() {
        return (
            <div style={{width: 225, height: 64, display: 'block', margin: 'auto'}}>
              <div style={{verticalAlign: 'text-top', display: 'inline-block', height: 15, width: 15, marginRight: 5}}>
		<Checkbox checked readOnly>
		  <div style={{ width: 205, textAlign: 'center', display: 'inline-block', verticalAlign: 'text-top', fontSize: 12, fontFamily: 'SF Display Regular'}}>I understand I am using alpha software, at my own risk, provided under MIT liscence.</div>
		</Checkbox>
	      </div>
	    </div>
        );
    }
}


export default CheckBox;
