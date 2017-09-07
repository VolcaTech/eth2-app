import React, { Component } from 'react';
import verifiedProxyContractApi from "../../../utils/verified-proxy-contract-api";
import web3Api from "../../../utils/web3-common-api";


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
	verifiedProxyContractApi.cancel(transferId).then((res) => {
	    this.setState({pendingCancel: false, cancelled: true});
	    console.log({res});
	    //alert("Transfer cancelled!");
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
            verifiedProxyContractApi.getSentTransfers().then(function (data) {
		component.setState({ rows: data, isLoading: false });
	    }, 2000);
        });
    }
    
    componentWillReceiveProps(newProps) {
	//console.log("<history /> will receive new props: ", newProps);
	if (newProps.updateCounter > this.props.updateCounter) {
	    //console.log("<history /> - fetching new counter");
	    this._fetchTransfers();
	}
    }

    
    render() {
        const component = this;
        const filteredRows = this.state.rows.filter(function (rowData) {
            return (rowData.status === component.state.showstatus);
        });
        const rows = filteredRows.map(function (rowData, index) {
	    //console.log({rowData});
            return (
                <HistoryRow data={rowData} key={index} />
            );
        });
	
        const loaderHtml = (
            <div className="loader-spin">
            </div>
        );

        return (
            <div className="m-t-lg col-sm-12">
                <div>
                    <strong className="c-white"> Sent Transfers </strong>
                    <a className={component.state.showstatus === 0 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(0)}>Pending</a> 
                    <a className={component.state.showstatus === 1 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(1)}>Completed</a> 
                    <a className={component.state.showstatus === 2 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(2)}>Cancelled</a></div>
                <div>
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                <th style={{paddingLeft:"0px"}}>
                Transfer id
            </th>
		<th>
		                Amount
                              </th>

                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                   {this.state.isLoading ? loaderHtml : ""}
            {(!this.state.isLoading && rows.length === 0 )  ? "No transfers yet" : ""}
                </div>
            </div>
        );
    }
}
