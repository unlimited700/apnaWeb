import React from 'react';
import SearchResults from './SearchResults.react'
import SearchActions from '../../actions/search/SearchActions';

var SearchContainer = React.createClass({
    
    render: function() {
        return (
            <div className="search-container">
                <input type="text" value={this.props.searchTerm} placeholder="Search" onChange={ this.onChange }/>

                {
                    this.props.searchResults.length ? (
                        <div>
                            <SearchResults all = {this.props.searchResults} onAdd={this.props.onAdd}/>
                        </div>
                    ) : ""
                }
            </div>
        );
    },

    onChange(event) {
        SearchActions.search(event.target.value);
    }



});



module.exports = SearchContainer;