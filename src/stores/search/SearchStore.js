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

        APIService.getProblems(data => {
            this.setState({allProblems: data.problems});
            this.handleSearch();
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
        if(this.selectedProblems.length) {
            APIService.getRecommendations(this.selectedProblems, response => {
                this.setState({
                    isRecommendationLoading: false,
                    recommendation: response
                });
            })
        }
        else {
            this.setState({
                isRecommendationLoading: false,
                recommendation: {
                    recommendedYoga: [],
                    recommendedFood: [],
                    recommendedRemedies: [],
                    recommendedDoctors: []
                }
            })
        }
    }


    handleSearch(text=this.searchTerm) {
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
