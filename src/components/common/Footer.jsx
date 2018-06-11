import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


const styles = {
    container: {
        display: 'flex',
        alignContent: 'center',
    },
    textLeft: {
        fontSize: 16,
        fontFamily: 'SF Display Regular',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none'
    },
    textRight: {
    },
    bold: {
        fontFamily: 'SF Display Bold',
        display: 'inline'
    },
    link: {
        color: "#000"
    }
}


class Footer extends React.Component {


    render() {
        return (
            <div style={styles.container}>
                <div className="footer-subcontainer">
                    <Col xs={12} md={6}>
                        <div style={styles.textLeft} className="footer-text">
			  <span style={styles.bold}>© 2018 Eth2Phone</span> is in beta. Please be aware that some bugs are possible at that stage. We will appreciate if you inform us any of them to <a href="mailto:info@eth2.io" className="link">hi@eth2.io</a>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="footer-links">
                            <Link to="/faq" className="footer-links-text">
                                <div>FAQ</div>
                            </Link>
                            <Link to="/tos" className="footer-links-text">
                                <div>Terms of Use</div>
                            </Link>
                            <Link to="/privacy" className="footer-links-text">
                                <div>Privacy Policy</div>
                            </Link>
                        </div>
                    </Col>
                </div>
            </div>

        )
    }
}


export default Footer;
