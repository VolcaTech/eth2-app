import React from "react";
import { connect } from 'react-redux';
import {  getTransfersForActiveAddress } from './../../data/selectors';
import HistoryRow from './row';


class HistoryScreen extends React.Component {

    render() {
        return (
            <div style={{paddingTop: 50}}>
              {this.props.transfers.map(transfer => <HistoryRow transfer={transfer} key={transfer.id}/>)}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        transfers: getTransfersForActiveAddress(state)
    };
}


export default connect(mapStateToProps)(HistoryScreen);
