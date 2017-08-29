import React, { Component } from 'react'
import serverApi from "../quid-server-api.js"

class ReceiveButton extends Component {
    render() {
        return (
            <a className="btn btn-xs btn-accent">Receive</a>
        )
    }

}

class HistoryRow extends Component {
    
    render() {
        

        return (

            <tr>
                <td><span className="c-accent">{this.props.data.amount}</span></td>
                <td><span className="c-accent">{this.props.data.txHash}</span></td>
                <td><span className="c-accent">{this.props.data.senderAddress}</span></td>
                <td><span className="c-accent">{this.props.data.date}</span></td>
                {this.props.data.status === "pending" ? <ReceiveButton/> : ""}
            </tr>
        )
    }
}

export default class QuickInboxList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isLoading: true,
            showstatus: "cancelled"
        };
    }

    changeShowStatus(status) {
        this.setState({ showstatus: status })
    }

    componentDidMount() {
        const component = this
        //console.log("step11", serverApi)
        serverApi.getSentTransfers().then(function (data) {
            component.setState({ rows: data.result, isLoading: false })
        })
        //console.log("step22")
    }





    render() {

        const component = this
        const filteredRows = this.state.rows.filter(function (rowData) {
            return (rowData.status === component.state.showstatus)
        })
        const rows = filteredRows.map(function (rowData, index) {
            return (
                <HistoryRow data={rowData} key={index} />
            )
        })

        const loaderHtml = (
            <div className="loader-spin">
            </div>

        )

        return (
            <div>
                <div>
                    <a className={component.state.showstatus === "pending" ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus('pending')}>Pending</a> 
                    <a className={component.state.showstatus === "received" ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus('received')}>Completed</a> 
                    <a className={component.state.showstatus === "cancelled" ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus('cancelled')}>Cancelled</a></div>
                <br />
                <div>
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Amount
                            </th>
                                <th>
                                    Transaction hash
                            </th>
                                <th>
                                    Sender address
                            </th>
                            <th>
                                Date
                                </th>
                            </tr>
                        </thead>
                        {this.state.isLoading ? loaderHtml : ""}
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}