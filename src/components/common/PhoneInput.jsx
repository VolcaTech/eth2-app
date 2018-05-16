import React, { Component } from "react";
import Phone from 'react-phone-input-2';

const styles = {
    input: {	
	width: '100%',
	height: 38,
	borderRadius: 12,
	color: 'black',
	fontSize: 16,
	fontFamily: "SF Display Bold",
	letterSpacing: 1.94,
	WebkitBoxShadow: 'none',
	//padding: 0,
	border: '2px solid #f5f5f5',
    },
    flag: {
	borderBottom: '2px solid #f5f5f5',
	borderTop: '2px solid #f5f5f5',
	borderLeft: '2px solid #f5f5f5',
	borderRight: '0px',
	borderRadius: 12,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 0,
	backgroundColor: 'white'
    },    
}


class e2pPhoneInput extends React.Component {

    render() {
        return (
            <div style={{display: 'block', margin: 'auto', width: '78%',}}>
              <Phone
		 ref={this.props._ref}		 
		 inputStyle={styles.input}
		 buttonStyle={styles.flag}
		 placeholder='Phone number'
		 defaultCountry={'us'}
		 placeholder="Phone number"
                   />
	    </div>
        );

    }
}

export default e2pPhoneInput;
