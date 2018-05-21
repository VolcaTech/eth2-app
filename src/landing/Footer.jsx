import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


const styles = {
    container: {
	display: 'flex',
	alignContent: 'center' 
    },
    subcontainer: {
	paddingLeft: '8%',
	paddingBottom: '5%',
	paddingTop: '5%',
	paddingRight: '7%',
	backgroundColor: '#f5f5f5',
	
    },
    textLeft: {
	fontSize: 16,
	fontFamily: 'SF Display Regular',
	display: 'inline-block',
	verticalAlign: 'middle',
	float: 'none'
    },
    textRight: {
	display: 'flex',
	flexDirection: 'row',
	verticalAlign: 'middle',
	float: 'none',
	justifyContent: 'space-around',
	alignItems: 'center',
	fontFamily: 'SF Display Black',
	fontSize: 20,
	marginTop: 15
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

                <Row style={styles.subcontainer}>
                    <Col xs={12} md={6}>
                      <div style={styles.textLeft}>
			<span style={styles.bold}>Eth2Phone</span> serves the proof-of-concept reasons and is an aplha version. Please be aware that systems bugs are possible at that stage. We will appreciate if you inform us any of them to <a href="mailto:info@eth2.io" style={{...styles.link, ...styles.bold}}>info@eth2.io</a>
		      </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div style={styles.textRight}>
                          <Link to="/faq" style={styles.link}>
                            <div>FAQ</div>
                          </Link>
                          <a href="/tos" style={styles.link}>
                            <div>Terms of Use</div>
                          </a>
                          <a href="/policy" style={styles.link}>
                            <div>Privacy Policy</div>
                          </a>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}


export default Footer;
