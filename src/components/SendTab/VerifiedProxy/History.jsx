import React, { Component } from 'react';
import eth2phoneApi from "../../../apis/eth2phone-api";

class HistoryRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
	    pendingCancel: false,
	    cancelled: false
        };
    }
    
    cancel(transferId) {
	const component = this;
	this.setState({pendingCancel: true});
	eth2phoneApi.cancelTransfer(transferId).then((res) => {
	    this.setState({pendingCancel: false, cancelled: true});
	});
    }
    
    render() {
	const component = this;
        return (
            <tr>
                <td><span className="c-accent">{this.props.data.id}</span></td>
                <td><span className="c-accent">{this.props.data.amount}</span></td>
                <td>
		  {(this.props.data.status === 0 && !this.state.pendingCancel && !this.state.cancelled) ?
                    <a className="btn btn-xs btn-default active" onClick={()=>this.cancel(this.props.data.id)}>Cancel</a>
		     : ""
		 }
		 { this.state.pendingCancel ? <div className="loader-spin"></div>: "" }
		 { this.state.cancelled ? <div style={{color: "blue"}}> CANCELLED </div>: "" }	    

		</td>		
	    </tr>
        );
    }
}


function HistoryTable({rows, isLoading}) {
    
    const component = this;
	
    
    if (isLoading) {
	return  ( <div className="loader-spin"> </div>);
    }

    if (rows.length === 0) {
	return  ( <div> No transfers yet.</div>);
    }
    
    return (
	<div className="m-t-md">
	  <table className="table-responsive table-hover table-striped">
	    <thead>
	      <tr>
		<th>
		  Transfer id
		</th>
		<th>
		  Amount
		</th>
		<th> </th>
		
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
    );    
}



export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isLoading: true,
            showstatus: 0
        };
    }

    changeShowStatus(status) {
        this.setState({ showstatus: status });
    }
    
    componentDidMount() {
	this._fetchTransfers();
    }

    _fetchTransfers() {
        const component = this;
	setTimeout(function() {
            eth2phoneApi.getSentTransfers().then(function (data) {
		component.setState({ rows: data, isLoading: false });
	    }, 2000);
        });
    }
    
    componentWillReceiveProps(newProps) {
	if (newProps.updateCounter > this.props.updateCounter) {
	    this._fetchTransfers();
	}
    }

    
    render() {
        const component = this;
        const filteredRows = this.state.rows.filter(function (rowData) {
            return (rowData.status === component.state.showstatus);
        });
        const rows = filteredRows.map(function (rowData, index) {
            return (
                <HistoryRow data={rowData} key={index} />
            );
        });

	
        return (
            <div className="m-t-lg col-sm-12">
                <div>
                    <strong className="c-white"> Sent Transfers </strong>
                    <a className={component.state.showstatus === 0 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(0)}>Awaiting receiving</a> 
                    <a className={component.state.showstatus === 1 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(1)}>Completed</a> 
                    <a className={component.state.showstatus === 2 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(2)}>Cancelled</a></div>
		<HistoryTable rows={rows} isLoading={this.state.isLoading}/>
            </div>
        );
    }
}
