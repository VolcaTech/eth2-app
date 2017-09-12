import React, { Component } from 'react';


class LinkFooter extends React.Component {


    render() {
        //console.log(this.props);

        return (
            <div>
                <div className="row" style={{ textAlign: "center", marginBottom: "15px" }}>
                    
                        <h3>Send ethereum to any person by phone number.<br />Simple. Secure. No wallet needed.</h3>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-3"><a className="a-grey" href="/about.html"><div className="fa fa-info-circle links-margin" aria-hidden="true"> About</div></a></div>
                    <div className="col-md-2"><a className="a-grey" href="https://github.com/Dobrokhvalov/eth2phone"><div className="fa fa-github links-margin" aria-hidden="true"> Git</div></a></div>
                    <div className="col-md-2"><a className="a-grey" href="/FAQ.html"><div className="fa fa-question-circle-o links-margin" aria-hidden="true"> FAQ</div></a></div>
                </div>
            </div>
        );
    }
}

export default LinkFooter;
