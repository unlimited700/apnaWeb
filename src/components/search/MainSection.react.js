import React from 'react';
import SearchContainer from './SearchContainer.react';
import SelectedProblems from './SelectedProblems.react';

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