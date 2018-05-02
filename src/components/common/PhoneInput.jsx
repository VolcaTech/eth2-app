import React, { Component } from "react";
import Phone from 'react-phone-input-2';


class e2pPhoneInput extends React.Component {    
    render() {
	console.log("render")
	console.log(this.phoneNumber);
	return (
	    <Phone
	       ref={this.props._ref}
	       inputStyle={{ width: 295, height: 38, borderRadius: 12, border: '2px solid #f5f5f5', color: 'black', fontSize: 16, letterSpacing: 1.94 }}
               buttonStyle={{ borderBottom: '2px solid #f5f5f5', borderTop: '2px solid #f5f5f5', borderLeft: '2px solid #f5f5f5', borderRight: '0px', borderRadius: 12, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: 'white' }}
               defaultCountry={'us'}
	      />
        );
    }
}

export default e2pPhoneInput;
