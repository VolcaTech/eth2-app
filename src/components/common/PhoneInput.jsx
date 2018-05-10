import React, { Component } from "react";
import Phone from 'react-phone-input-2';


class e2pPhoneInput extends React.Component {
    
    
    render() {
        return (
            <div style={{display: 'block', margin: 'auto', width: 295,}}>
              <Phone
		 ref={this.props._ref}		 
		 inputStyle={{ width: 295, height: 38, borderRadius: 12, border: '2px solid #f5f5f5', color: 'black', fontSize: 16, fontFamily: "SF Display Bold", letterSpacing: 1.94 }}
                buttonStyle={{ borderBottom: '2px solid #f5f5f5', borderTop: '2px solid #f5f5f5', borderLeft: '2px solid #f5f5f5', borderRight: '0px', borderRadius: 12, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: 'white' }}
                defaultCountry={'us'}
              placeholder="Phone number"
                
                   />
</div>
        );

    }
}

export default e2pPhoneInput;
