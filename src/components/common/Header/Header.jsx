import React, { Component } from "react";
import AddressButton from './AddressButton';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import Eth2PhoneLogo from './logo';
import HeaderDetails from './HeaderDetails';


class e2pHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            showDetails: false
        };
    }

    _toggleHeaderDetails() {
        this.setState({
            height: this.state.showDetails ? 0 : 137,
            showDetails: !this.state.showDetails
        });
    }

    render() {
        let headerClass = 'header';
        let balance;
        if (window.location &&
            window.location.hash === '#/about' ||
            window.location.hash === '#/faq' ||
            window.location.hash === '#/tos'
        ) {
            headerClass += " header-big";
        }
        balance = this.props.balance < 1 ? this.props.balance.toFixed(3) : this.props.balance.toFixed(2);
        if (this.props.balance === 0) balance = "0"
        return (
            <Grid className={headerClass}>
                <Row className="header-row">
                    <Col xs={5} style={{ padding: 0 }}>
                        <Eth2PhoneLogo />
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }} xs={7}>

                        <AddressButton
                            className='addressButton'
                            active={this.state.showDetails}
                            color={(this.props.networkId == "1" ? "#2bc64f" : "orange")}
                            networkName={this.props.networkName}
                            networkId={this.props.networkId}
                            handleClick={this._toggleHeaderDetails.bind(this)}
                            address={this.props.address} />

                        <div className="balance">
                            <span>
                                {balance}
                            </span>
                            <span
                                className="hidden-iphone5"
                                style={{ fontFamily: "SF Display Regular", color: '#a9a9a9' }}> ETH
		    </span>
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
            </Grid>

        );
    }
}

export default e2pHeader;
