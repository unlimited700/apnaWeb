import React from 'react';
import { Link } from 'react-router';

import SearchActions from '../../actions/search/SearchActions';
import SearchContainer from '../search/SearchContainer.react';
import SelectedProblems from '../search/SelectedProblems.react';

var RecommendationHeader = React.createClass({
    
    render: function () {   
        return (
            <div>
                <SearchContainer searchTerm={this.props.Search.searchTerm} searchResults={this.props.Search.searchResults} placeHolder="Search" onChange={this.onChange} onAdd={this.onAdd}/>
                <div className="selected">
                    {
                        this.props.Search.selectedProblems.length ? (
                            <div>
                                <SelectedProblems selected={this.props.Search.selectedProblems}/>
                            </div>
                        ): ""
                    }
                </div>
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
    },
    onChange(event) {
        SearchActions.search(event.target.value);
    },
    onAdd: function(index) {
        SearchActions.add(index);
        SearchActions.recommend();
    }
    
});



module.exports = RecommendationHeader;