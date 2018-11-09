import React, { Component } from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import RetinaImage from 'react-retina-image';

const styles = {
    row: {
	textAlign: 'center',
    },

    logo: { marginLeft: 10, height: 117, }
}


class WorksWith extends React.Component {


    render() {
        return (
            <div className="wallets-block">
              <div className="title">Works smooth with</div>
		
                <Row style={styles.row}>
		  <Col sm={8} smOffset={2} xs={12}>
		    <Row className="wallets-row">
                      <Col xs={6} sm={3}>
			<RetinaImage style={styles.logo} src="https://eth2.io/images/metamask.png" />
			<div className="wallet-name">Metamask</div>
                      </Col>
                      <Col xs={6} sm={3} className="second-col">
			<RetinaImage style={styles.logo} src="https://eth2.io/images/trust.png" />
			<div className="wallet-name">Trust</div>
			<div className="recommended-wallet">
			  <RetinaImage style={{ verticalAlign: 'baseline', marginBottom: -5}} src="https://eth2.io/images/good.png" />
			  <div className="recommended-text-block">
                            <div>Integration &</div>
			    <div>Partnership</div>
			  </div>
			</div>
                      </Col>
		      <Col xs={6} sm={3}>
			<RetinaImage style={styles.logo} src="https://eth2.io/images/toshi.png" />
			<div className="wallet-name">Toshi</div>
			<div className="recommended-wallet recommended-wallet-blue">
			  <RetinaImage style={{ verticalAlign: 'baseline', marginBottom: -5}} src="https://eth2.io/images/featured_icon_blue.png" />
			  <div className="recommended-text-block">
                            <div>Featured in</div>
			    <div>DApp store</div>
			  </div>
			</div>
			
                      </Col>
		        <Col xs={6} sm={3}>
			  <RetinaImage style={styles.logo} src="https://eth2.io/images/token_pocket.png" />
			  <div className="wallet-name">Token Pocket</div>
			</Col>

		    </Row>
		  </Col>
                </Row>
            </div>
        )
    }
}


export default WorksWith;
