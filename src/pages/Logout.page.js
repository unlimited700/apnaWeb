import React from 'react';
import UserActions from '../actions/user/UserActions';
var LogoutPage = React.createClass({
    componentWillMount() {
        UserActions.logout();
        this.props.history.push('/login');
    },
    render() {
        return (
            <div>
                <center><h3>Logged out successfully</h3></center>
            </div>
        );
    }
});

module.exports = LogoutPage;