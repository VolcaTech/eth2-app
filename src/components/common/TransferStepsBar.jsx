import React, { Component } from "react";
import { ProgressBar } from 'react-bootstrap';


class e2pTransferBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testStep: 1
        };
    }

    _renderTransferBar = (step) => {
        let title, progBarStyle, dot1Style, dot2Style, dot3Style, textStyle1, textStyle2, textStyle3, pendingText;
        const labelStyle = { width: 60, height: 15, textAlign: "center", fontSize: 12 };

        switch (this.state.testStep) {
            case 1:
                progBarStyle = { width: 0, height: 4, backgroundColor: "#33aeff" };
                dot1Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute" };
                dot2Style = { height: 20, width: 20, backgroundColor: "#f5f5f5", borderRadius: 40, position: "absolute", right: 115 };
                dot3Style = { height: 20, width: 20, backgroundColor: "#f5f5f5", borderRadius: 40, position: "absolute", right: 0 };
                break;
            case 2:
                title = "Transaction is pending...";
                progBarStyle = { width: 120, height: 4, backgroundColor: "#33aeff" };
                dot1Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute" };
                dot2Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute", right: 115 };
                dot3Style = { height: 20, width: 20, backgroundColor: "#f5f5f5", borderRadius: 40, position: "absolute", right: 0 };
                break;
            case 3:
                title = "Transaction completed!";
                progBarStyle = { width: 250, height: 4, backgroundColor: "#33aeff" };
                dot1Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute" };
                dot2Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute", right: 115 };
                dot3Style = { height: 20, width: 20, backgroundColor: "#33aeff", borderRadius: 40, position: "absolute", right: 0 };

                break;
        }
        return (
            <div>
                <div style={{ height: 20, width: 250, position: "relative", marginBottom: 12, marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <div className="progress" style={{ width: 250, height: 4, position: "absolute", marginTop: 8, marginBottom: 8, }}>
                        <div className="progress-bar" role="progressbar" style={progBarStyle} ></div>
                    </div>
                    <div className="dot" style={dot1Style}></div>
                    <div className="dot" style={dot2Style}></div>
                    <div className="dot" style={dot3Style}></div>

                </div>
                <div>
                    <label style={{ width: 60, height: 15, textAlign: "center", fontSize: 12 }}>Created</label>
                    <label style={{ width: 60, height: 15, textAlign: "center", fontSize: 12, marginLeft: 55 }}>Processing</label>
                    <label style={{ width: 60, height: 15, textAlign: "center", fontSize: 12, marginLeft: 55 }}>Completed</label>
                </div>
                <button style={{ width: 50, height: 50 }} onClick={() => this.setState({ testStep: 2 })} title="increment" />
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
