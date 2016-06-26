import React from 'react';
import { Link } from 'react-router';

import DocumentTitle from 'react-document-title';
import Header from './Header.react';
import UserStore from '../stores/user/UserStore';
import AltContainer from 'alt-container';
var MasterPage = React.createClass({

    render() {
        return (
            <DocumentTitle title="ApnaVaidya">
                <div>
                    <AltContainer store={UserStore}>
                        <Header history={this.props.history}/>
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