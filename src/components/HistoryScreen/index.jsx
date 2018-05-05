import React from "react";
import { connect } from 'react-redux';
import { getAllTransfers } from './../data/selectors';
import HistoryRow from './row';


class HistoryScreen extends React.Component {

    render() {
        return (
            <div>
              <div style={{height: 50}}></div> 
              <div>{this.props.transfers.map(transfer => <HistoryRow transfer={transfer} key={transfer.id}/>)}</div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        transfers: getAllTransfers(state)
    };
}


export default connect(mapStateToProps)(HistoryScreen);
