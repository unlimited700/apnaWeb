import React from 'react';
import MainSection from './MainSection.react';
import SearchStore from '../../stores/search/SearchStore';
import AltContainer from 'alt-container';

var SearchApp = React.createClass({
    getInitialState: function() {
        return SearchStore.getState();
    },

    render: function() {
        return (
            <div>
                <AltContainer stores={{Search: SearchStore}}>
                    <MainSection />
                </AltContainer>

            </div>
        );
    },

});

module.exports = SearchApp;

