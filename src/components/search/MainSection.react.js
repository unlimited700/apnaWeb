import React from 'react';
import SearchContainer from './SearchContainer.react';
import SelectedProblems from './SelectedProblems.react';
import SearchActions from '../../actions/search/SearchActions';
import {withRouter} from 'react-router';

var MainSection = React.createClass({
    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedProblems.length) {
            this.props.router.push('/recommend');
        }
    },
    render: function() {
        return(
            <div>
                <br />
                <center><h2>apnaVaidya</h2></center>
                <SearchContainer searchTerm={this.props.searchTerm} searchResults={this.props.searchResults} onChange={ this._searchQuery } onAdd/>
                <br />
                <br />
                <div className="selected">
                    {
                        this.props.selectedProblems.length ? (
                            <div>
                                <SelectedProblems selected={this.props.selectedProblems}/>
                            </div>
                        ): ""
                    }
                </div>
            </div>
        );
    },

    _searchQuery(event) {
        SearchActions.search(event.target.value);
    },

    _searchRecommend(event) {
        SearchActions.recommend();
        this.props.router.push('/recommend');
    }

});

module.exports = withRouter(MainSection);