var React = require('react');

var MainSection = require('./MainSection.react');
var SearchStore = require('../../stores/search/SearchStore');

function getSearchState() {
    return {
        all: SearchStore.all(),
        selected: SearchStore.selected()
    }
}

var SearchApp = React.createClass({
    getInitialState: function() {
        return getSearchState();
    },

    componentDidMount: function() {
        SearchStore.addChangeListener(this._onChange);
    },

    componentWillMount: function() {
        SearchStore.removeChangeListener(this._onChange);
    },
    render: function() {
        return (
            <div>

                <MainSection
                    all = { this.state.all }
                    selected = { this.state.selected }
                />

            </div>
        );
    },

    _onChange: function() {
        this.setState(getSearchState());
    }

});

module.exports = SearchApp;

