import React, { Component } from "react";
import Phone from 'react-phone-input-2';
import { FormControl } from 'react-bootstrap';
import infoLogo from './../../../public/images/Info.png'

const styles = {
    icon: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        borderBottom: '2px solid #f5f5f5',
        borderTop: '2px solid #f5f5f5',
        borderRight: '2px solid #f5f5f5',
        borderLeft: '0px',
        borderRadius: 12,
        height: 38,
        width: '11%',
        paddingRight: 4,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        backgroundColor: 'white',
        textAlign: 'right',
        float: 'right'
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
                        width: '89%',
                        height: 38,
                        borderRadius: 12,
                        border: '2px solid',
                        borderColor: this.props.error ? '#E64437' : '#f5f5f5',
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
                        padding: 0,
                        paddingRight: 5,
                        paddingLeft: 5
                    }}>
                </FormControl>
                    <div className="hover" style={{...styles.icon, borderColor: this.props.error ? '#E64437' : '#f5f5f5'}} onClick={() => {
                            alert("Please paste message with code from the sender.");
                        }}>
                    <img style={{width: 'auto'}} src={infoLogo}></img>
            </div>
            </div>
        );

    }
}

export default e2pPhoneInput;
