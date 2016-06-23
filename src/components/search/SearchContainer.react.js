var React = require('react');
var SearchResults = require('./SearchResults.react');
var SearchActions = require('../../actions/search/SearchActions');
var SearchContainer = React.createClass({
    
    render: function() {
        return (
            <div className="search-container">
                <h2>Search</h2>
                <input type="text" value={this.props.searchTerm} placeholder="Search" onChange={ this._searchQuery }/>
                <SearchResults all = {this.props.searchResults} onAdd={this.onAdd}/>
            </div>
        );
    },

    _searchQuery(event) {
        SearchActions.search(event.target.value);
    }


});



module.exports = SearchContainer;