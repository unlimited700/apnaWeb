import React from 'react';
import SearchActions from '../../actions/search/SearchActions';

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
        this.props.onAdd(index);
    }
});

module.exports = SearchResults;