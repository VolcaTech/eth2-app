import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


const styles = {
    text: { color: '#0099ff', marginTop: 15, },
    textWhite: { color: '#fff', marginTop: 3, marginLeft: 5 },
    //logo: { marginLeft: 10 }
}


class JoinUs extends React.Component {


    render() {
        return (
            <div className="reach-us-block">
              <div className="title">Reach us</div>

                <Row  className="reach-us-row">
                    <div style={{ margin: 'auto' }}>
                        <Col xs={12} sm={6}>
                            <a href="https://t.me/eth2io" target="_blank">
                              <RetinaImage style={styles.logo} src="https://eth2.io/images/telegram.png" />
                              <span style={styles.text}>Chat with us on Telegram</span>
                            </a>
                        </Col>
                        <Col xs={12} sm={6} style={{textAlign: 'left'}} className="second-col">
                          <a href="https://twitter.com/eth2io"  target="_blank" >
                              <RetinaImage style={styles.logo} src="https://eth2.io/images/twitter.png" />
                              <span style={styles.text}>Check our news on Twitter</span>
                            </a>
                        </Col>

                        <Col xs={12} sm={4} smOffset={4}  className="third-col">	  
                          <a href="https://github.com/eth2phone">
                            <div className="gitButton" >
                              <RetinaImage style={{ marginBottom: 6, marginRight: 5 }} src="https://eth2.io/images/git.png" />
                              <span style={styles.textWhite}>Feel free to PR on Github</span>
                            </div>
                          </a>
                        </Col>			
                    </div>		    
                </Row>
            </div>
        )
    }
}


export default JoinUs;
