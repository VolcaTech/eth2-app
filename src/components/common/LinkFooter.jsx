import React, { Component } from 'react';


class LinkFooter extends React.Component {


    render() {
        return (
	    <div>
                <div className="row m-t-lg">
                    <div className="col-md-2 col-md-offset-3"><a className="a-grey" href="/about.html"><div className="fa fa-info-circle links-margin" aria-hidden="true"> About</div></a></div>
                    <div className="col-md-2"><a className="a-grey" href="https://github.com/Dobrokhvalov/eth2phone"><div className="fa fa-github links-margin" aria-hidden="true"> Git</div></a></div>
                    <div className="col-md-2"><a className="a-grey" href="/FAQ.html"><div className="fa fa-question-circle-o links-margin" aria-hidden="true"> FAQ</div></a></div>
                </div>
                <div className="row">
		  <div className="col-sm-8 col-sm-offset-2">
		  <p className="m-t-lg">
		    <small>
		      The current application serves the proof-of-concept reasons only and is deployed on Ropsten test
                      network. Please be aware that systems bugs are possible at that stage. We will appreciate if
                      you inform us any of them to <a style={{color: "#aaa", textDecoration: "underline"}} href="mailto: eth2phone@gmail.com"> eth2phone@gmail.com </a>
		    </small>
		  </p>
		  </div>
                </div>
		
	    </div>
        );
    }
}

export default LinkFooter;
