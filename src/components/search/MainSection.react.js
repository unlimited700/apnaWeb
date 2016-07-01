import React from 'react';
import SearchContainer from './SearchContainer.react';
import SelectedProblems from './SelectedProblems.react';
import {withRouter} from 'react-router';

var MainSection = React.createClass({
    componentWillReceiveProps(nextProps) {
        if(nextProps.Search.selectedProblems.length) {
            this.props.router.push('/recommend');
        }
    },
    render: function() {
        return(
            <div>
                <br />
                <center><h2>apnaVaidya</h2></center>
                <SearchContainer searchTerm={this.props.Search.searchTerm} searchResults={this.props.Search.searchResults}/>
                <br />
                <br />
                <div className="selected">
                    {
                        this.props.Search.selectedProblems.length ? (
                            <div>
                                <SelectedProblems selected={this.props.Search.selectedProblems}/>
                            </div>
                        ): ""
                    }
                </div>
            </div>
        );
    }

});

module.exports = withRouter(MainSection);