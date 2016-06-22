var React = require('react');
var SearchContainer = require('./SearchContainer.react');
var SelectedProblems = require('./SelectedProblems.react');
var MainSection = React.createClass({

    render: function() {
        return(
            <div>
                <SearchContainer all={this.props.all} />
                <div className="selected">
                    <SelectedProblems selected={this.props.selected} />
                </div>
            </div>
        );
    }
});

module.exports = MainSection;