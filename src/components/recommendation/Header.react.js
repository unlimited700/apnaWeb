import React from 'react';
import { Link } from 'react-router';

var RecommendationHeader = React.createClass({
    
    render: function () {
        return (
            <div className="header">
                <ul className="tabs">
                    <li><Link to="/recommend"  activeClassName="active" onlyActiveOnIndex={true}> Yoga </Link></li>
                    <li><Link to="/recommend/food"  activeClassName="active"> Food </Link></li>
                    <li><Link to="/recommend/remedies" activeClassName="active"> Remedies </Link></li>
                    <li><Link to="/recommend/doctors" activeClassName="active"> Doctors </Link></li>
                </ul>
            </div>
        )
    }
    
});



module.exports = RecommendationHeader;