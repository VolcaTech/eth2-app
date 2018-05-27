import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';


class WorksWith extends React.Component {


    render() {
        return (
            <div style={{marginTop: 120}}>
                <Row style={styles.row}>
                    <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Works smooth with</div>
                </Row>

                <Row style={styles.row}>
                        <Col xs={12} md={4} mdOffset={2} style={styles.column1}>
                            <Col xs={6} md={6}>
                                <RetinaImage style={styles.logo} src="https://eth2.io/images/metamask.png" />
                                <div style={styles.text}>Metamask</div>
                            </Col>
                            <Col xs={6} md={6}>
                                <RetinaImage style={styles.logo} src="https://eth2.io/images/trust.png" />
                                <div style={styles.text}>Trust</div>
                                <div>
                                    <RetinaImage style={{ marginTop: 2 }} src="https://eth2.io/images/good.png" />
                                    <div style={{ display: 'inline', fontSize: 16, fontFamily: 'SF Display Regular', color: '#2bc64f', height: 38, textAlign: 'left', marginLeft: 5, paddingTop: 10 }}>
                                        Recommended
                                </div>
                                </div>
                            </Col>
                        </Col>
                        <Col xs={12} md={4} style={styles.column2}>
                            <Col xs={6} md={6}>
                              <RetinaImage style={styles.logo} src="https://eth2.io/images/cipher.png" />
                              <div style={styles.text}>Cipher</div>
                            </Col>
                            <Col xs={6} md={6}>
                                <RetinaImage style={styles.logo} src="https://eth2.io/images/toshi.png" />
                                <div style={styles.text}>Toshi</div>
                            </Col>
                        </Col>
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
    column1: { display: 'inline-block', float: 'center'},
    column2: { display: 'inline-block', float: 'center'},
    gitColumn: { backgroundColor: '#0099ff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7 },
    logo: { marginLeft: 10, height: 117, }
}

export default WorksWith;
