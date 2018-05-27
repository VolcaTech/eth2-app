import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import faqLogo from './../../public/images/faqillustration.png';
import GotStuck from './../components/common/GotStuck';
import scrollToElement from "scroll-to-element";
const qs = require('querystring');
import questions from './questions.jsx';


const styles = {
    questionLinkContainer: {
	textAlign: 'left',
	marginBottom: 15
    },
    questionTitle: { marginBottom: 15 }
}


class Faq extends React.Component {
    componentDidMount() {
	this._jumpToHash();
    }

    componentDidUpdate() {
	this._jumpToHash();
    }
    
    _jumpToHash() {
	if (!this.props.location) { return null; }
	const queryParams = qs.parse(this.props.location.search.substring(1));
	if (queryParams.q) {
	    scrollToElement(`#q-${queryParams.q}`, {offset: -60});
	}
    }

    _renderQuestionsMenu () {
	return questions.map((question, index) => (
            <Link to={{
		      pathname: '/faq',
		      search: `?q=${index}`
		  }}
		  className="no-underline link text"
		  key={index}
		  onClick={() => scrollToElement(`#q-${index}`)}
	      >
              <div style={styles.questionLinkContainer}>
		{question.question}
	      </div>
            </Link>
        ));
    }

    _renderQuestions() {
	return questions.map((question, index) => (
	    <div id={`q-${index}`} className="questionContainer" key={index}>
	      <div style={styles.questionTitle} className="title">{question.question}</div>
	      <div className="text">{question.answer}</div>
	    </div>
	));
    }
    
    render() {
        return (
            <div className="faq-container">
              <Row className="faq-header">
                <Col xs={12} md={6}>
		  <div>
                    <div className="title">FAQ</div>
		    
                    <div className="questionsMenu">
		      {this._renderQuestionsMenu()}
	            </div>
                    <GotStuck />
		  </div>
		</Col>
		
                <Col xs={12} md={6}>
		  <div className="faq-logo hidden-xs">
                    <img src={faqLogo}></img>
		    </div>
		</Col>
		

              </Row>
	      <Row>
		<Col xs={12}>
		  {this._renderQuestions()}
	    </Col>
	    </Row>
            </div>
        );
    }
}


export default Faq;
