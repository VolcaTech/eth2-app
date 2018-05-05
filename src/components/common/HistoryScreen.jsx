import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getAllTransfers } from './../../data/selectors'


class HistoryScreen extends React.Component {

    _renderStatus(status){
    
        console.log("STATUS: ", status)
        switch (status) {
            case "sent":
                return (
                    <CancelButton>Cancel</CancelButton>)
                    break;
            case "completed":
                return (
                    <div style={{ position: 'inline-block', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <div style={{ textAlign: 'center', float: 'right', fontSize: 18, color: '#33aeff', marginRight: 20 }}>{status}</div>
                    <div style={{ width: 18, height: 18, border: '2px solid #33aeff', color: '#33aeff', borderRadius: 9, textAlign: 'center', lineHeight: 1, fontSize: 13, paddingTop: 1 }}>i</div>
                </div>
                
            )
            break;
            case "cancelled":
            return (
                <div style={{ position: 'inline-block', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <div style={{ textAlign: 'center', float: 'right', fontSize: 18, color: '#f04234', marginRight: 20 }}>{status}</div>
                <div style={{ width: 18, height: 18, border: '2px solid #33aeff', color: '#33aeff', borderRadius: 9, textAlign: 'center', lineHeight: 1, fontSize: 13, paddingTop: 1 }}>i</div>
            </div>
        )
        break;
            case "pending":
            return (
                <div style={{ position: 'inline-block', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <div style={{ textAlign: 'center', float: 'right', fontSize: 18, fontFamily: "SF Display Black", color: '#33aeff', opacity: 0.4, marginRight: 20 }}>{status}</div>
            </div>
        )
        break;
        }
    
    }
    


    render() {
        return (
            <div>
                <div style={{height: 50}}></div> 
            <div>{this.props.transfers.map(transfer => {
                return <HistoryRow amount={transfer.amount} receiverPhone={transfer.receiverPhone} status={transfer.status} renderStatus={() => this._renderStatus(transfer.status)}/>
            })}</div>
            </div>
        );
    }
}

const CancelButton = () => {
    return (
        <Button style={{
            width: 84,
            height: 24,
            borderRadius: 10,
            borderColor: '#f04234',
            backgroundColor: '#f04234',
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
            padding: 0
        }}>
        Cancel
        </Button>
    )
}


 const HistoryRow = ({amount, receiverPhone, status, renderStatus}) => {
     return (
        <div style={{width: 334, height: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 'auto', marginBottom: 25}}>
        <div style={{ position: 'inline-block', float: 'left', fontSize: 12, fontFamily: 'SF Display Bold', textTransform: 'uppercase',}}>{amount} ETH</div>
        <div style={{ position: 'inline-block', textAlign: 'center', fontSize: 12, fontFamily: 'SF Display Regular', textTransform: 'uppercase', opacity: 0.4}}>{receiverPhone}</div>
       {renderStatus()}
        
        </div>                    
         
     )
 }

function mapStateToProps(state) {
    return {
        transfers: getAllTransfers(state)
    };
}


export default connect(mapStateToProps)(HistoryScreen);