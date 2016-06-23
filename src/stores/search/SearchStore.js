var alt = require('../../alt');
var C = require('../../constants/Constants');

import 'whatwg-fetch';

var SearchActions = require('../../actions/search/SearchActions');

class SearchStore {

    constructor() {
        this.allProblems = ["cough", "cold", "fever"];
        this.selectedProblems = [];
        this.searchResults = [];
        this.searchTerm = "";

        fetch(C.api.APP_HOME + C.api.GET_PROBLEMS, {
            method: 'GET',
            headers: {
                contentType: 'application/json',
                uid: C.api.PUBLIC_CREDENTIALS.uid,
                authToken: C.api.PUBLIC_CREDENTIALS.authToken
            }
            })
            .then(function(response){
               console.log(response);
            });

        this.bindListeners({
            handleSearch: SearchActions.SEARCH,
            handleDelete: SearchActions.DELETE,
            handleAdd: SearchActions.ADD
        });
    }
    handleSearch(text) {
        this.searchResults = [];
        this.searchTerm = text;
        if(!text) {
            return;
        }

        for( var problem in this.allProblems) {
            if(this.allProblems[problem].match(text))
                this.searchResults.push(this.allProblems[problem]);
        }
    };
    handleAdd(index) {
        var added = this.allProblems.splice(index, 1)[0];
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

}

module.exports = alt.createStore(SearchStore, 'SearchStore');