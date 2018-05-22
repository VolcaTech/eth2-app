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
	width: 260,
	height: 4,
	position: "absolute",
	marginTop: 8,
	marginBottom: 8
    },
    progBar: {
	width: 140,
	height: 4,
	backgroundColor: colors.blue
    },    
    dot1: {
	height: 20,
	width: 20,
	backgroundColor: colors.blue,
	borderRadius: 40,
	position: "absolute"
    },    
    dot2: {
	height: 20,
	width: 20,
	backgroundColor: colors.gray,
	borderRadius: 40,
	position: "absolute",
	right: 127
    },
    dot3: {
	height: 20,
	width: 20,
	backgroundColor: colors.gray,
	borderRadius: 40,
	position: "absolute",
	right: 5
    },
    createdLabel: {
	height: 15,
	fontSize: 12,
	float: 'left'
    },
    label2: {
	width: 60,	
	height: 15,
	fontSize: 12,
	marginLeft: 10
    },
    label3: {
	width: 60,
	height: 15,
	float: 'right',
	// textAlign: 'right'
    },
    labelsRow: {
	textAlign: 'center'
    },
    pulsing: {
	right: 122,
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
//  - 'cancelled'

class e2pTransferBar extends React.Component {

    _getProgressBarStyle() {
	const { status, isError } = this.props;
	const progBarStyle = {...styles.progBar};

	
	switch (status) {
	case 'deposited':
	case 'sent':
	case 'received':
	    if (!isError) {
		progBarStyle.width = 290;
	    }
	    break;
	}

	
	return progBarStyle;
    }

    _isProcessing() {
	const { status } = this.props;
	let processing = false;
	switch (status) {
	case 'depositing':
	case 'cancelling':
	case 'receiving':	    
	    processing = true;
	    break;
	}
	return processing;
	
    }

    
    _getDot2Color() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return colors.red;
	} else {
	    return colors.blue;
	}
    }

    _getLabel2Color() {
	const { status, isError } = this.props;
	if (status === 'cancelled' || isError) {
	    return colors.red;
	} else {
	    return colors.black;
	}
    }

    _getLabel2Text() {
	const { status, isError } = this.props;
	if (isError) {
	    return 'Failed';
	}
	if (status === 'cancelled') {
	    return 'Canceled';
	}
	return 'Processing';
    }

    _getDot3() {
	const { status, isError } = this.props;
	if (isError) {
	    return (<div className="dot" style={styles.dot3}></div>);
	}	
	switch (status) { 
	case 'deposited':
	    return (<div className="step-dot step-dot-blue">
		    <div className="step-dot-inner-2">
		    <div className="step-dot-inner-3">
		    <span className="step-dot-inner-4 fa fa-check" />
		    </div>		    
		    </div>
		    </div>);

	case 'sent':
	case 'received':
	    return (<div className="step-dot step-dot-green">
		    <div className="step-dot-inner-2">
		    <div className="step-dot-inner-3">
		    <span className="step-dot-inner-4 fa fa-check" />
		    </div>		    
		    </div>
		    </div>);
	default:
	    return (<div className="dot" style={styles.dot3}></div>);
	} 
    };

    _getLabel3() {
	let offset;
	const label = this._getLabel3Text();
 	const { status, isError } = this.props;	
	/////// if ((label === 'Sent' && status !== 'deposited') || isError) {
	///////     offset = 10;
	/////// } else if (status === 'received' || status === 'sent') {
	///////     offset = -15;
	/////// } else {
	///////     offset = 0;
	/////// }
	
	return (
	    <label style={{...styles.label3, color: this._getLabel3Color(), marginRight: offset}}>
	      { label }
	    </label>
	);
    }
    
    _getLabel3Color() {
	const { status, isError } = this.props;
	if (!isError) { 
	    switch (status) { 
	    case 'deposited':
		return colors.blue;
	    case 'sent':
	    case 'received':
		return colors.green;
	    }
	}
	return '#999999';
    }

    _getLabel3Text() {
	const { direction, status } = this.props;
	if (direction === 'in' || status === 'sent') {
	    return 'Received';
	}	
	return 'Sent';
    }
    
    _getDot2() {
	if (this._isProcessing()) {
	    return (
		<div className="dot-pulse-outer" style={styles.pulsing}>
		  <div className="dot-pulse-middle">
		    <div className="dot-pulse-inner pulse">		      
		    </div>
		  </div>
		</div>
	    );
	}
	const dot2Color = this._getDot2Color();	
        const dot2Style = {...styles.dot2, backgroundColor: dot2Color };

	return (
	    <div style={dot2Style}></div>
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
                    <div className="dot" style={styles.dot1}></div>
                    { this._getDot2() }
		    { this._getDot3() }
                </div>
                <div style={styles.labelsRow}>
                    <label style={styles.createdLabel}>Created</label>
                    <label style={{...styles.label2, color: this._getLabel2Color()}}>{this._getLabel2Text()}</label>
                    { this._getLabel3()}
                </div>
            </div>

        );
    }
}


export default e2pTransferBar;
