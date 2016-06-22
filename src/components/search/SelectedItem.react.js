var React = require('react');
var SearchActions = require('../../actions/search/SearchActions');

var SelectedItem = React.createClass({

    render: function() {

        var text = this.props.text;

        return (
            <li
                key = { text }  onClick={this._onDestroyClick()}>
                    {text}
            </li>
        );
    },

    _onDestroyClick: function() {
        SearchActions.destroy(this.props.text);
    }
});

module.exports = SelectedItem;