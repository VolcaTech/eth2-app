import React, { Component } from 'react';
import TxInProgressModalContent from './TxInProgressModalContent';
import SentTxModalContent from './SentTxModalContent';


export default function Modal(props) {
    const component = this;
    return (
	    <div className="modal fade in" id="myModal" tabIndex="-1" role="dialog" aria-hidden="true" style={{display: (props.showModal ? "block": "none"), 'paddingLeft': "0px"}}>
	    <div className="modal-dialog">
	    <div className="modal-content">
            { props.sendingTx ? <TxInProgressModalContent /> : <SentTxModalContent {...props} />}
	    <div className="modal-footer">
	    { !props.sendingTx ? 
	      <button type="button" className="btn btn-default" onClick={() => props.closeModal()} >Close</button>
	      : 		<small> Please don't close the window, while transaction is not completed.</small> }
                   </div>
	        </div>	    
	    </div>
	</div>
	);
    }

