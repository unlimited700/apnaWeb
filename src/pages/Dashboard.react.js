import React from 'react';
import { withRouter } from 'react-router';
import AltContainer from 'alt-container';
import UserStore from '../stores/user/UserStore';

var DashboardPage = React.createClass({
    render: function () {
        return (
            <div className="dash-container">
                <AltContainer stores={{User: UserStore}}>
                    {this.props.children}
                </AltContainer>
            </div>
        );
    }
});

module.exports = withRouter(DashboardPage);