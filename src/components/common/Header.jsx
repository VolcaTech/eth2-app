import React, { Component } from 'react';


const Header = () => {
    return (
	<div className="row">
	  <div className="col-sm-12 m-b-xl m-t-lg" style={{marginLeft: "0px", marginRight: "0px"}}>
 	    <div className="view-header"  style={{margin: "0 auto",  maxWidth: "450px"}}>
	      <div className="header-icon">
		<i className="pe page-header-icon pe-7s-shuffle"></i>
	      </div>
	      <div className="header-title">
		<h3 className="m-b-xs">Send ether to phone number.
		  <br/>
		  <small>
		    To any person. Even without ethereum wallet.
		  </small>
		</h3>
	      </div>
            </div>
	  </div>
 	</div>
    );
}


export default Header;
