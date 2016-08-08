import React from 'react';
import { withRouter } from 'react-router';
import AltContainer from 'alt-container';
import SearchStore from '../../../stores/search/SearchStore';
import UserStore from '../../../stores/user/UserStore';

var PreAdmin = React.createClass({
    componentWillMount() {
        if(this.props.User.user.role != "ADMIN")
            this.props.router.push('/dash');
    },
    render: function () {
        return (
            <AltContainer stores={{User: UserStore, Search: SearchStore}}>
                {this.props.children}
            </AltContainer>
        );
    }

});

module.exports = withRouter(PreAdmin);