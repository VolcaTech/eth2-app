import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { getTransfersForActiveAddress } from './../../data/selectors';
import iLogo from './../../assets/images/i.png';
import qLogo from './../../assets/images/q.png';


const styles = {
    backButton: {
        display: 'block',
        margin: 'auto',
        margin: '0px auto auto'
    },
    nextButton: {
        display: 'block',
        textAlign: 'center',
        margin: '0px auto auto'
    },
    nextButtonIcon: {
        display: 'inline',
        fontSize: 16,
        color: '#0099ff',
        padding: '4px 7px 4px 7px',
    },
    buttonRow: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
	height: 59
    },
    backButtonIcon: {
        display: 'inline',
        height: 23,
        width: 23,
        borderRadius: 12,
        borderWidth: 0,
        fontSize: 16,
        color: '#0099ff',
        padding: '3px 7px 4px 7px'
    },
    backButtonTitle: {
        //marginTop: 14,
        //width: 250,
        //height: 15,
        //margin: '15px auto auto',
        display: 'block',
        textAlign: 'center',
        display: 'block',
        fontSize: 16,
        fontFamily: 'SF Display Bold',
        lineHeight: 1,
        paddingTop: 4,
        marginRight: 20
    },
    footer: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        margin: 'auto',
        marginRight: 18,
        display: 'flex',
        flexDirection: 'row',
        padding: "8px 16px",
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
	backgroundColor: '#fff'
    },
    nextButtonTitle: {
        // width: 250,
        // height: 23,
        // margin: 'auto',
        // paddingTop: 3,
        // display: 'block',
        // textAlign: 'center',
        fontSize: 15,
        fontFamily: 'SF Display Bold',
        marginRight: 7,
        paddingTop: 2
    },
    buttonHidden: { width: 0, height: 0, overflow: 'hidden' },
    infoIcon: {
        width: 18,
        height: 18,
        marginTop: 1,
        border: '2px solid #33aeff',
        color: '#33aeff',
        borderRadius: 9,
        textAlign: 'center',
        lineHeight: 1,
        fontSize: 14,
        fontFamily: 'SF Display Bold'
    },
    logo: {
        height: 59,
        width: 59
    },
    buttonsRowContainer: {
	position: 'fixed',
	bottom: 20,	
	width:'100%'
    }
}


class E2PCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            nextButtonStyle: {},
            backButtonStyle: styles.buttonHidden
        };
    }

    componentWillReceiveProps(nextProps) {
        // slide up screen from history on change
        if (nextProps.location !== this.props.location) {
            this._clickBackButton();
        }
    }

    _clickBackButton() {
        this.setState({
            currentSlide: 0,
            backButtonStyle: styles.buttonHidden,
            nextButtonStyle: {}
        });
    }

    render() {
        const Slides = this.props.slides.map((slideComponent, index) => {
            return (<Slide key={index} index={index}>{slideComponent}</Slide>);
        });
        let height = window.INITIAL_HEIGHT - 80;
        if (this.state.currentSlide === 1) {
            const rowsHeight = (this.props.transfers.length * 50 + 20);
            height = Math.max(height, rowsHeight);
        }


        return (
            <div style={{ display: 'flex', flexDirection: 'column', touchAction: 'none' }}>
                <CarouselProvider
                    naturalSlideWidth={window.innerWidth}
                    naturalSlideHeight={height}
                    totalSlides={2}
                    orientation='vertical'
                    currentSlide={this.state.currentSlide}
                    touchEnabled={false}
                    dragEnabled={false}
                >

                    <Slider>
                        {Slides}
                    </Slider>
		    <div style={styles.buttonsRowContainer }>
                      <div style={this.state.backButtonStyle}>
			<ButtonBack onClick={this._clickBackButton.bind(this)} style={styles.nextButton} >
                          <div style={styles.buttonRow}>
                            <div style={styles.buttonContainer}>
                              <span style={styles.nextButtonTitle}>Back</span>
                              <i className="fas fa-angle-up" style={styles.nextButtonIcon}></i>
                            </div>			    
                          </div>
			</ButtonBack>
                      </div>
		      
		      
                      <div style={this.state.nextButtonStyle}>
			<ButtonNext onClick={() => this.setState({ currentSlide: 1, backButtonStyle: {}, nextButtonStyle: styles.buttonHidden })} style={styles.nextButton}>
                          <div style={styles.buttonRow}>
                            <div style={styles.buttonContainer}>
                              <span style={styles.nextButtonTitle}>Transfers</span>
                              <i className="fas fa-angle-down" style={styles.nextButtonIcon}></i>
                            </div>
                            <Link to="/about">
                              <img src={iLogo} style={styles.logo} onLoad={() => { window.dispatchEvent(new Event('resize')); }} />
                            </Link>
                            <img style={{}} src={qLogo}></img>
                          </div>
			</ButtonNext>
		      </div>
                    </div>
                </CarouselProvider>
            </div>
        );
    }
}


// <div style={{width: 175, height: 18, display: 'flex', margin: 'auto', justifyContent: 'space-between', fontSize: 14, fontFamily: 'SF Display Bold', color: '#0099ff'}}>
//   <div style={styles.infoIcon}>i</div><div>More about Eth2Phone
//   </div>                           
// </div>   

function mapStateToProps(state) {
    return {
        transfers: getTransfersForActiveAddress(state)
    };
}


export default connect(mapStateToProps)(E2PCarousel);
