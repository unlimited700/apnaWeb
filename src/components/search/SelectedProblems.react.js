var React = require('react');
var SelectedItem = require('./SelectedItem.react');

var SelectedProblems = React.createClass({

    render: function () {
//        var selected = this.props.selected;
        return (
            <ul>
                <SelectedItem text="Fever"/>
                <SelectedItem text="Cough"/>
                <SelectedItem text="Cold"/>
            </ul>
        );
    }
});

module.exports = SelectedProblems;