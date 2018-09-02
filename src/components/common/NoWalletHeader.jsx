import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


const styles = {
    notConnectedButton: {

    },
    redDot: {
        display: 'inline',
        color: '#e64437',
        marginLeft: 3
    },
    web3: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0
    },
    headerRow: {
        height: 44,
        display: 'block',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10
    },
    headerLogo1: {
        width: 55,
        height: 29,
        fontFamily: "SF Display Black",
        color: "black",
        fontSize: 30,
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 9
    },
    headerLogo2: {
        display: 'inline', 
        fontFamily: 'SF Display Regular',
        fontSize: 14, 
        color: '#999999',
        verticalAlign: 'text-top',
        marginLeft: 5
    }
}


const NoWalletHeader = () => {
    let headerLogoClass = 'no-wallet-header-logo';
    let headerButtonClass = 'not-connected-button';
    
    if (window.location &&
        window.location.hash === '#/' ||        
        window.location.hash === '#/about' ||
        window.location.hash === '#/faq' ||
        window.location.hash === '#/tos'
    ) {
        headerLogoClass = "no-wallet-header-logo-desktop";
        headerButtonClass = "not-connected-button-desktop";
    }
    return (
        <Grid>
            <Row className="header-row">
                <Col xs={12}>
                    <Row style={styles.headerRow}>
                        <Col xs={6} style={{ padding: 0 }}>
                            <Link className="no-underline" to="/" onClick={() => {
                                if (window.location.hash && window.location.hash.length < 3) {
                                    window.location.reload();
                                }
                            }}>
                                <div style={styles.headerLogo1}>
                                    Eth2<div style={styles.headerLogo2}>beta</div></div>
                            </Link>
                        </Col>
                        {/* <Col style={styles.web3} xs={6}>
                            <div className={headerButtonClass}>
                                Not connected to Web3
                    <div style={styles.redDot}>&#9679;</div>
                            </div>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </Grid>
    );
}

export default NoWalletHeader;
