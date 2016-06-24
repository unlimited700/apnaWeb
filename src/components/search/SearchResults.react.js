var React = require('react');
var SearchActions = require('../../actions/search/SearchActions');
var SearchResults = React.createClass({

    render: function () {
        return (
            <div className="search-results">
                <ul>

                    {this.props.all.map((text, i) => {
                        var onAdd=this.onAdd.bind(this, text);
                        return (
                            <li key={i} onClick={onAdd}>{text}</li>
                        );
                    })}
                </ul>
            </div>
        );
    },
    
    onAdd: function(index) {
        SearchActions.add(index);
    }
});

module.exports = SearchResults;