import React from 'react';
import SolutionDescription from './SolutionDescription.react'

var RemediesComponent = React.createClass({
    getInitialState() {
        return {
            currentlyActive: -1
        }
    },
    render: function () {
        if(this.props.Search.isRecommendationLoading) {
            return (<center>Loading...</center>);
        }
        else if(!this.props.Search.recommendation.recommendedRemedies.length) {
            return (<center>Sorry, No results found.</center>);
        }
        else {

            return (

                <ul className="solution-container" onClick={this.onClick}>
                    { this.props.Search.recommendation.recommendedRemedies.map((ob, i) => {
                        var onClick = this.onClick.bind(this, i);
                        return (
                            <div key={i}>
                                <li data-tag={i} onClick={onClick}>{ob.solution} </li>
                                <SolutionDescription data-tag={i} isActive={this.state.currentlyActive == i}
                                                     content={ob}/>
                            </div>
                        );
                    })}

                </ul>
            )
        }
    },

    onClick: function (id) {
        var id = parseInt(id);
        if(id >= 0) {
            if(this.state.currentlyActive == id)
                id = -1;
            this.setState({
                currentlyActive: id
            })
        }
    }
});

module.exports = RemediesComponent;