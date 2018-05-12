import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


class e2pLanding extends React.Component {


    render() {
        return (
            <div style={{  display: 'flex', alignContent: 'center'}}>
            
            <Row style={styles.container}>
            <Col xs={12} md={6}>
                <div style={styles.textLeft}><div style={{ fontFamily: 'SF Display Bold', display: 'inline' }}>Eth2Phone</div>&nbsp; serves the proof-of-concept reasons and is an aplha version. Please be aware that systems bugs are possible at that stage. We will appreciate if you inform us any of them to eth2phone@gmail.com</div>
            </Col>
            <Col xs={12} md={6}>    
                <div style={styles.textRight}>
                    <div>FAQ</div>
                    <div>Terms of Use</div>
                    <div>Privacy Policy</div>
                </div>
            </Col>
            </Row>
            </div>

        )
    }
}

const styles = {
    container: {paddingLeft: '8%', paddingBottom: '5%', paddingTop: '5%', paddingRight: '7%', backgroundColor: '#f5f5f5'},
    textLeft: {  fontSize: 16, fontFamily: 'SF Display Regular', display: 'inline-block', verticalAlign: 'middle', float: 'none' },
    textRight: {  display: 'flex', flexDirection: 'row', verticalAlign: 'middle', float: 'none', justifyContent: 'space-around', alignItems: 'center', fontFamily: 'SF Display Black', fontSize: 20, marginTop: 15}

}

export default e2pLanding;