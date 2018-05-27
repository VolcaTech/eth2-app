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
			  <RetinaImage style={{ verticalAlign: 'baseline'}} src="https://eth2.io/images/good.png" />
			  <div>
                            Integration &<br/> Partnership
			  </div>
			</div>
                      </Col>
		  
                      <Col xs={6} sm={3}>
			<RetinaImage style={styles.logo} src="https://eth2.io/images/cipher.png" />
			<div className="wallet-name">Cipher</div>
                      </Col>
                      <Col xs={6} sm={3}>
			<RetinaImage style={styles.logo} src="https://eth2.io/images/toshi.png" />
			<div className="wallet-name">Toshi</div>
                      </Col>		    
		    </Row>
		  </Col>
                </Row>
            </div>
        )
    }
}


export default WorksWith;
