import React, { Component } from "react";
import Footer from './Footer';
import JoinUs from './JoinUs';
import WorksWith from './WorksWith';
import Form from './Form';
import Features from './Features';




class e2pLanding extends React.Component {
    render() {
        return (
            <div style={{width: '100%'}}>
           <div style={{display: 'block', width: '100%', }}><Form/></div>                                 
           <div style={{display: 'block', width: '100%', }}><Features/></div>                                 
           <div style={{display: 'block', width: '100%', }}><WorksWith/></div>                      
           <div style={{display: 'block', width: '100%', }}><JoinUs/></div>           
           <div style={{display: 'block', width: '100%'}}><Footer/></div>
            </div>
        )
    }
}

export default e2pLanding;