import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


class JoinUs extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Join us</div>
                </Row>

                <Row style={styles.row}>
                    <div style={{ margin: 'auto' }}>
                        <Col xs={12} md={4} style={styles.column}>
                            <a href="https://t.me/eth2io" target="_blank" style={{ textDecoration: 'none', color: "#000" }}>
                                <Col xs={12} md={2}>
                                    <RetinaImage style={styles.logo} src="https://eth2.io/images/telegram.png" />
                                </Col>
                                <Col xs={12} md={10}>
                                    <div style={styles.text}>Chat with us on Telegram</div>
                                </Col>
                            </a>
                        </Col>
                        <Col xs={12} md={4} style={styles.column}>
                            <a href="https://twitter.com/eth2io"  target="_blank" style={{ textDecoration: 'none', color: "#000" }}>
                                <Col xs={12} md={2}>
                                    <RetinaImage style={styles.logo} src="https://eth2.io/images/twitter.png" />
                                </Col>
                                <Col xs={12} md={10}>
                                    <div style={styles.text}>Check our news on Twitter</div>
                                </Col>
                            </a>
                        </Col>
                    </div>
                </Row>

                <Row style={styles.row}>
                    <div style={{ display: 'flex', alignContent: 'center' }}>
                        <Col style={styles.gitColumn} xs={9} md={4}>
                            <Link to="/github" style={{ textDecoration: 'none', color: "#000" }}>
                                <div >
                                    <RetinaImage style={{ marginBottom: 10, marginRight: 5 }} src="https://eth2.io/images/git.png" />
                                    <div style={styles.textWhite}>Feel free to PR on Github</div>
                                </div>
                            </Link>
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
    textWhite: { color: '#fff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1, marginTop: 3, marginLeft: 5 },
    column: { display: 'inline-block', float: 'none', margin: 10 },
    gitColumn: { backgroundColor: '#0099ff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7 },
    //logo: { marginLeft: 10 }
}

export default JoinUs;
