var React = require('react');
var SearchResults = require('./SearchResults.react');
var SearchContainer = React.createClass({
    
    render: function() {
        return (
            <div className="search-container">
                <h2>Search</h2>
                <input type="text" placeholder="Search" onChange={ this._searchQuery }/>
                <SearchResults all = {this.props.all}/>
            </div>
        );
    },

    _searchQuery(event) {
        console.log('change occured');
    }

});



module.exports = SearchContainer;