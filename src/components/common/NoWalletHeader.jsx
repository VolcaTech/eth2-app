import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';


const styles = {
    notConnectedButton: {
        width: 145,
        height: 22,
        borderRadius: 6,
        marginTop: 15,
        textAlign: 'center',
        border: '2px solid #999999',
        fontFamily: "SF Display Regular",
        fontSize: 12,
        color: '#999999',
        padding: 0,
        paddingTop: 1,
        paddingLeft: 5
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
    return (
        <Grid className="header header big">
          <Row className="header-row">
            <Col xs={12}>
              <Row style={styles.headerRow}>
                <Col xs={6} style={{ padding: 0 }}>
                  <div style={styles.headerLogo1}>
                    Eth2<div style={styles.headerLogo2}>Phone</div></div>
                </Col>
                <Col style={styles.web3} xs={6}>
                  <div style={styles.notConnectedButton}>
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
