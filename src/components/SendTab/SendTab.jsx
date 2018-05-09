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
import { isValidPhoneNumber } from 'react-phone-number-input';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import HistoryScreen from './../HistoryScreen';


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
            disabled: false,
            currentSlide: 0,
            nextButtonStyle: {},
            backButtonStyle: styles.buttonHidden
        };
    }

    async _sendTransfer() {
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
            this.setState({ errorMessage: err.message });

            // enabling button
            this.setState({ disabled: false });
        }

    }


    _onSubmit() {
        // disabling button
        this.setState({ disabled: true });

        // sending transfer
        setTimeout(() => {  // let ui update
            this._sendTransfer();
        }, 0);
    };

    _renderForm() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CarouselProvider
                    naturalSlideWidth={375}
                    naturalSlideHeight={510}
                    totalSlides={2}
                    orientation='vertical'
                    currentSlide={this.state.currentSlide}
                >
                    <div style={this.state.backButtonStyle}>
                        <ButtonBack onClick={() => this.setState({ currentSlide: 0, backButtonStyle: styles.buttonHidden, nextButtonStyle: {} })} style={styles.backButton} ><i className="fas fa-angle-up" style={{ fontSize: 16, color: '#0099ff' }}></i></ButtonBack>
                        <div style={styles.backButtonTitle}>Back</div>
                    </div>
                    <Slider>
                        <Slide index={0}>
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
                                <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
                                    {this.state.errorMessage}
                                </div>
                                <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginBottom: 25 }}>
                                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                                </div>
                                <div style={{ marginBottom: 28 }}>
                                    <ButtonPrimary
                                        handleClick={this._onSubmit.bind(this)}
                                        buttonColor={e2pColors.blue}
                                        disabled={this.state.disabled}
                                    >
                                        Send
		                            </ButtonPrimary>
                                </div>
                                <div style={{}}>
                                    <CheckBox />
                                </div>
                            </div>
                        </Slide>
                        <Slide index={1}><HistoryScreen />
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

    render() {
        return (
            <div style={{ alignContent: 'center' }}>
                {this._renderForm()}
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
