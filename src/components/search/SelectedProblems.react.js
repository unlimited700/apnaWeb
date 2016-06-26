import React from 'react';
import SearchActions from '../../actions/search/SearchActions';

var SelectedItem = React.createClass({

    render: function() {
        var text = this.props.text;
        return (
            <li key={text} onClick={this.props.onClick}> { text } </li>
        );
    }
});


var SelectedProblems = React.createClass({
    _onDestroyClick: function(index) {
        SearchActions.delete(index);
    },
    render: function () {
        var selected = this.props.selected;

        return (
            <ul>
                {selected.map((text, i) => {
                    var boundClick = this._onDestroyClick.bind(this, i);
                    return (
                        <SelectedItem text={text} onClick={boundClick} key={i}/>
                    );
                })}
            </ul>
        );
    }
});

module.exports = SelectedProblems;