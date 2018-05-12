import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

class JoinUs extends React.Component {


    render() {
        return (
            <div style={styles.container}>
            <Row style={styles.row}>
              <Col xs={12} md={8}>
                <code>&lt;{'Col xs={12} md={8}'} /&gt;</code>
              </Col>
              <Col xs={6} md={4}>
                <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
              </Col>
            </Row>
          
            <Row style={styles.row}>
              <Col xs={6} md={4}>
                <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
              </Col>
              <Col xs={6} md={4}>
                <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
              </Col>
              <Col xsHidden md={4}>
                <code>&lt;{'Col xsHidden md={4}'} /&gt;</code>
              </Col>
            </Row>
          
            <Row className="align-bottom" style={styles.row}>
              <Col xs={6} xsOffset={6}>
                <code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code>
              </Col>
            </Row>
          </div>
        )
    }
}

const styles = {
    container: {height: 387, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'},
    row: {height: 56}
}

export default JoinUs;