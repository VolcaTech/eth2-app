import React, { Component } from "react";
import telegramLogo from './../../assets/images/telegram.png';


class GotStuck extends React.Component {

    render() {
        return (
            <div style={styles.container}>
              <img style={styles.tgLogo} src={telegramLogo}></img>
              <div style={styles.textContainer} className="text">
		Got stuck? Having problems? Text us<br/>
		in <a className="link" href="https://t.me/eth2phone" target="_blank">Telegram</a>, we are there to help
	    </div>
            </div>                    
        );
    }
}

const styles = {
    container: {
	textAlign: 'left',
	display: 'flex'
    },
    tgLogo: {
	display: 'inline',
	height: 40,
	width: 40,
	marginBottom: -5
    },
    textContainer: { marginLeft: 10 }
}


export default GotStuck;
