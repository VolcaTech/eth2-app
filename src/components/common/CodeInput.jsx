import React, { Component } from "react";
import Phone from 'react-phone-input-2';
import { FormControl } from 'react-bootstrap';


const styles = {
    icon: {
	display: 'inline-block',
	width: '15%',
	borderBottom: '2px solid #f5f5f5',
	borderTop: '2px solid #f5f5f5',
	borderRight: '2px solid #f5f5f5',
	borderLeft: '0px',
	borderRadius: 12,
	height: 38,
	borderBottomLeftRadius: 0,
	borderTopLeftRadius: 0,
	padding: 7.5,
	backgroundColor: 'white',
	textAlign: 'center'
    },    
}


class e2pPhoneInput extends React.Component {

    render() {
        return (
            <div className="codeInput">
              <FormControl
		 onChange={this.props.onChange}
		 disabled={this.props.disabled}
		 componentClass='input'
		 value={this.props.value}
		 type={this.props.type || "number"}
		 placeholder={this.props.placeholder}
		 style={{
                     width: '85%',
                     height: 38,
                     borderRadius: 12,
		     border: '2px solid',
                     borderColor: this.props.error ?  '#E64437' : '#f5f5f5',
                     color: this.props.error ? '#E64437' : this.props.fontColor,		   
                     backgroundColor: this.props.backgroundColor,
                     fontSize: 16,
                     letterSpacing: 1,
                     textAlign: 'center',
                     boxShadow: 0,
                     display: 'inline-block', 
                     fontFamily: "SF Display Bold",                 
                     WebkitBoxShadow: 'none',
		     borderRight: 0,
		     borderTopRightRadius: 0,
		     borderBottomRightRadius: 0,
		     margin: 0,
		     padding: 0
		 }}>
            </FormControl>
	      <div
		 style={{
		     ...styles.icon,
		     borderColor: this.props.error ?  '#E64437' : '#f5f5f5',
		     }
		   }>
		<span
		   className="hover"
		   onClick={() => {
		       alert("Please paste secret code from the sender's message.");
		  }}
		   style={{
			  padding: 2,
			  border: "1.5px solid #0099ff",
			  borderRadius: 20,
			  color: '#0099ff',
			  paddingLeft: 6,
			  paddingRight: 6
		      }}>?</span>
	      </div>		

	    </div>
        );

    }
}

export default e2pPhoneInput;
