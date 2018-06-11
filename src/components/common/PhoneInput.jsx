import React, { Component } from "react";
import Phone from 'react-phone-input-2';

const styles = {
    input: {
        width: '100%',
        height: 40,
        textAlign: 'center',
        paddingRight: 45,
        borderRadius: 12,
        color: 'black',
        fontSize: 18,
        fontFamily: "SF Display Bold",
        letterSpacing: 1.5,
        WebkitBoxShadow: 'none',
        border: '2px solid #f5f5f5',
    },
    inputError: {
        textAlign: 'center',	
        width: '100%',
        paddingRight: 45,	
        height: 40,
        borderRadius: 12,
        color: '#E64437',
        fontSize: 18,
        fontFamily: "SF Display Bold",
        letterSpacing: 1.5,
        WebkitBoxShadow: 'none',
        border: '2px solid #E64437'
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
    flagError: {
        borderBottom: '2px solid #E64437',
        borderTop: '2px solid #E64437',
        borderLeft: '2px solid #E64437',
        borderRight: '0px',
        borderRadius: 12,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: 'white'
    },
}


class e2pPhoneInput extends React.Component {

    state = {
	focus: false
    }

    _onFocus() {
	this.setState({focus: true});
    }
    
    render() {
        return (
            <div style={{ display: 'block', margin: 'auto', width: '78%', }}>
                <Phone
                   onKeyDown={this.props.onChange}
		   onFocus={this._onFocus.bind(this)}
                   ref={this.props._ref}
                   inputStyle={this.props.error ? styles.inputError : styles.input}
                   buttonStyle={this.props.error ? styles.flagError : styles.flag}
		   defaultCountry={ this.state.focus ? 'us' : null } 		   
                   placeholder={this.props.placeholder ? this.props.placeholder : 'Phone number'}
		   enableLongNumbers={true}
                   disabled={this.props.disabled}

                />
            </div>
        );

    }
}

export default e2pPhoneInput;
