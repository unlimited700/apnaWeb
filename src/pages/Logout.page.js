import React from 'react';
import { withRouter } from 'react-router';

import UserActions from '../actions/user/UserActions';
var LogoutPage = React.createClass({
    componentWillMount() {
        UserActions.logout();
        this.props.router.push('/login');
    },
    render() {
        return (
            <div>
                <center><h3>Logged out successfully</h3></center>
            </div>
        );
    }
});

module.exports = withRouter(LogoutPage);