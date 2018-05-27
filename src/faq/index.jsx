import React, { Component } from "react";
import Faq from './Faq';
import { Grid, Row, Col } from 'react-bootstrap';
import './faq.css';






class e2pFaq extends React.Component {
    render() {
        return (
	    <div>
              <Grid className="landing">
		<Row>
                  <Col xs={12}>
		    <Faq/>
		  </Col>		
		</Row>
	      </Grid>
	      
	    </div>
        )
    }
}

// <Footer/>

export default e2pFaq;
