import React, { Component } from "react";

import Faq from './Faq';




class e2pFaq extends React.Component {
    render() {
        return (
            <div style={{width: '100%'}}>
              <div style={{display: 'block', width: '100%', }}>
		<Faq {...this.props}/>
	      </div>                                 
            </div>
        )
    }
}

export default e2pFaq;
