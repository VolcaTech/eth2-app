import React, { Component } from 'react'
import serverApi from "../quid-server-api.js"

class HistoryRow extends Component {
    render() {
        return (

            <tr>
                <td><span className="c-accent">{this.props.data.amount}</span></td>
                <td><span className="c-accent">{this.props.data.txHash}</span></td>
                <td><span className="c-accent">{this.props.data.phone}</span></td>
            </tr>
        )
    }
}

export default class SendToPhoneHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isLoading: true,
            showstatus: 0
        };
    }

    changeShowStatus(status) {
        this.setState({ showstatus: status })
    }

    componentDidMount() {
        const component = this
        //console.log("step11", serverApi)
        serverApi.getSentTransfers().then(function (data) {
            console.log("settign data; ", data)
            component.setState({ rows: data, isLoading: false })
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
            <div style={{marginTop: '100px'}}>
                <hr/>
                <div>
                    <strong className="c-white">History </strong>
                    <a className={component.state.showstatus === 0 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(0)}>Pending</a> 
                    <a className={component.state.showstatus === 1 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(1)}>Completed</a> 
                    <a className={component.state.showstatus === 2 ? "btn btn-xs btn-accent active" : "btn btn-xs btn-accent"}onClick={()=>this.changeShowStatus(2)}>Cancelled</a></div>
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
                                    Phone number
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