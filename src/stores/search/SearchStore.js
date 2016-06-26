import alt from '../../alt';
import C from '../../constants/Constants';

import 'whatwg-fetch';

var SearchActions = require('../../actions/search/SearchActions');


class SearchStore {

    constructor() {
        this.selectedProblems = [];
        this.searchResults = [];
        this.searchTerm = "";

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

        fetch(C.api.API_HOME + C.api.GET_PROBLEMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'uid': C.api.PUBLIC_CREDENTIALS.uid,
                'authtoken': C.api.PUBLIC_CREDENTIALS.authtoken,
                'Origin': 'http://localhost:8080',
                'Access-Control-Allow-Origin': 'http://localhost:8080'
            }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                object.allProblems = data.problems;
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

}

module.exports = alt.createStore(SearchStore, 'SearchStore');


/**
 *
 var request = new XMLHttpRequest();
 request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};
 request.open('GET', 'http://localhost:3007/v1/problems');
 request.setRequestHeader('uid', 1);
 request.setRequestHeader('authtoken', 'e8008f83-9f70-4df0-b7ea-676b22d9d335-malikanshul29@gmail.com-1466419597165');
 request.setRequestHeader('Content-Type', 'application/json');
 *request.send()
*/