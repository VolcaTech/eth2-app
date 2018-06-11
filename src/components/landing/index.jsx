import React, { Component } from "react";
import Footer from './../../components/common/Footer';
import JoinUs from './JoinUs';
import WorksWith from './WorksWith';
import Form from './Form';
import Features from './Features';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


class e2pLanding extends React.Component {
    render() {
        return (
            <div>
                <Grid className="landing">
                    <Row>
                        <Col xs={12}>
                            <div className="landing-xs-container">
                                <Form />
                                <Features />
                                <WorksWith />
                                <JoinUs />
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <Footer />
            </div>
        );
    }
}

export default e2pLanding;