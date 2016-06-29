import alt from '../../alt';
import APIService from '../../services/APIService';

var SearchActions = require('../../actions/search/SearchActions');


class SearchStore {

    constructor() {
        this.selectedProblems = [];
        this.searchResults = [];
        this.searchTerm = "";
        this.recommendation = [];
        this.isRecommendationLoading = true;
        var object = this;

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function json(response) {
            return response.json()
        }

        APIService.getProblems(function(data) {
                object.allProblems = data.problems;
            });

        this.bindListeners({
            handleAdd: SearchActions.ADD,
            handleDelete: SearchActions.DELETE, 
            handleSearch: SearchActions.SEARCH,
            handleRecommend: SearchActions.RECOMMEND,
        });
    }



    handleAdd(text) {
        var added = this.allProblems.splice(this.allProblems.indexOf(text), 1)[0];
        if(added) {
            this.selectedProblems.push(added);
        }
        this.searchTerm = "";
        this.searchResults = [];
        return true;
    }

    handleDelete(index) {
        var deleted = this.selectedProblems.splice(index, 1)[0];
        if(deleted) {
            this.allProblems.push(deleted);
        }
        return true;
    }

    handleRecommend() {
        this.setState({isRecommendationLoading: true});
        APIService.getRecommendations(this.selectedProblems, response => {
            this.setState({
                isRecommendationLoading: false,
                recommendation: response
            });
        })
    }


    handleSearch(text) {
        this.searchResults = [];
        this.searchTerm = text;
        if(!text) {
            return;
        }
        var pattern = new RegExp("^"+text, 'g');

        for( var problem in this.allProblems) {
            if(this.allProblems[problem].toLowerCase().match(pattern)) {
                this.searchResults.push(this.allProblems[problem])
            }
        }
        for( var problem in this.allProblems) {
            if(!(this.searchResults.indexOf(this.allProblems[problem]) > -1 ) && this.allProblems[problem].toLowerCase().match(text) )
                this.searchResults.push(this.allProblems[problem]);
        }
    }



}

module.exports = alt.createStore(SearchStore, 'SearchStore');
