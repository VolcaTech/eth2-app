import React from "react";
import { connect } from 'react-redux';
import {  getTransfersForActiveAddress } from './../../data/selectors';
import HistoryRow from './row';
import { Row, Col } from 'react-bootstrap';


class HistoryScreen extends React.Component {

    render() {
	// if currently on transfer page
	let currentTransferId = null;
	if (this.props.match && this.props.match.params) {
	    currentTransferId = this.props.match.params.transferId;
	}
        return (
            <div style={{paddingTop: 0, height: 600, paddingBottom: 30}}>
	      <Row>
		<Col sm={4} smOffset={4}>		  
		  {this.props.transfers.map(transfer => <HistoryRow transfer={transfer}
									key={transfer.id}
								    currentTransferId={currentTransferId}/>)}
	    </Col>
	    </Row>
	    
            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log({state});
    return {
        transfers: getTransfersForActiveAddress(state)
    };
}


export default connect(mapStateToProps)(HistoryScreen);
