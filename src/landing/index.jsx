import React, { Component } from "react";
import Footer from './Footer';
import JoinUs from './JoinUs';
import WorksWith from './WorksWith';
import Form from './Form';
import Features from './Features';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';


class e2pLanding extends React.Component {
    render() {
        return (
            <Grid className="landing">
              <Row>
                <Col xs={12}>		  
		    <Form/>
		    <Features/>                                 
		    <WorksWith/>
		    <JoinUs/> 
		    <Footer/>
		</Col>		
              </Row>
	    </Grid>	    
        );
    }
}

export default e2pLanding;
