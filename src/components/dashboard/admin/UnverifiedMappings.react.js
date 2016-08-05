import React from 'react';
import {withRouter} from 'react-router';
import UserActions from '../../../actions/user/UserActions';
import SolutionDescription from '../../recommendation/SolutionDescription.react';

var UnverifiedMappings = React.createClass({
    getInitialState() {
        return {
            currentlyActive: -1
        }
    },
    componentWillMount: function() {
        UserActions.updateUnverifiedMappings();
    },
    render: function() {
        if(!this.props.User.unverifiedMappings.length )
            return (<p>No pending mappings found.</p>);

        return (
            <div className="adm recommend-container">
                <h2>Unverified mappings: </h2>
                <p>{this.props.User.statusMessage}</p>
                <div className="content">
                    <ul className="solution-container" onClick={this.onClick}>
                        { this.props.User.unverifiedMappings.map((ob, i) => {
                            var onClick = this.onClick.bind(this, i);
                            return (
                                <div key={i}>
                                    <li data-tag={i} onClick={onClick}>{ob.problem} : {ob.solution} <p className="details">{ob.duration}
                                        minutes for {ob.days} days &nbsp;
                                        <i id={i} className="fa fa-close delete" onClick={this.props.onDelete}></i>
                                        &nbsp;
                                        <i id={i} className="fa fa-check save" onClick={this.props.onApprove}></i>
                                        </p>
                                    </li>
                                    <SolutionDescription data-tag={i} isActive={this.state.currentlyActive == i}
                                                         content={ob}/>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    },
    onClick: function (event) {
        var id = parseInt(event);

        if(id >= 0) {
            if(this.state.currentlyActive == id)
                id = -1;
            this.setState({
                currentlyActive: id
            })
        }
        else if(event.target.getAttribute("class")){
            var action = event.target.getAttribute("class").split(' ')[2];
            var id = parseInt(event.target.getAttribute("id"));
            if(this.state.currentlyActive == id)
                this.setState({currentlyActive: -1});
            if(action == 'delete' && id >= 0) {
                UserActions.deleteMapping(id);
            }
            else if(action == 'save' && id >= 0) {
                UserActions.approveMapping(id);
            }
        }
    }

});

module.exports = UnverifiedMappings;
