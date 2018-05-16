import React, { Component } from "react";
import telegramLogo from './../../assets/images/telegram.png';


class GotStuck extends React.Component {

    render() {
        return (
            <div style={styles.container}>
                    <img style={{display: 'inline'}} src={telegramLogo}></img>
                    <div style={styles.textContainer}>Got stuck? Having problems? Text us in <div style={styles.textBlue}>Telegram</div>, we are there to help</div>
                    </div>                    
        );
    }
}

const styles = {
    container: {textAlign: 'left', display: 'flex'},
    textContainer: {display: 'inline', height: 48, width: '60%', fontSize: 20, fontFamily: "SF Display Regular", marginLeft: 20},
    textBlue: {color: '#0099ff', fontFamily: 'SF Display Bold', display: 'inline'}
}


export default GotStuck;
