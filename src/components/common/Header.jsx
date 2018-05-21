import React, { Component } from "react";
import AddressButton from './AddressButton';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


class e2pHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            showDetails: false
        };
    }

    _openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    render() {

        const balance = this.props.balance < 1 ? this.props.balance.toFixed(4) : this.props.balance.toFixed(2);
        return (
	      <Grid>
                <Row>
                    <Col xs={12} sm={8} smOffset={2}>

                        <Row style={{ height: 44, display: 'block', margin: 'auto', backgroundColor: 'white', alignItems: 'center', borderTop: '2px solid #f5f5f5', marginBottom: 10 }}>
                          <Col xs={6} style={{padding:0}}>
                            <Link style={{ textDecoration: 'none' }} to="/" onClick={() => {
				  if (window.location.hash && window.location.hash.length < 3) {window.location.reload();}}}>
                                    <div style={{ width: 55, height: 29, fontFamily: "SF Display Black", color: "black", fontSize: 24, letterSpacing: 1, textAlign: 'center', marginTop: 9 }}>
                                        Eth2<div style={{ letterSpacing: 0, display: 'inline', color: '#2bc64f' }}>Phone</div></div>
                                </Link>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }} xs={6}>
                                <div style={{ marginTop: 13, marginRight: 10, textAlign: 'center' }}>

                                    <AddressButton
                                        className={'addressButton'}
                                        active={this.state.showDetails}
                                        color={(this.props.networkId == "1" ? "#2bc64f" : "orange")}
                                        networkName={this.props.networkName}
                                        networkId={this.props.networkId}
                                        handleClick={() => this.setState({
                                            height: this.state.showDetails ? 0 : 137,
                                            showDetails: !this.state.showDetails
                                        })}
                                        address={this.props.address} />
                                </div>

                                <div style={{ right: 0, marginTop: 16, float: 'right', fontFamily: "SF Display Bold" }}>
                                    <div style={{ float: "left", fontSize: 12 }}>
                                        {balance}
                                    </div>
                                    <div style={{ float: "left", fontSize: 12, fontFamily: "SF Display Regular", fontWeight: 400, color: '#a9a9a9', marginLeft: 2 }}>
                                        ETH
			  </div>
                                </div>
                            </Col>
                        </Row>
                        <HeaderDetails
                            address={this.props.address}
                            contract={this.props.contractAddress}
                            networkName={this.props.networkName}
                            networkId={this.props.networkId}
                            height={this.state.height}
                            balance={this.props.balance} />
                    </Col>
                </Row>
	    </Grid>

        );
    }
}

const HeaderDetails = ({ height, address, contract, networkName, networkId, balance }) => {
    return (
        <div style={{ height: height, width: "100%", overflow: 'hidden', display: 'flex', justifyContent: 'space-between', boxShadow: '0px 30px 30px -35px rgba(0, 0, 0, 0.1)', alignItems: 'left', flexDirection: 'column', margin: "auto", textAlign: "left", marginBottom: 15 }}>
            <div style={{marginTop: 8}}>
                <div style={styles.headerDetailsGrey}>
                    ADDRESS
	      </div>
                <div style={styles.headerDetailsGreen}>
                    {address}
                </div>
            </div>
            <div>
                <div style={styles.headerDetailsGrey}>
                    CONTRACT
	      </div>
                <div style={styles.headerDetailsBlack}>
                    {contract}
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '72%', justifyContent: 'space-between', marginBottom: 17}}>
            <div>
                <div style={styles.headerDetailsGrey}>
                    NETWORK
              </div>
                <div style={styles.headerDetailsBlack}>
                    {networkName}
                    <i style={{ color: (networkId == '1' ? '#2bc64f' : 'orange'), fontSize: 8, marginLeft: 5, paddingTop: 4 }} className="fa fa-circle"></i>
                </div>
            </div>
            <div>
                <div style={styles.headerDetailsGrey}>
                    BALANCE
              </div>
                <div style={styles.headerDetailsBlack}>
                {balance} <div style={styles.headerDetailsGrey}>&nbsp;ETH</div>
                </div>
            </div>
            </div>
        </div>
    )
}

const styles = {
    headerDetailsBlack: { display: 'flex', flexDirection: 'row', fontSize: 14, fontFamily: "SF Display Bold", lineHeight: 1.1, marginRight: 2 },
    headerDetailsGrey: { fontSize: 14, fontFamily: "SF Display Bold", color: '#a9a9a9', lineHeight: 1.1 },
    headerDetailsGreen: { fontSize: 14, fontFamily: "SF Display Bold", color: "#2bc64f", lineHeight: 1.1 }


}


export default e2pHeader;
