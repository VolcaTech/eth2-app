import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

const styles = {
    backButton: {
	display: 'block',
	margin: 'auto',
	textAlign: 'center',
    },
    nextButton: {
	display: 'block',
	textAlign: 'center',
	margin: '0px auto auto'
    },
    nextButtonIcon: {
	display: 'inline',	
	borderRadius: 16,
	borderWidth: 0,
	backgroundColor: '#f5f5f5',
	fontSize: 16,
	color: '#0099ff',
	padding: '4px 7px 4px 7px',
    },    
    backButtonIcon: {
	borderRadius: 16,
	borderWidth: 0,
	backgroundColor: '#f5f5f5',
	fontSize: 16,
	color: '#0099ff',
	padding: '4px 7px 4px 7px'	
    },    
    backButtonTitle: {
	marginTop: 14,	
	width: 250,
	height: 15,
	margin: '15px auto auto',
	display: 'block',
	textAlign: 'center',
	display: 'block',
	fontSize: 12,
	fontFamily: 'SF Display Bold',
	opacity: 0.4
    },
    nextButtonTitle: {
	// width: 250,
	// height: 23,
	// margin: 'auto',
	// paddingTop: 3,
	// display: 'block',
	// textAlign: 'center',
	fontSize: 14,
	fontFamily: 'SF Display Bold',
	marginRight: 7
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
    
    render() {
	const Slides = this.props.slides.map((slideComponent, index) => {
	    return (<Slide key={index} index={index}>{slideComponent}</Slide>);
	});

	
        return (
            <div style={{ display: 'flex', flexDirection: 'column', touchAction: 'none' }}>
              <CarouselProvider
                 naturalSlideWidth={window.innerWidth}
                 naturalSlideHeight={window.INITIAL_HEIGHT - 130}
                 totalSlides={2}
                 orientation='vertical'
                 currentSlide={this.state.currentSlide}
                 touchEnabled={false}
		 dragEnabled={false}
                 >
		<div style={this.state.backButtonStyle}>
                  <ButtonBack onClick={() => this.setState({ currentSlide: 0, backButtonStyle: styles.buttonHidden, nextButtonStyle: {} })} style={styles.backButton} ><i className="fas fa-angle-up" style={styles.backButtonIcon}></i>
                  <div style={styles.backButtonTitle}>Back</div>
		  </ButtonBack>

                </div>		
                <Slider>
		  { Slides }
                </Slider>

              <div style={this.state.nextButtonStyle}>
                <div style={{height: 23, margin: 'auto', marginBottom: 26,}}>
                  <ButtonNext onClick={() => this.setState({ currentSlide: 1, backButtonStyle: { marginBottom: 15 }, nextButtonStyle: styles.buttonHidden })} style={styles.nextButton}>		    
		    <span style={styles.nextButtonTitle}>Recent transactions</span>
		    <i className="fas fa-angle-down" style={styles.nextButtonIcon}></i>
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


export default E2PCarousel;
