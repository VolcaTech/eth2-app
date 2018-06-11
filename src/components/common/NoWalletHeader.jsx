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
        margin: 'auto',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTop: '2px solid #f5f5f5',
        marginBottom: 10
    },
    headerLogo1: {
        width: 55,
        height: 29,
        fontFamily: "SF Display Black",
        color: "black",
        fontSize: 24,
        letterSpacing: 1,
        textAlign: 'center',
        marginTop: 9
    },
    headerLogo2: {
        letterSpacing: 0,
        display: 'inline',
        color: '#2bc64f'
    }
}    


const NoWalletHeader = () => {
    let headerClass = 'header';
    if (window.location &&
        window.location.hash === '#/about' ||
        window.location.hash === '#/faq' ||
        window.location.hash === '#/tos'
    ) {
        headerClass += " header-big";
    }
    return (
        <Grid className={headerClass}>
            <Row className="container header-row">
                <Col xs={12}>
                    <Row style={styles.headerRow}>
                        <Col xs={6} style={{ padding: 0 }}>
                            <Link className="no-underline" to="/" onClick={() => {
                                if (window.location.hash && window.location.hash.length < 3) {
                                    window.location.reload();
                                }
                            }}>
                                <div className="no-wallet-header-logo">
                                    Eth2<div style={styles.headerLogo2}>Phone</div></div>
                            </Link>
                        </Col>
                        <Col style={styles.web3} xs={6}>
                            <div className="not-connected-button">
                                Not connected to Web3
                    <div style={styles.redDot}>&#9679;</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    );
}

export default NoWalletHeader;
