import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawTransfer } from '../../actions/transfer';
import { sendSmsToPhone } from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import Timer from '../common/Timer';
import PropTypes from 'prop-types';
import { SpinnerOrError, Loader } from './../common/Spinner';
import { parse, format, asYouType } from 'libphonenumber-js';


const Countdown = (props, context) => {
    const d = new Date(context.remaining);
    const { seconds } = {
        seconds: d.getUTCSeconds(),
    };
    return (
        <span style={{fontFamily: 'SF Display Bold'}}>{seconds}</span>
    );
};

Countdown.contextTypes = {
    remaining: PropTypes.number,
};


const styles = {
    container: { alignItems: 'center' },
    titleContainer: {
	textAlign: 'center',	
	marginTop: 84,
	marginBottom: 12
    },
    title:{
	fontSize: 24,
	fontFamily: 'SF Display Bold'
    },
    phone: {
	fontFamily: 'SF Display Bold'
    },
    instructions: {
	height: 17,
	display: 'block',
	margin: 'auto',
	textAlign: 'center',
	fontSize: 14,
	fontFamily: 'SF Display Regular',
	marginBottom: 53
    },
    numberInput: {
	width: '78%',
	margin: 'auto',
	marginBottom: 21
    },
    button: {
	width: '78%',
	margin: 'auto'
    },
    sendAgainContainer: {
	height: 28,
	margin: 'auto',
	marginBottom: 46,
	marginTop: 20,
	textAlign: 'center',
	fontSize: 13,
	fontFamily: 'SF Display Regular'
    },
    sendAgain: {
	fontFamily: 'SF Display Bold'
    },
    sendAgainLink: {
	fontFamily: 'SF Display Bold',
	color: '#0099ff'
    },
    timer: { display: 'inline-block' },
    blue: '#0099ff',
    green: '#2bc64f'    
}


class ConfirmSmsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smsCode: "",
            timer: true,
            smsButtonDisabled: true,
            fetching: false,
            errorMessage: ""
        };
    }

    async _confirmSmsAndWithdrawTransfer() {
        try {
            const withdrawParams = {
                phone: this.props.phone,
                phoneCode: this.props.phoneCode,
                secretCode: this.props.secretCode,
                smsCode: this.state.smsCode
            };

            const transfer = await this.props.withdrawTransfer(withdrawParams);

            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log({ err });
            this.setState({ errorMessage: err.message, fetching: false });
        }
    }

    _onSubmit() {
        this.setState({ fetching: true });
        setTimeout(async () => {
            this._confirmSmsAndWithdrawTransfer();
        }, 100); // let UI update
    }

    _sendSmsAgain() {
        this.setState({ timer: false, smsButtonDisabled: true, fetching: true, errorMessage: "" });
        setTimeout(async () => {
            try {
                const result = await sendSmsToPhone({
                    phone: this.props.phone,
                    secretCode: this.props.secretCode,
                    phoneCode: this.props.phoneCode
                });
                this.setState({ fetching: false, timer: true });
            } catch (err) {
                this.setState({ errorMessage: err.message, fetching: false, timer: true });
            }
        }, 100);
    }


    render() {

        return (
            <div style={styles.container}>
	      <div style={styles.titleContainer}>
		<span style={styles.title}>Verify your phone number</span>
	      </div>
	      
              <div style={styles.instructions}>
		We sent you an SMS with a confirmation<br/>
		code to: <span style={styles.phone}>{this.props.phoneFormatted}</span>
	      </div>
	      <div style={styles.numberInput} className={this.state.errorMessage ? "errorInput" : null}>
                <NumberInput
		   type='tel'
		   placeholder="Code from SMS"
		   error={this.state.errorMessage}
		   onChange={({ target }) => this.setState({ smsCode: target.value, errorMessage: "" })} />
	      </div>
	      <div style={styles.button}>
		<ButtonPrimary
		   handleClick={this._onSubmit.bind(this)}
		   disabled={this.state.fetching||this.state.errorMessage.length > 1}		   
		   buttonColor={styles.green}>
		  Confirm
		</ButtonPrimary>
	      </div>

	      <SpinnerOrError fetching={this.state.fetching} error={this.state.errorMessage}/>
	      
              {this.state.timer ?
                  <div style={styles.sendAgainContainer}>
			<span style={styles.sendAgain}>Send code again</span> in <Timer style={styles.timer} afterComplete={() => this.setState({ smsButtonDisabled: false, timer: false })} interval={1000} remaining={60000}> <Countdown /> seconds
			</Timer>
                      </div> :
		      <div style={styles.sendAgainContainer}>
			    <span style={styles.sendAgainLink} onClick={this._sendSmsAgain.bind(this)}>Send code again</span> if you have not received the code.
			  </div>
		      }
            </div>
        );
    }
}



export default connect(null, { withdrawTransfer, sendSmsToPhone })(ConfirmSmsForm);
