import React from 'react';
import AltContainer from 'alt-container';
import Header from '../components/recommendation/Header.react';
import Footer from '../components/recommendation/Footer.react';
import UserStore from '../stores/user/UserStore';
import SearchStore from '../stores/search/SearchStore';

var RecommendPage = React.createClass({

    render: function () {
        return (

            <div className="recommend-container">
                <Header />
                <div className="content">
                    <AltContainer store={SearchStore}>
                        { this.props.children }
                    </AltContainer>
                </div>
                <Footer />
            </div>
        )
    }

});



module.exports = RecommendPage;