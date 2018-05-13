import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import telegramLogo from './../assets/images/telegram.png';
import twitterLogo from './../assets/images/twitter.png';
import gitLogo from './../assets/images/git.png';


class JoinUs extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Join us</div>
                </Row>

                <Row style={styles.row}>
                <div style={{margin: 'auto'}}>
                        <Col xs={12} md={4} style={styles.column}>
                            <Col xs={12} md={2}>
                                <img style={styles.logo} src={telegramLogo}></img>
                            </Col>
                            <Col xs={12} md={10}>
                                <div style={styles.text}>Chat with us on Telegram</div>
                            </Col>
                        </Col>
                        <Col xs={12} md={4} style={styles.column}>
                            <Col xs={12} md={2}>
                                <img style={styles.logo} src={twitterLogo}></img>
                            </Col>
                            <Col xs={12} md={10}>
                                <div style={styles.text}>Check our news on Twitter</div>
                            </Col>
                        </Col>
                        </div>
                </Row>

                <Row style={styles.row}>
                    <div style={{ display: 'flex', alignContent: 'center' }}>
                        <Col style={styles.gitColumn} xs={9} md={4}>
                            <div >
                                <img style={{marginBottom: 10, marginRight: 5}} src={gitLogo}></img>
                                <div style={styles.textWhite}>Feel free to PR on Github</div>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    row: { textAlign: 'center', margin: 40 },
    text: { color: '#0099ff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1, float: 'left', marginTop: 15, },
    textWhite: { color: '#fff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1,  marginTop: 3, marginLeft: 5  },
    column: {display: 'inline-block', float: 'none', margin: 10},
    gitColumn: { backgroundColor: '#0099ff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7 },
    logo: {marginLeft: 10}
}

export default JoinUs;