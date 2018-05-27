import React, { Component } from "react";
import telegramLogo from './../../assets/images/telegram.png';


class GotStuck extends React.Component {

    render() {
        return (
            <div style={styles.container} className="got-stuck-box">
	      <div style={{display: 'inline-block'}} className="telegram-logo">
		<img src={telegramLogo} className="img-responsive" />
	      </div>
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
    },
    textContainer: {
    display: 'inline-block',
    fontSize: 20,
    fontFamily: 'SF Display Regular'
    }
}


export default GotStuck;
