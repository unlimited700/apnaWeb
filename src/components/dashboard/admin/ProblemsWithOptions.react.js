import React from 'react';
var SelectedItem = React.createClass({

    render: function() {
        var text = this.props.text;
        return (
            <li key={text} onClick={this.props.onClick}>
                <i className="fa fa-close delete" onClick={this.props.onDelete}></i> { text } <i className="fa fa-check save" onClick={this.props.onApprove}></i></li>
        );
    }
});


var ProblemsWithOptions = React.createClass({
    _onDestroyClick: function(index) {
        this.props.onDelete(index);
    },
    _onApproveClick: function(index) {
        this.props.onApprove(index);
    },
    render: function () {
        var selected = this.props.selected;
        return (
            <ul>
                {selected.map((text, i) => {
                    var boundDestroyClick = this._onDestroyClick.bind(this, i);
                    var boundApproveClick = this._onApproveClick.bind(this, i);
                    return (
                        <SelectedItem text={text} onDelete={boundDestroyClick} onApprove={boundApproveClick} key={i}/>
                    );
                })}
            </ul>
        );
    }
});

module.exports = ProblemsWithOptions;