import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";


class HistoryRow extends Component {
    render() {
        return (
            <tr>
                <td><span className="c-accent">{this.props.data.amount}</span></td>
                <td><span className="c-accent">{this.props.data.txHash}</span></td>
                <td><span className="c-accent">{this.props.data.phone}</span></td>
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
	const address = web3Api.getAddress();
        serverApi.getSentTransfers(address).then(function (data) {
            component.setState({ rows: data, isLoading: false });
        });
    }
    
    componentWillReceiveProps(newProps) {
	console.log("<history /> will receive new props: ", newProps);
	if (newProps.updateCounter > this.props.updateCounter) {
	    console.log("<history /> - fetching new counter");
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
                              <th>
		                Amount
                              </th>
                              <th>
                                Transaction hash
                              </th>
                              <th>
                                Phone number
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
