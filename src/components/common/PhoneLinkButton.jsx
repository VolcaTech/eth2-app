import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { chooseSendMode } from './../../actions/modes';

const styles = {
    linkButton: {
        color: '#0099ff',
        textAlign: 'left',
    },
    caretIcon: { color: '#000', fontSize: 14, marginLeft: 6, display: 'inline', paddingTop: 4 },
    sendModeButton: {
        backgroundColor: 'white',
        marginTop: 4,
        border: '2px solid rgb(245, 245, 245)',
        fontSize: 24,
        lineHeight: 1,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        borderRadius: 12,
        verticalAlign: 'top',
        overflow: 'hidden'

    }

}

class PhoneLink extends React.Component {
    render() {
        const sendMode = this.props.sendMode;
        let linkButtonWidth, buttonWidth = 205;
        if (this.props.active === false && sendMode === 'link') {
            buttonWidth = 170;
            linkButtonWidth = 133;
        }
        if (this.props.active === true && sendMode === 'link') {
            buttonWidth = 205;
            linkButtonWidth = 166;
        }
        if (this.props.active === true && sendMode === 'phone') {
            buttonWidth = 205;
            linkButtonWidth = 166;
        }

	
        return (
            <Button style={this.props.active ? {...styles.sendModeButton, border: 'none', WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', width: buttonWidth, height: this.props.height} : {...styles.sendModeButton, width: buttonWidth, height: this.props.height, padding: '4px 0px 4px 9px'}}
                onClick={this.props.handleClick}
            >
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    height: this.props.height,
                }}>
                    <div style={{ display: 'flex', height: 30, position: 'sticky' }}>
                        <div style={{
                            display: 'block', color: '#2bc64f',
                        }}>{sendMode === 'phone' ? <div style={{ color: '#2bc64f' }}>phone number</div> : <div style={{...styles.linkButton, width: linkButtonWidth}}>special link</div>}</div>
                        <i className={this.props.active ? 'fa fa-caret-up' : 'fa fa-caret-down'} style={styles.caretIcon}></i>
                    </div>
                    {this.props.active ? <div onClick={() => { sendMode === "phone" ? this.props.chooseSendMode('link') : this.props.chooseSendMode('phone') }}>{sendMode === 'phone' ? <div style={{...styles.linkButton, width: linkButtonWidth}}>special link</div> : <div style={{ color: '#2bc64f' }}>phone number</div>}</div> : ""}
                </div>
            </Button>
        );
    }
}


export default connect(state => ({
    sendMode: state.sendMode
}), { chooseSendMode })(PhoneLink);
