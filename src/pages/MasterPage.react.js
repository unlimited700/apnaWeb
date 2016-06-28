import React from 'react';
import { Link } from 'react-router';

import DocumentTitle from 'react-document-title';
import Header from './../components/Header.react.js';
import UserStore from '../stores/user/UserStore';
import AltContainer from 'alt-container';
var MasterPage = React.createClass({

    render() {
        return (
            <DocumentTitle title="ApnaVaidya">
                <div>
                    <AltContainer store={UserStore}>
                        <Header />
                    </AltContainer>
                    <AltContainer store={UserStore}>

                        {this.props.children}
                    </AltContainer>
                </div>
            </DocumentTitle>
        );
    }
});

module.exports = MasterPage;