import React, { Component } from 'react';
//import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

export default class AddressForm extends Component {    
    
    changeOption(val) {
	console.log({val});
	//console.log(this.state.selectedOption);
	this.props.onAddressTypeChange(val);
    }
    
    render() {
	const component = this;
	return (
		<form>
		<div className="radio radio-warning">
		<input type="radio" value="option1" checked={component.props.selectedOption === 0}
	    onChange={() => component.changeOption(0)} disabled={component.props.disabled}/>
		
		<label>
		Metamask
	    </label>
		</div>
		<div className="radio radio-warning">
		<input type="radio" value="option2"
	    checked={component.props.selectedOption === 1}
	    onChange={() => component.changeOption(1)} />
		
		<label>
		Type Address
	    </label>
		</div>
		<div className="radio radio-warning">
		<input type="radio" value="option3"
	    checked={component.props.selectedOption === 2}
	    onChange={() => component.changeOption(2)} />
		
		<label>
		Generate Wallet
	    </label>
		</div>
		  </form>


	);
    }
}
	
