import React, { Component } from "react";
import AddressButton from './AddressButton';


class e2pHeader extends React.Component {
    

    render() {
        return (
            <div style={{ width: 375, height: 44, display: 'block', margin: 'auto', backgroundColor: 'white', alignItems: 'center', position: 'relative', borderBottom: '1px solid #f5f5f5', borderTop: '2px solid #f5f5f5', marginBottom: 10 }}>
                <div style={{ width: 55, height: 29, fontSize: 24, position: 'absolute', textTransform: 'uppercase', letterSpacing: 3.1, textAlign: 'center', marginTop: 9, marginLeft: 15 }}>
                    E2P
                </div>
                <div style={{ position: 'absolute', marginLeft: 137, marginTop: 13 }}>
                    <AddressButton className={'addressButton'} address={this.props.address}/>
                </div>
                <div style={{ position: 'absolute', right: 0, marginTop: 16, marginRight: 15 }}>
                    <div style={{ float: "left", fontSize: 12 }}>
                        14.0234
                    </div>
                    <div style={{ float: "left", fontSize: 12, color: '#a9a9a9', marginLeft: 2 }}>
                        ETH
                    </div>
                </div>
            </div>
        );
    }
}


export default e2pHeader;
