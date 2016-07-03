import React from 'react';
import {withRouter} from 'react-router';
import ReactRedirect from 'react-redirect';

var LandingPage = React.createClass({

    render() {
        return (
            <ReactRedirect location="/recommend"></ReactRedirect>
        );
    }
});


module.exports = withRouter(LandingPage);