import React, { Component } from 'react'
import QuickInboxList from './QuickInboxList'

export default class QuichInboxTab extends Component {

    render() {
        return (
            <div>
                <div>
                    <strong className="c-white">Only transactions sent to quick inbox appear here<br />Assets wiil be received to your currentrly connected wallet</strong>
                </div>
                <br />
                <div>
                    <QuickInboxList />
                </div>
            </div>
        )
    }
}