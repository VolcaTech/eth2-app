import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


class Eth2PhoneLogo extends React.PureComponent {

    _onLogoClick() {
        if (window.location.hash && window.location.hash.length < 3) {
            window.location.reload();
        }
    }

    render() {
        return (
            <Link className="no-underline" to="/" onClick={this._onLogoClick.bind(this)}>
                <div className="eth2phone-logo">
                    Eth2<span>beta</span>
                    </div>
            </Link>
        );
    }
}

export default Eth2PhoneLogo;
