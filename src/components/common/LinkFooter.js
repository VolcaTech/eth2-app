import React, { Component } from 'react';


class LinkFooter extends React.Component {


    render() {
	//console.log(this.props);
	
    return (

            <div className="row" style={{marginBottom:"35px"}}>
                <div className="col-md-2 col-md-offset-3"><a href=""><div className="fa fa-info-circle links-margin" aria-hidden="true"> About</div></a></div>
                <div className="col-md-2"><a href="https://github.com/Dobrokhvalov/eth2phone"><div className="fa fa-github links-margin" aria-hidden="true"> Git</div></a></div>
                <div className="col-md-2"><a href=""><div className="fa fa-question-circle-o links-margin" aria-hidden="true"> FAQ</div></a></div>
            </div>
	
    );
}
}

export default LinkFooter;
