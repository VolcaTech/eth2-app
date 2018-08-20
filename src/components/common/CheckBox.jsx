import React, { Component } from "react";
import { Checkbox } from 'react-bootstrap';

const styles = {
    container: { width: 225, height: 64, display: 'block', margin: 'auto' },
    blueText: { fontFamily: 'SF Display Bold', display: 'inline', color: '#0099ff', textDecoration: 'none' },
}

class CheckBox extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <Checkbox className="checkbox" onClick={this.props.onSubmit} style={{borderColor: 'red', borderWidth: 1}} readOnly >
                    <div style={{ width: 230, textAlign: 'center', display: 'inline-block', fontSize: 14, fontFamily: 'SF Display Regular', color: this.props.textColor }}>I understand I am using beta software,
at my own risk. <a href="/#/tos" style={styles.blueText}>Learn more</a></div>
                </Checkbox>
            </div>
        );
    }
}


export default CheckBox;
