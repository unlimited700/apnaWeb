import FilterResponse from '../utilities/FilterResponse';
import Constants from '../constants/Constants';
import 'whatwg-fetch';
var apiHome = '/api/v1';

var endpoints = {
    getProblems: apiHome + '/problems',
    login: apiHome + '/login',
    signup: apiHome + '/signup',
    setSolution: apiHome + '/solution',
    mapSymptom: apiHome + '/problem-symptom-mapping',
    uploadProblemSolution: apiHome + '/upload-problem-solution',
    setProblem: apiHome + '/problem',
    recommend: apiHome + '/recommend',
}


var defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type' : 'application/json',
    'authtoken': 'apnavadiya!@#'
}
var publicHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'uid': Constants.publicCredentials.uid,
    'authtoken': Constants.publicCredentials.authtoken,
}

var APIService = {

    getProblems: function(cb) {
        fetch(endpoints.getProblems, {
            method: 'GET',
            headers: publicHeaders
        }).then(FilterResponse).then(cb);

    },

    getRecommendations: function(data, cb) {
        
        fetch(endpoints.recommend, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({
                problems: data
            })
        }).then(FilterResponse).then(cb);
    },

    login: function(data, cb) {

        fetch(endpoints.login, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify({
                userName: data.user,
                password: data.pass
            })
        }).then(FilterResponse).then(cb);
    },

    signup: function(data, cb) {

        fetch(endpoints.signup, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        }).then(FilterResponse).then(cb);
    },
};

module.exports = APIService;


