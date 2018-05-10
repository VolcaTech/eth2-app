import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import { parse, format, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Spinner from './../common/Spinner';
import HistoryScreen from './../HistoryScreen';


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
	    fetching: false,
            currentSlide: 0,
            nextButtonStyle: {},
            backButtonStyle: styles.buttonHidden
        };
    }

    async _sendTransfer(phone, phoneCode) {
        try {
            // hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
            const phoneCode = this.phoneNumber.state.selectedCountry.dialCode;
            let phone = this.phoneNumber.state.formattedNumber;
            // remove formatting from phone number
            phone = "+" + phone.replace(/\D+/g, "");

            // check amount
            if (this.state.amount <= 0) {
                throw new Error("Amount should be more than 0");
            };

            // check that phone number is valid
            if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
                throw new Error("Phone number is invalid");
            };


            const transfer = await this.props.sendTransfer({
                amount: this.state.amount,
                phone,
                phoneCode
            });
            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log(err);
	    let errorMsg = err.message;
	    if (err.isOperational) errorMsg = "User denied transaction";
            this.setState({fetching: false, errorMessage: errorMsg });	    
        }

    }


    _onSubmit() {

        // hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
        let phone = this.phoneNumber.state.formattedNumber;

        // remove formatting from phone number
        phone = "+" + phone.replace(/\D+/g, "");

	const formatter = new asYouType();
	formatter.input(phone);
	
	const phoneCode = formatter.country_phone_code;
	
        // check amount
        if (this.state.amount <= 0) {
	    this.setState({fetching:false, errorMessage: "Amount should be more than 0"});	    
	    return;
        };
	
        // check that phone number is valid
        if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
	    this.setState({fetching:false, errorMessage: "Phone number is invalid"});
	    return;
        };

	// disabling button
	this.setState({fetching: true});
	
	// sending transfer
	setTimeout(() => {  // let ui update
            this._sendTransfer(phone, phoneCode);
	}, 100);
    };

    _renderForm() {
       return (	
	       <div>
	       <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>
	       <div>
	       <NumberInput
           onChange={({ target }) => {
               const amount = target.value;
               this.setState({ amount });
           }}
           disabled={false}
           fontColor='black'
           backgroundColor='#fff'
           placeholder="amount (ETH)"
               />
	   
	   </div>
	       <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginTop: 28, marginBottom: 28 }}>
               <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
	   </div>
	   
	       <div>
               <ButtonPrimary
	   handleClick={this._onSubmit.bind(this)}
	   buttonColor={e2pColors.blue}
	   disabled={this.state.fetching}
	       >		    
           Send
	   </ButtonPrimary>
	       <div style={{ height: 28, textAlign: 'center'}}>
	   { this.state.fetching ?
	     <div style={{marginTop:10}}>
	     <Spinner/>
	     </div>:
	     <span style={{color: '#ef4234', fontSize: 9}}>{this.state.errorMessage}</span>
	   }		
	   </div>	
	   </div>
	   
	       <div style={{}}>
               <CheckBox />
	   </div>
	   </div> 
       );
    }

    render() {
        return (
	    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
              <CarouselProvider
                 naturalSlideWidth={window.innerWidth}
                 naturalSlideHeight={window.innerHeight - 150}
                 totalSlides={2}
                 orientation='vertical'
                 currentSlide={this.state.currentSlide}
		 touchEnabled={false}
		 dragEnabled={false}
                 >

		<div style={this.state.backButtonStyle}>
                  <ButtonBack onClick={() => this.setState({ currentSlide: 0, backButtonStyle: styles.buttonHidden, nextButtonStyle: {} })} style={styles.backButton} ><i className="fas fa-angle-up" style={{ fontSize: 16, color: '#0099ff' }}></i></ButtonBack>
		  <div style={styles.backButtonTitle}>Back</div>
		</div>

		<Slider>
		  <Slide index={0}>			
		    {this._renderForm()}
		  </Slide>
		  <Slide index={1}>
		    <HistoryScreen />
		  </Slide>		  
		</Slider>
		
		<div style={this.state.nextButtonStyle}>
		  <div style={styles.nextButtonTitle}>Transaction history</div>
		  <ButtonNext onClick={() => this.setState({ currentSlide: 1, backButtonStyle: { marginBottom: 15 }, nextButtonStyle: styles.buttonHidden })} style={styles.nextButton}><i className="fas fa-angle-down" style={{ fontSize: 16, marginTop: 3, color: '#0099ff' }}></i></ButtonNext>
		</div>

		
	      </CarouselProvider>
	    </div>
        );
    }
}

const styles = {
    backButton: { display: 'block', margin: 'auto', width: 23, height: 23, borderRadius: 12, borderWidth: 0, backgroundColor: '#f5f5f5', textAlign: 'center', marginTop: 14 },
    nextButton: { display: 'block', margin: 'auto', width: 23, height: 23, borderRadius: 12, borderWidth: 0, backgroundColor: '#f5f5f5', textAlign: 'center', marginBottom: 24 },
    backButtonTitle: { width: 250, height: 15, margin: 'auto', marginTop: 15, marginBottom: 55, display: 'block', textAlign: 'center', fontSize: 12, fontFamily: 'SF Display Bold', opacity: 0.4 },
    nextButtonTitle: { width: 250, height: 15, margin: 'auto', marginBottom: 15, display: 'block', textAlign: 'center', fontSize: 12, fontFamily: 'SF Display Bold', opacity: 0.4 },
    buttonHidden: { width: 0, height: 0, overflow: 'hidden' },
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);
