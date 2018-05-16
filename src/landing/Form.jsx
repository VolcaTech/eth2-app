import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import gitLogo from './../assets/images/git-black.png';
import sendLogo from './../assets/images/send-logo.png';
import ButtonPrimary from './../components/common/ButtonPrimary';



class Form extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <Col xs={12} md={5}  style={styles.column}>
                    <div style={{width: '90%', margin: 'auto'}}>
                        <div style={styles.title}>Send Ether to everyone<br />
                            just by phone number</div>
                        <div style={styles.text}>Eth2Phone allows you to send Ether to
                        a person, verifying him by phone number.
He could then receive the assets using link and any Ethereum address of his choice.</div>
                        <Row>
                            <Col xs={12} md={6} style={styles.text2}>
                            How it works?
                            </Col>
                            <Col xs={12} md={6} style={{float: 'right'}}>
                            <div style={styles.gitContainer}>
                                <img style={{paddingBottom: 5, marginRight: 5}} src={gitLogo}></img>
                                <div style={styles.gitText}>View source</div>
                            </div>
                            </Col>
                        </Row>
                </div>
                    </Col>
                    <Col xs={12} md={5} style={styles.column}>
                        <div style={{width: '90%', margin: 'auto', height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 50, borderRadius: 10, boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)'}}>
                            <div style={{ fontSize: 24, fontFamily: 'SF Display Black' }}>Send Ether</div>
                            <div><img style={{width: '100%'}} src={sendLogo}></img></div>
                            <ButtonPrimary buttonColor="#0099ff">Send</ButtonPrimary>
                            <div style={styles.greyText}>You should have metamask installed</div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    row: { textAlign: 'center', margin: 40 },
    title: { fontSize: 36, fontFamily: 'SF Display Black', textAlign: 'left', lineHeight: 1, marginBottom: 50 },
    text: { fontSize: 24, fontFamily: 'SF Display Regular', lineHeight: 1, textAlign: 'left', marginBottom: 50 },
    text2: {float: 'left', color: '#0099ff', fontFamily: 'SF Display Bold', fontSize: 24, textAlign: 'left', paddingTop: 6},
    greyText: {color: '#999999', opacity: 0.8, fontSize: 20, fontFamily: 'SF Display Regular'},
    gitText: { fontSize: 24, fontFamily: 'SF Display Bold', lineHeight: 1, display: 'inline' },    
    column: { display: 'inline-block', float: 'none' },
    gitContainer: { width: '100%', height: 46, backgroundColor: '#fff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7, border: '2px solid #000000' },
    logo: { marginLeft: 10 }
}

export default Form;