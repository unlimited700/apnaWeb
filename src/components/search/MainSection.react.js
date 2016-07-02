import React from 'react';
import SearchActions from '../../actions/search/SearchActions';
import SearchContainer from './SearchContainer.react';
import SelectedProblems from './SelectedProblems.react';
import {withRouter} from 'react-router';

var MainSection = React.createClass({
    componentWillReceiveProps(nextProps) {
        if(nextProps.Search.selectedProblems.length) {
            this.props.router.push('/recommend');
        }
    },
    render: function() {
        return(
            <div>
                <br />
                <center><h2>apnaVaidya</h2></center>
                <SearchContainer searchTerm={this.props.Search.searchTerm} searchResults={this.props.Search.searchResults} placeHolder="Search" onChange={this.onChange} onAdd={this.onAdd} disabled={false}/>
                <br />
                <br />
                <div className="selected">
                    {
                        this.props.Search.selectedProblems.length ? (
                            <div>
                                <SelectedProblems selected={this.props.Search.selectedProblems} onDelete={this.onDelete}/>
                            </div>
                        ): ""
                    }
                </div>
            </div>
        );
    },

    onChange(event) {
        SearchActions.search(event.target.value);
    },
    onAdd: function(index) {
        SearchActions.add(index);
        SearchActions.recommend();
    },
    onDelete: function (index) {
        SearchActions.delete(index);
        SearchActions.recommend();
    }



});

module.exports = withRouter(MainSection);