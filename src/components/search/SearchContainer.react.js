import React from 'react';
import SearchResults from './SearchResults.react'
import SearchActions from '../../actions/search/SearchActions';

var SearchContainer = React.createClass({
    
    render: function() {
        return (
            <div className="search-container">
                <input type="text" value={this.props.searchTerm} placeholder={this.props.placeHolder} onChange={ this.props.onChange } disabled={ this.props.disabled }/>

                {
                    this.props.searchResults.length ? (
                        <div>
                            <SearchResults all = {this.props.searchResults} onAdd={this.props.onAdd}/>
                        </div>
                    ) : ""
                }
            </div>
        );
    }



});



module.exports = SearchContainer;