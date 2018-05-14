import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import secureLogo from './../assets/images/secure.png';
import cancellableLogo from './../assets/images/cancellable.png';
import nowalletLogo from './../assets/images/nowallet.png';
import web3Logo from './../assets/images/web3.png';


class Features extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Features</div>
                </Row>

                <Row style={styles.row}>
                        <Col xs={12} md={6} style={styles.column}>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={secureLogo}></img>
                                <div style={styles.text}>Secure</div>
                                <div style={styles.text2}>
                                    At no time any of the single element of the system has enough data to steal your assets. I.e. even if you hack the server, you still don’t have the transaction code, and same for other.
                                </div>
                            </Col>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={cancellableLogo}></img>
                                <div style={styles.text}>Cancellable</div>
                                <div style={styles.text2}>
                                All the transactions could be cancelled until received. That means if you’ve messed something up, you can always get your Ether back if receiver hasn’t yet requested them. At the same time he can’t request the assets without the special link from you.
                                </div>
                            </Col>
                        </Col>
                        <Col xs={12} md={6} style={styles.column}>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={nowalletLogo}></img>
                                <div style={styles.text}>No wallet needed</div>
                                <div style={styles.text2}> 
                                You can send Ether even to those who don’t have a wallet yet. These people will simply install one of suggested or any compatible wallets and follow the link to receive the assets. 
                                                                </div>
                            </Col>
                            <Col xs={6} md={6}>
                                <img style={styles.logo} src={web3Logo}></img>
                                <div style={styles.text}>Web3 compatible</div>
                                <div style={styles.text2}>
                                The solution works well with any Web3 wallet and provides same experience. However, there is a list of suggested web wallets and wallet apps that we recommend for using. 
                                </div>
                            </Col>
                        </Col>
                </Row>
            </div>
        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    row: { textAlign: 'center', marginBottom: 50, padding: 10 },
    text: { fontSize: 24, fontFamily: 'SF Display Bold', marginTop: 30, marginBottom: 30},
    text2: { fontSize: 16, fontFamily: 'SF Display Regular', lineHeight: 1, marginTop: 10 },
    column: {  verticalAlign: 'top', marginTop: 10, marginBottom: 10, paddingRight: 5, paddingLeft: 5 },
    logo: {height: 117, alignContent: 'center'}

}

export default Features;