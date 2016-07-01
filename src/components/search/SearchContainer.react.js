import React from 'react';
import SearchResults from './SearchResults.react'


var SearchContainer = React.createClass({
    
    render: function() {
        return (
            <div className="search-container">
                
                <input type="text" value={this.props.searchTerm} placeholder="Search" onChange={ this.props.onChange }/>

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




});



module.exports = SearchContainer;