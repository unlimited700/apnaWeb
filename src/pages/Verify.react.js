import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../actions/user/UserActions';

var Verify = React.createClass({
    componentWillMount: function () {
        var email = this.props.location.query.email;
        var token = this.props.location.query.token;

        if(!email || !token) {
            this.props.router.push('/');
        }
        else {
            UserActions.verify({email: email, token: token});
        }
    },
    render: function () {
        var email = this.props.location.query.email;
        var token = this.props.location.query.token;
        return(
            <div>
                <br />
                <br />
                <br />
                <center><h3>{this.props.User.verifiedStatus}</h3></center>
            </div>
        );
    }
});


module.exports = withRouter(Verify);