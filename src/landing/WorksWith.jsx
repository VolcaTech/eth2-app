import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import metamaskLogo from './../assets/images/metamask.png';
import trustLogo from './../assets/images/trust.png';
import cipherLogo from './../assets/images/cipher.png';
import toshiLogo from './../assets/images/toshi.png';
import goodLogo from './../assets/images/good.png';


class WorksWith extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Works smooth with</div>
                </Row>

                <Row style={styles.row}>
                    <div style={{ margin: 'auto' }}>
                        <Col xs={12} md={4} style={styles.column1}>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={metamaskLogo}></img>
                                <div style={styles.text}>Metamask</div>
                            </Col>
                            <Col xs={6} md={4}>
                                <img style={styles.logo} src={trustLogo}></img>
                                <div style={styles.text}>Trust</div>
                                <div style={{ display: 'flex'}}>
                                    <img style={{ marginTop: 2 }} src={goodLogo}></img>
                                    <div style={{ fontSize: 16, fontFamily: 'SF Display Regular', color: '#2bc64f', height: 38, textAlign: 'left', marginLeft: 5, paddingTop: 10 }}>
                                        Recommended
                                </div>
                                </div>
                            </Col>
                        </Col>
                        <Col xs={12} md={4} style={styles.column2}>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={cipherLogo}></img>
                                <div style={styles.text}>Cipher</div>
                            </Col>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={toshiLogo}></img>
                                <div style={styles.text}>Toshi</div>
                            </Col>
                        </Col>
                    </div>
                </Row>
            </div>
        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    row: { textAlign: 'center', marginBottom: 50 },
    text: { fontSize: 24, fontFamily: 'SF Display Medium', marginTop: 15, },
    textWhite: { color: '#fff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1, marginTop: 3, marginLeft: 5 },
    column1: { display: 'inline-block', float: 'none'},
    column2: { display: 'inline-block', float: 'none', paddingBottom: 50 },
    gitColumn: { backgroundColor: '#0099ff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7 },
    logo: { marginLeft: 10 }
}

export default WorksWith;