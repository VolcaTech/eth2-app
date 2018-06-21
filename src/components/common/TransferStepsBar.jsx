import React, { Component } from "react";
import { ProgressBar } from 'react-bootstrap';

const colors = {
    blue: "#0099ff",
    gray: "#f5f5f5",
    red: '#e64437',
    green: '#2bc64f',
    black: '#000000'
}

const styles = {
    container: {
	width: 300,
	display: 'block',
	margin: 'auto' 
    },
    subcontainer: {
	height: 20,
	width: 275,
	position: "relative",
	marginBottom: 12,
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: 20 
    },
    progressBarContainer: {
	width: 250,
	height: 4,
	position: "absolute",
	marginTop: 8,
	marginBottom: 8,
	marginLeft: 10
    },
    progBar: {
	width: 0,
	height: 4,
	backgroundColor: colors.blue
    },    
    dot1: {
	height: 15,
	width: 15,
	backgroundColor: colors.blue,
	borderRadius: '50%',
	top: 2.5,
	marginLeft: -2.5,	
	position: "absolute"
    },    
    // dot2: {
    // 	height: 15,
    // 	width: 15,
    // 	backgroundColor: colors.blue,
    // 	borderRadius: '50%',
    // 	position: "absolute",
    // 	top: 2.5,
    // 	right: 127
    // },
    dot1Error: {
	height: 20,
	width: 20,
	backgroundColor: colors.red,
	borderRadius: '50%',
	position: "absolute",
	top: 2.5,
	marginLeft: -2.5,	
	position: "absolute"
    },    
    dot2: {
	height: 15,
	width: 15,
	backgroundColor: colors.gray,
	borderRadius: '50%',
	position: "absolute",
	top: 2.5,
	right: 5
    },
    label1: {
    	height: 15,
    	fontSize: 13,
    	// float: 'left'
    },
    // label2: {
    // 	width: 60,	
    // 	height: 15,
    // 	fontSize: 13,
    // 	marginLeft: 10
    // },
    label2: {
	width: 60,
	height: 15,
	float: 'right',
	fontSize: 13
	// textAlign: 'right'
    },
    pulsingLeft: {
	//right: 122,
	top: -4
    },
    pulsingRight: {
	right: 0,
	top: -4
    }        
}

//  Possible statuses: 
//  - 'depositing'
//  - 'receiving'
//  - 'deposited'
//  - 'sent'
//  - 'received'
//  - 'cancelling'
// - 'completed' (when redirected from URL)
//  - 'cancelled'

class e2pTransferBar extends React.Component {

    _getProgressBarStyle() {
	const { status, isError } = this.props;
	const progBarStyle = {...styles.progBar};

	
	switch (status) {
	case 'sent':
	case 'received':
	case 'completed':
	case 'receiving':
	    if (!isError) {
		progBarStyle.width = 290;
	    }
	    break;
	}

	
	return progBarStyle;
    }

    _leftDotPulsing() {
	const { status } = this.props;
	let pulsing = false;
	switch (status) {
	case 'depositing':
	case 'cancelling':
	    pulsing = true;
	    break;
	}
	return pulsing;	
    }

    _rightDotPulsing() {
	const { status } = this.props;
	let pulsing = false;
	switch (status) {
	case 'receiving':
	    pulsing = true;
	    break;
	}
	return pulsing;	
    }
    
    _getDot1Styles() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return styles.dot1Error;
	} else {
	    return styles.dot1;
	}
    }

    _getLabel1Color() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return colors.red;
	} else {
	    return colors.black;
	}
    }

    _getLabel1Text() {
	const { status, isError } = this.props;
	if (isError) {
	    return 'Failed';
	}
	switch (status) {
	case 'received':
	case 'receiving':
	case 'sent':
	case 'deposited':
	case 'completed':	    	    
	    return 'Deposited';
	case 'cancelled':
	    return 'Canceled';
	case 'cancelling':
	    return 'Canceling';	    
	case 'depositing':
	    return 'Depositing';	    
	default:
	    return 'Processing';
	}
    }

    _getDot2() {
	const { status, isError } = this.props;
	// if (isError) {
	//     return (<div className="dot" style={styles.dot2}></div>);
	// }
	if (this._rightDotPulsing()) {
	    return (
		<div className="dot-pulse-outer" style={styles.pulsingRight}>
		  <div className="dot-pulse-middle">
		    <div className="dot-pulse-inner pulse">		      
		    </div>
		  </div>
		</div>
	    );
	}
 
	switch (status) { 
	case 'sent': 
	case 'received':
	case 'completed':	    
	    return (<div className="step-dot step-dot-green">
		    <div className="step-dot-inner-2">
		    <div className="step-dot-inner-3">
		    <span className="step-dot-inner-4 fa fa-check" />
		    </div>		    
		    </div>
		    </div>);
	default:
	    return (<div className="dot" style={styles.dot2}></div>);
	} 
    };

    _getLabel2() {
	let offset;
 	const { status, isError } = this.props;	

	const labelTitle = (status === 'receiving') ? 'Claiming' : 'Claimed';
	
	return (
	    <label style={{...styles.label2, color: this._getLabel2Color(), marginRight: offset}}>
	      {labelTitle}
	    </label>
	);
    }
    
    _getLabel2Color() {
	const { status, isError } = this.props;
	if (!isError) { 
	    switch (status) { 
	    case 'receiving':
		return colors.black;
	    case 'sent':
	    case 'received':
	    case 'completed':		
		return colors.green;
	    }
	}
	return '#999999';
    }

    
    _getDot1() {
 	if (this._leftDotPulsing()) {
	    return (
		<div className="dot-pulse-outer" style={styles.pulsingLeft}>
		  <div className="dot-pulse-middle">
		    <div className="dot-pulse-inner pulse">		      
		    </div>
		  </div>
		</div>
	    );
	}
        const dot1Style = this._getDot1Styles();	

	return (
	    <div style={dot1Style}></div>
	);
    }
    
    render() {
	const progBarStyle = this._getProgressBarStyle();
	
        return (
            <div style={styles.container}>
                <div style={styles.subcontainer}>
                  <div className="progress" style={styles.progressBarContainer}>
                    <div className="progress-bar" role="progressbar" style={progBarStyle} ></div>
                  </div>
                  { this._getDot1() }
		  { this._getDot2() }
                </div>
                <div className="progress-bar-labels-row">
                    <label style={{...styles.label1, color: this._getLabel1Color()}}>{this._getLabel1Text()}</label>
                    { this._getLabel2()}
                </div>
            </div>

        );
    }
}


export default e2pTransferBar;
