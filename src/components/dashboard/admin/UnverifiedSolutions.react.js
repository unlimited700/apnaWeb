import React from 'react';
import {withRouter} from 'react-router';
import UserActions from '../../../actions/user/UserActions';
import ProblemsWithOptions from './ProblemsWithOptions.react';

var UnverifiedSolutions = React.createClass({
    componentWillMount: function() {
        UserActions.updateUnverifiedSolutions();
    },
    render: function() {
        if(!this.props.User.unverifiedSolutions.length )
            return (<p>No pending solutions found.</p>);

        return (
            <div className="admin">
                <h2>Unverified solutions: </h2>
                <p>{this.props.User.statusMessage}</p>
                <ProblemsWithOptions onDelete={this.onDelete} onApprove={this.onApprove} selected={this.props.User.unverifiedSolutions}/>
            </div>
        );
    },
    onDelete: function (index) {
        UserActions.deleteSolution(index);
    },
    onApprove: function (index) {
        UserActions.approveSolution(index);
    }

});

module.exports = UnverifiedSolutions;
