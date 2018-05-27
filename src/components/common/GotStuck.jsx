import React, { Component } from "react";
import RetinaImage from 'react-retina-image';


const styleCss = `

.got-stuck-box .text {
  display: inline-block;
}

.got-stuck-box .telegram-logo {
  display: inline-block;
}

/* FOR DESKTOP */
@media only screen and (min-width: 768px) {

    .got-stuck-box .telegram-logo {
	height: 56px;
	width: 56px;
	margin-bottom: -10px;
	margin-right: 24px;
    }

    .got-stuck-box .text {
	font-size: 20px;
    }
}

/* FOR MOBILE */
@media only screen and (max-width: 767px) {
   .got-stuck-box .telegram-logo {
	height: 40px;
	width: 40px;
	margin-bottom: -7px;
	margin-right: 10px;
    }
}



`;


class GotStuck extends React.Component {

    render() {
        return (
            <div className="got-stuck-box">
	      <div className="telegram-logo">
		<RetinaImage src="https://eth2.io/images/telegram.png" className="img-responsive" />
	      </div>
              <div className="text">
		Got stuck? Having problems? Text us<br/>
		in <a className="link" href="https://t.me/eth2io" target="_blank">Telegram</a>, we are there to help
	    </div>
		<style>
	          {styleCss}
		</style>
	    
            </div>                    
        );
    }
}


export default GotStuck;
