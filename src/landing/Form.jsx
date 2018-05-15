import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


class Form extends React.Component {


    render() {
        return (
            <div>
                <Row style={{margin: 0}}>
                    <Col xs={12} md={5} style={styles.column}>
                        <Row >
                            <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Join us</div>
                        </Row>
                    </Col>
                    <Col xs={12} md={5} style={styles.column}>
                        <Row >
                            <div style={{ fontSize: 36, fontFamily: 'SF Display Black' }}>Join us</div>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    row: { textAlign: 'center', margin: 40 },
    text: { color: '#0099ff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1, float: 'left', marginTop: 15, },
    textWhite: { color: '#fff', fontSize: 23, fontFamily: 'SF Display Bold', display: 'inline', lineHeight: 1, marginTop: 3, marginLeft: 5 },
    column: { display: 'inline-block', float: 'none', margin: 10 },
    gitColumn: { backgroundColor: '#0099ff', margin: 'auto', borderRadius: 10, paddingBottom: 2, paddingTop: 7 },
    logo: { marginLeft: 10 }
}

export default Form;