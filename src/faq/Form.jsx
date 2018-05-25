import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import faqLogo from './../../public/images/transfer_illustration.png';
import GotStuck from './../components/common/GotStuck';



const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    row: {
        textAlign: 'center'
    },
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
    faqLink: {
        float: 'left',
        color: '#0099ff',
        fontFamily: 'SF Display Bold',
        fontSize: 24,
        textAlign: 'left',
        paddingTop: 6,
        marginBottom: 10
    },
    greyText: {
        color: '#999999',
        opacity: 0.8,
        fontSize: 20,
        fontFamily: 'SF Display Regular'
    },
    gitText: {
        fontSize: 24,
        fontFamily: 'SF Display Bold',
        lineHeight: 1,
        display: 'inline'
    },
    column: {
        display: 'block',
        float: 'none'
    },
    gitContainer: {
        width: '100%',
        height: 46,
        backgroundColor: '#fff',
        margin: 'auto',
        borderRadius: 10,
        paddingBottom: 2,
        paddingTop: 7,
        border: '2px solid #000000',
        marginBottom: 50
    },
    logo: { marginLeft: 10 },
    aboutContainer: {
        width: '80%',
        margin: 'auto'
    },
    githubLink: {
        textDecoration: 'none',
        color: "#000"
    },
    gitLogo: {
        paddingBottom: 5,
        marginRight: 5
    },
    right: {
        float: 'right'
    },
    formContainer: {
        width: '80%',
        margin: 'auto',
        marginBottom: 50,
        marginTop: 50,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 50,
        borderRadius: 10,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)'
    },
    sendLogo: {
        width: '100%'
    },
    sendButton: {
        textDecoration: 'none'
    }
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



class Form extends React.Component {


    render() {
        return (
            <div>
                <Row style={styles.row}>
                    <div style={{ width: '75%', margin: 'auto' }}>
                        <div style={styles.title}>FAQ</div>
                        <Col xs={12} md={6} style={{ padding: 0, marginBottom: 140 }}>
                            <div style={{ marginBottom: 50 }}>{questions.map(question => (
                                <div style={{textAlign: 'left', marginBottom: 15}}>
                                    <a href={`#${questions.indexOf(question)}`} style={{ textDecoration: 'none', fontSize: 24, textAlign: 'left', fontFamily: 'SF Display Bold', color: '#0099ff',  }}>
                                        {question.question}
                                    </a>
                                </div>
                            ))}</div>
                            <GotStuck />
                        </Col>
                        <Col xs={12} md={6} style={{ padding: 0 }}>
                            <img src={faqLogo}></img>
                        </Col>
                    </div>
                </Row>
                {questions.map(question => (
                    <div name={questions.indexOf(question)} style={{ width: '77%', margin: 'auto', textAlign: 'left', marginBottom: 75 }}>
                        <div style={{ fontSize: 36, fontFamily: 'SF Display Black', marginBottom: 15 }}>{question.question}</div>
                        <div style={{ fontSize: 24, fontFamily: 'SF Display Regular' }}>{question.answer}</div>
                    </div>
                )
                )}
            </div>
        )
    }
}


export default Form;
