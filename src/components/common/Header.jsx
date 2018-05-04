import React, { Component } from "react";
import AddressButton from './AddressButton';
import { Row, Col } from 'react-bootstrap';


class e2pHeader extends React.Component {
    
    render() {
        return (
            <Row style={{ height: 44, display: 'block', margin: 'auto', backgroundColor: 'white', alignItems: 'center', borderBottom: '1px solid #f5f5f5', borderTop: '2px solid #f5f5f5', marginBottom: 10 }}>
	      <Col xs={4}>
		<div style={{ width: 55, height: 29, fontFamily: "SF Display Black", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', letterSpacing: 3.1, textAlign: 'center', marginTop: 9 }}>
                  E2P
		</div>
	      </Col>
	      <Col xs={4}>	      
		<div style={{ marginTop: 13, textAlign: 'center' }}>
		  { this.props.address ? 
                      <AddressButton className={'addressButton'} address={this.props.address}/>
		      : null }
		</div>
	      </Col>
	      <Col xs={4}>	      	      
		<div style={{  right: 0, marginTop: 16, float: 'right', fontFamily: "SF Display Bold" }}>
                  <div style={{ float: "left", fontSize: 12 }}>
                    { this.props.balance }
                  </div>
                  <div style={{ float: "left", fontSize: 12, fontFamily: "SF Display Regular", fontWeight: 400, color: '#a9a9a9', marginLeft: 2 }}>
                    ETH
                  </div>
                </div>
		</Col>
            </Row>
        );
    }
}


export default e2pHeader;
