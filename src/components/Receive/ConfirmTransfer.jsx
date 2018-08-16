import React, { Component } from 'react';
import ConfirmSmsForm from './ConfirmSmsForm';
import { SpinnerOrError, Loader } from './../common/Spinner';
import { TransferScreen } from '../Transfer';
import ConfirmPhoneScreen from './ConfirmPhoneScreen';
import ConfirmLinkScreen from './ConfirmLinkScreen';

class ConfirmTransfer extends Component {
    
    render() {
	// // show loader 
	// if (this.state.hideScreen) {
	//     return <Loader text="Sending SMS code..." textLeftMarginOffset={-35}/>;
	// }
	
	switch(this.props.transfer.status) {
	case 'completed':
	case 'cancelled':
	case 'depositing':	    
	case 'error':
	    this.props.transfer.receiverPhone = this.props.phone;
	    return (
		<TransferScreen {...this.props}/>
	    );
	}

	
        return (
	    <div>
	      { this.props.transitPrivateKey ?
		  <ConfirmLinkScreen {...this.props}/>  : 
		  <ConfirmPhoneScreen {...this.props}/>  }	      
	    </div>
        );
    }
}


export default ConfirmTransfer;
