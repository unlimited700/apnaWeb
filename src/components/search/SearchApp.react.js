var React = require('react');

var MainSection = require('./MainSection.react');
var SearchStore = require('../../stores/search/SearchStore');
var AltContainer = require('alt-container');

var SearchApp = React.createClass({
    getInitialState: function() {
        return SearchStore.getState();
    },

    render: function() {
        return (
            <div>
                <AltContainer store={SearchStore}>
                    <MainSection />
                </AltContainer>

            </div>
        );
    },

    _onChange: function() {
        this.setState(SearchStore.getState());
    }

});

module.exports = SearchApp;

