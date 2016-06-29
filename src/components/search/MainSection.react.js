import React from 'react';
import SearchContainer from './SearchContainer.react';
import SelectedProblems from './SelectedProblems.react';
import SearchActions from '../../actions/search/SearchActions';
import {withRouter} from 'react-router';

var MainSection = React.createClass({
    render: function() {
        return(
            <div>
                <SearchContainer searchTerm={this.props.searchTerm} searchResults={this.props.searchResults} onChange={ this._searchQuery } onAdd/>
                <br />
                <br />
                <div className="selected">
                    {
                        this.props.selectedProblems.length ? (
                            <div>
                                <SelectedProblems selected={this.props.selectedProblems}/>
                                <br />
                                <button className="search-btn" onClick={ this._searchRecommend }> Go </button >
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