import React, { Component } from "react";
import { ProgressBar } from 'react-bootstrap';

const styles = {
    container: {
	width: 290,
	display: 'block',
	margin: 'auto' 
    },
    subcontainer: {
	height: 20,
	width: 250,
	position: "relative",
	marginBottom: 12,
	marginLeft: 20,
	marginRight: 20,
	marginTop: 10 
    },
    progressBarContainer: {
	width: 250,
	height: 4,
	position: "absolute",
	marginTop: 8,
	marginBottom: 8
    },
    progBar: {
	width: 0,
	height: 4,
	backgroundColor: "#33aeff"
    },    
    dot1: {
	height: 20,
	width: 20,
	backgroundColor: "#33aeff",
	borderRadius: 40,
	position: "absolute"
    },    
    dot2: {
	height: 20,
	width: 20,
	backgroundColor: "#f5f5f5",
	borderRadius: 40,
	position: "absolute",
	right: 115
    },
    dot3: {
	height: 20,
	width: 20,
	backgroundColor: "#f5f5f5",
	borderRadius: 40,
	position: "absolute",
	right: 0
    },
    redLineStyle: {
	width: 120,
	height: 4,
	backgroundColor: "#f04234",
	display: "flex"
    },
    createdLabel: {
	width: 60,
	height: 15,
	textAlign: "center",
	fontSize: 12
    },
    label: {
	width: 60,
	height: 15,
	textAlign: "center",
	fontSize: 12,
	marginLeft: 55 
    }
}


class e2pTransferBar extends React.Component {

    _renderTransferBar = (step) => {
        let title, progBarStyle, redLineStyle, dot1Style, dot2Style, dot3Style, textStyle1, textStyle2, textStyle3, pendingText;
        const labelStyle = { width: 60, height: 15, textAlign: "center", fontSize: 12 };
	progBarStyle = {...styles.progBar};
        dot1Style = {...styles.dot1};
        dot2Style = {...styles.dot2};
        dot3Style = {...styles.dot3};		

        switch (step) {
        case 2:
            progBarStyle.width = 120;
	    dot2Style.backgroundColor = "#33aeff";
            break;
        case 3:
            progBarStyle.width = 250;
	    dot2Style.backgroundColor = "#33aeff";
	    dot3Style.backgroundColor = "#33aeff";	    
            break;
        case "fail":
            progBarStyle.width = 120;	    
	    dot2Style.backgroundColor = "#33aeff";
            break;
        }
        return (
            <div style={styles.container}>
                <div style={styles.subcontainer}>
                    <div className="progress" style={styles.progressBarContainer}>
                      <div className="progress-bar" role="progressbar" style={progBarStyle} ></div>
		      {step === 'fail' ? <div style={styles.redLine}></div> : null}
                    </div>
                    <div className="dot" style={dot1Style}></div>
                    <div className={this.props.step === 2 ? 'dot scale-up-center' : 'dot'} style={dot2Style}></div>
                    <div className="dot" style={dot3Style}></div>

                </div>
                <div>
                    <label style={styles.createdLabel}>Created</label>
                    <label style={styles.label}>Processing</label>
                    <label style={styles.label}>{step === 'fail' ? 'Error' : 'Completed'}</label>
                </div>
            </div>

        );
    }


    render() {
        return (
            this._renderTransferBar(this.props.step)
        )
    }
}

export default e2pTransferBar;
