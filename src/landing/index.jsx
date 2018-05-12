import React, { Component } from "react";
import Footer from './Footer';
import JoinUs from './JoinUs';



class e2pLanding extends React.Component {
    render() {
        return (
            <div>
           <div style={{height: 200}}>Landing</div>
           <div style={{display: 'block', width: '100%', }}><JoinUs/></div>           
           <div style={{display: 'block', width: '100%'}}><Footer/></div>
            </div>
        )
    }
}

export default e2pLanding;