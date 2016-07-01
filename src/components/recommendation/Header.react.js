import React from 'react';
import { Link } from 'react-router';

import SearchContainer from '../search/SearchContainer.react';
import SelectedProblems from '../search/SelectedProblems.react';
import SearchActions from '../../actions/search/SearchActions';

var RecommendationHeader = React.createClass({
    
    render: function () {   
        return (
            <div>
                <SearchContainer searchTerm={this.props.searchTerm} searchResults={this.props.searchResults} onChange={ this._searchQuery }/>
                <div className="header">
                    <ul className="tabs">
                        <li><Link to="/recommend"  activeClassName="active" onlyActiveOnIndex={true}> Yoga </Link></li>
                        <li><Link to="/recommend/food"  activeClassName="active"> Food </Link></li>
                        <li><Link to="/recommend/remedies" activeClassName="active"> Remedies </Link></li>
                        <li><Link to="/recommend/doctors" activeClassName="active"> Doctors </Link></li>
                    </ul>
                </div>
            </div>
        )
    }
    
});



module.exports = RecommendationHeader;