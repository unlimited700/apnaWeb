import React from 'react';
import SelectedProblems from '../search/SelectedProblems.react';
import SearchActions from '../../actions/search/SearchActions';
import SearchContainer from '../search/SearchContainer.react';

var AddProblem = React.createClass({
    componentWillMount() {
        SearchActions.updateSolutions();
    },

    render: function () {
        return (
            <div className="mapping-container">
                <h3>Map problem to solution</h3>
                <p>{this.props.Search.mappingStatus}</p>
                <div className="mapping-left">
                    <SearchContainer searchTerm={this.props.Search.mapping.problem.searchTerm} searchResults={this.props.Search.mapping.problem.searchResults} placeHolder="Search Problem" onChange={this.onProblemChange} onAdd={this.onProblemAdd} disabled={this.props.Search.mapping.selectedProblem.length}/>
                    <div className="selected">
                        {
                            this.props.Search.mapping.selectedProblem.length ? (
                                <div>
                                    <SelectedProblems selected={this.props.Search.mapping.selectedProblem} onDelete={this.onProblemDelete}/>
                                </div>
                            ): ""
                        }
                    </div>
                </div>
                <div className="mapping-right">
                    <SearchContainer searchTerm={this.props.Search.mapping.solution.searchTerm} searchResults={this.props.Search.mapping.solution.searchResults} placeHolder="Search Solution" onChange={this.onSolutionChange} onAdd={this.onSolutionAdd} disabled={false}/>
                    <div className="selected">
                        {
                            this.props.Search.mapping.selectedSolution.length ? (
                                <div>
                                    <SelectedProblems selected={this.props.Search.mapping.selectedSolution} onDelete={this.onSolutionDelete}/>
                                </div>
                            ): ""
                        }
                    </div>
                </div>
                <br /><br /><br />


                    { this.props.Search.mapping.selectedProblem.length && this.props.Search.mapping.selectedSolution.length ? (
                        <form onSubmit={this.mapProblemSolution} className="clear">
                            <div>
                                <select>
                                    <option>Duration(mins.)</option>
                                    {this.props.Search.mapping.mappingDuration.map(function(duration, index) {
                                        return (<option key={index}>{duration}</option>);
                                    })};
                                </select>
                                <select>
                                    <option>Days</option>
                                    {this.props.Search.mapping.mappingDays.map(function(days, index) {
                                        return (<option key={index}>{days}</option>);
                                    })};
                                </select>

                                <select>
                                    <option>Dose</option>
                                    {this.props.Search.mapping.mappingFrequency.map(function(freq, index) {
                                        return (<option key={index}>{freq}</option>);
                                    })};
                                </select>

                            </div>

                            <div>
                                <br />
                                <hr />
                                <button type="submit" className="green-btn">Add</button>
                            </div>
                        </form>

                    ) : ""}

            </div>
        );
    },
    onProblemChange(event) {
        SearchActions.mappingProblemSearch(event.target.value);
    },
    onProblemAdd(text) {
        SearchActions.mappingProblemAdd(text);
    },
    onSolutionChange(event) {
        SearchActions.mappingSolutionSearch(event.target.value);
    },
    onSolutionAdd(text) {
        SearchActions.mappingSolutionAdd(text);
    },
    onProblemDelete(index) {
        SearchActions.mappingProblemDelete(index);
    },
    onSolutionDelete(index) {
        SearchActions.mappingSolutionDelete(index);
    },
    mapProblemSolution(event) {
        event.preventDefault()
        var selects = event.target.children[0];
        var duration = parseInt(selects.children[0].value);
        var days = parseInt(selects.children[1].value);
        var freq = parseInt(selects.children[2].value);
        SearchActions.mapProblemSolution({
            duration: duration,
            frequency: freq,
            days: days
        });
    }




});

module.exports = AddProblem;
