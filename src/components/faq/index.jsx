import React, { Component } from "react";
import Faq from './Faq';
import Footer from './../../components/common/Footer';
import { Grid, Row, Col } from 'react-bootstrap';
import './faq.css';


class e2pFaq extends React.Component {
    render() {
        return (
            <div>
                <Grid className="landing">
                    <Row>
                        <Col xs={12}>
                            <div className="landing-xs-container">
                                <Faq {...this.props} />
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <Footer />
            </div>
        )
    }
}

export default e2pFaq;