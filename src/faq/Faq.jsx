import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import faqLogo from './../../public/images/faqillustration.png';
import GotStuck from './../components/common/GotStuck';
import scrollToElement from "scroll-to-element";
const qs = require('querystring');


const styles = {
    container: { width: '75%', margin: 'auto' },
    row: {
        textAlign: 'center'
    },
    col1: { padding: 0, marginBottom: 140 },
    title: {
        fontSize: 36,
        fontFamily: 'SF Display Black',
        textAlign: 'left',
        lineHeight: 1,
        marginBottom: 50
    },
    text: {
        fontSize: 24,
        fontFamily: 'SF Display Regular',
        lineHeight: 1,
        textAlign: 'left',
        marginBottom: 50
    },
    questionLink: { textDecoration: 'none', fontSize: 24, textAlign: 'left', fontFamily: 'SF Display Bold', color: '#0099ff', textAlign: 'left', marginBottom: 15 },
    questionLinkContainer: { marginBottom: 50 },
    questionContainer: { width: '77%', margin: 'auto', textAlign: 'left', marginBottom: 75 },
    question: { fontSize: 36, fontFamily: 'SF Display Black', marginBottom: 15 },
    answer: { fontSize: 24, fontFamily: 'SF Display Regular' },
}

const questions = [
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    },
    {
        question: "Is this service fully trustless?",
        answer: "Decentralisation vs Convenience trade-off. We acknowledge that our solution is not fully decentralized. You have to trust centralised entity to perform verification (SMS-verification), but ether transfers are trustless."
    }
]



class Faq extends React.Component {
    componentDidMount() {
	this.jumpToHash();
    }
    
    jumpToHash() {
	const queryParams = qs.parse(this.props.location.search.substring(1));
	console.log({queryParams})
	if (queryParams.q) {
	    scrollToElement(`#q-${queryParams.q}`);
	}
    }

    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={styles.container}>
                        <div style={styles.title}>FAQ</div>
                        <Col xs={12} md={6} style={styles.col1}>
                          <div style={styles.questionLinkContainer}>{questions.map((question, index) => (
                              <Link to={{
					pathname: '/faq',
					search: `?q=${index}`
				    }}
				    className="no-underline"  key={index} onClick={() => scrollToElement(`#q-${index}`)} >
                                <div style={styles.questionLink}>
				  {question.question}
				</div>
                                </Link>
                            ))}</div>
                            <GotStuck />
                        </Col>
                        <Col xs={12} md={6}>
                            <img src={faqLogo}></img>
                        </Col>
                    </div>
                </Row>
            {questions.map((question, index) => (
                <div id={`q-${index}`} style={styles.questionContainer} key={index}>
                  <div style={styles.question}>{question.question}</div>
                  <div style={styles.answer}>{question.answer}</div>
                </div>
            )
			  )}
            </div>
        )
    }
}


export default Faq;
