import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

const styles = {
    backButton: { display: 'block', margin: 'auto', width: 23, height: 23, borderRadius: 12, borderWidth: 0, backgroundColor: '#f5f5f5', textAlign: 'center', marginTop: 14 },
    nextButton: { display: 'block', margin: 'auto', width: 23, height: 23, borderRadius: 12, borderWidth: 0, backgroundColor: '#f5f5f5', textAlign: 'center' },
    backButtonTitle: { width: 250, height: 15, margin: 'auto', marginTop: 15, display: 'block', textAlign: 'center', fontSize: 12, fontFamily: 'SF Display Bold', opacity: 0.4 },
    nextButtonTitle: { width: 250, height: 23, margin: 'auto', paddingTop: 3, display: 'block', textAlign: 'center', fontSize: 14, fontFamily: 'SF Display Bold' },
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
                 naturalSlideHeight={window.innerHeight - 130}
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
		  { Slides }
                </Slider>

              <div style={this.state.nextButtonStyle}>
                <div style={{width: 162, height: 23, display: 'flex', margin: 'auto', marginBottom: 26,}}>
                  <div style={styles.nextButtonTitle}>Recent transactions</div>
                  <ButtonNext onClick={() => this.setState({ currentSlide: 1, backButtonStyle: { marginBottom: 15 }, nextButtonStyle: styles.buttonHidden })} style={styles.nextButton}><i className="fas fa-angle-down" style={{ fontSize: 16, marginTop: 3, color: '#0099ff' }}></i></ButtonNext>
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
