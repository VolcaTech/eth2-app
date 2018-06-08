import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { getTransfersForActiveAddress } from './../../data/selectors';
import RetinaImage from 'react-retina-image';


const styles = {
    backButton: {
        display: 'block',
        margin: 'auto',
        margin: '0px auto auto'
    },
    nextButton: {
        display: 'flex',
        margin: '0px auto auto',
        maxWidth: 400,
        minWidth: 300,
        width: '78%',
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
        display: 'flex',
        flexDirection: 'row',
        padding: "8px 16px",
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    aboutContainer: {
        margin: 'auto',
        //marginLeft: 40,
        marginRight: 10,
        marginLeft: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: "8px 16px",
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    transfersButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: "8px 16px",
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
        backgroundColor: '#fff',
        float: 'right',
        marginTop: 10,
        //marginRight: 40,
        width: 127
    },
    nextButtonTitle: {
        fontSize: 15,
        fontFamily: 'SF Display Bold',
        marginRight: 5,
        marginLeft: 5,
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
    nextButtonsRowContainer: {
        position: 'relative',
        width: '100%'
    },
    backButtonsRowContainer: {
        position: 'fixed',
	bottom: 35
    }    
}


class E2PCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            nextButtonStyle: {},
            backButtonStyle: styles.buttonHidden,
            backButtonColor: '#fff',
            
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
            nextButtonStyle: {},
        });
    }

    render() {
        const Slides = this.props.slides.map((slideComponent, index) => {
            return (<Slide key={index} index={index}>{slideComponent}</Slide>);
        });
        let height = window.INITIAL_HEIGHT - 150;
        if (this.state.currentSlide === 1) {
            const rowsHeight = (this.props.transfers.length * 50 + 20);
            height = Math.max(height, rowsHeight);
        }

	// minimum 550px
	height = Math.max(height, 500);

	const backButtonOffset = window.innerWidth / 2 - 50;

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
                    <div style={{...styles.backButtonsRowContainer, left: backButtonOffset}}>
                        <div style={this.state.backButtonStyle}>
                            <ButtonBack onClick={this._clickBackButton.bind(this)} >
                                <div style={styles.buttonRow}>
                                    <div className="history-button" style={styles.buttonContainer}>
                                        <span style={styles.nextButtonTitle}>Back</span>
                                        <i className="fas fa-angle-up" style={styles.nextButtonIcon}></i>
                                    </div>
                                </div>
                            </ButtonBack>
                        </div>
		    </div>
		    <div style={styles.nextButtonsRowContainer}>
                        <div style={this.state.nextButtonStyle}>
                            <ButtonNext onClick={() => this.setState({ currentSlide: 1, backButtonStyle: {}, nextButtonStyle: styles.buttonHidden })} style={styles.nextButton}>
                                <div style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <div style={styles.buttonRow}>
                                        <Link to="/about" className='history-button no-underline' style={{ ...styles.aboutContainer, color: '#0099ff' }}>
                                            <span style={styles.nextButtonTitle}>About</span>
                                        </Link>
                                        <Link to="/faq">					
                                          <div className="faq-icon" style={{ width: 59, height: 59 }}>					 
                                            <RetinaImage src="https://eth2.io/images/q.png" />
                                          </div>
					</Link>
                                    </div>
                                </div>
                                <div style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <div className="history-button" style={styles.transfersButtonContainer}>
                                        <span style={styles.nextButtonTitle}>Transfers</span>
                                        <i className="fas fa-angle-down" style={styles.nextButtonIcon}></i>
                                    </div>

                                </div>
                            </ButtonNext>
                        </div>
                    </div>
                </CarouselProvider>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        transfers: getTransfersForActiveAddress(state)
    };
}


export default connect(mapStateToProps)(E2PCarousel);
