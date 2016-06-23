var React = require('react');
var SearchContainer = require('./SearchContainer.react');
var SelectedProblems = require('./SelectedProblems.react');

var MainSection = React.createClass({
    render: function() {
        return(
            <div>
                <SearchContainer searchTerm={this.props.searchTerm} searchResults={this.props.searchResults}/>
                <br />
                <br />
                <div className="selected">
                    <SelectedProblems selected={this.props.selectedProblems} />
                </div>
            </div>
        );
    }
});

module.exports = MainSection;