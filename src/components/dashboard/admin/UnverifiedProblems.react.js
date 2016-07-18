import React from 'react';
import {withRouter} from 'react-router';
import UserActions from '../../../actions/user/UserActions';
import ProblemsWithOptions from './ProblemsWithOptions.react';

var UnverifiedProblems = React.createClass({
    componentWillMount: function() {
        UserActions.updateUnverifiedProblems();  
    },
    render: function() {
        return (
            <div className="admin">
                <h2>Unverified problems: </h2>
                <p>{this.props.User.statusMessage}</p>
                <ProblemsWithOptions onDelete={this.onDelete} onApprove={this.onApprove} selected={this.props.User.unverifiedProblems}/>
            </div>
        );
    },
    onDelete: function (index) {
        UserActions.deleteProblem(index);
    },
    onApprove: function (index) {
        UserActions.approveProblem(index);
    }

});

module.exports = UnverifiedProblems;