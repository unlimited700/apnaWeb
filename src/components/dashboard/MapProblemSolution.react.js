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
                <p>{this.props.Search.mapping.status}</p>
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
                    <SearchContainer searchTerm={this.props.Search.mapping.solution.searchTerm} searchResults={this.props.Search.mapping.solution.searchResults} placeHolder="Search Solution" onChange={this.onSolutionChange} onAdd={this.onSolutionAdd} disabled={this.props.Search.mapping.selectedSolution.length}/>
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
                { this.props.Search.mapping.selectedProblem.length && this.props.Search.mapping.selectedSolution.length ? (
                    <div>
                        <br />
                        <br />
                        <hr />
                            <button type="submit" className="green-btn" onClick={this.mapProblemSolution}>Add</button>
                    </div>
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
    mapProblemSolution() {
        SearchActions.mapProblemSolution();
    }




});

module.exports = AddProblem;