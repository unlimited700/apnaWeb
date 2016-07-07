import FilterResponse from '../utilities/FilterResponse';
import Constants from '../constants/Constants';
import 'whatwg-fetch';

import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

var apiHome = '/api/v1';

var endpoints = {
    getProblems: apiHome + '/problems',
    getSolutions: apiHome + '/solutions',
    login: apiHome + '/login',
    signup: apiHome + '/signup',
    setSolution: apiHome + '/solution',
    mapProblemSolution: apiHome + '/upload-problem-solution',
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
        NProgress.start();
        fetch(endpoints.getProblems, {
            method: 'GET',
            headers: publicHeaders
        }).then(FilterResponse).then(cb);

    },

    getRecommendations: function(data, cb, err) {
        NProgress.start();
        fetch(endpoints.recommend, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify({
                problems: data
            })
        }).then(FilterResponse).then(cb).catch(err);
    },

    getSolutions: function(data, cb) {
        NProgress.start();
        fetch(endpoints.getSolutions, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            }
        }).then(FilterResponse).then(cb);
    },

    login: function(data, cb) {
        NProgress.start();
        fetch(endpoints.login, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify({
                userName: data.user,
                password: data.pass
            })
        }).then(FilterResponse).then(cb);
    },

    mapProblemSolution(data, cb) {
        NProgress.start();
        fetch(endpoints.mapProblemSolution, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth: defaultHeaders.authtoken,
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                problemSolutionDose: [data.solution]
            })
        }).then(FilterResponse).then(cb);
    },
    setProblems: function (data, cb) {
        NProgress.start();
        fetch(endpoints.setProblem, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'uid': data.uid,
                'authtoken': data.authtoken
            },
            body: JSON.stringify({
                problems: data.problems
            })

        }).then(FilterResponse).then(cb);

    },

    setSolution(data, cb) {
        NProgress.start();
        fetch(endpoints.setSolution, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth: defaultHeaders.authtoken,
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                solutions: [data.solution]
            })
        }).then(FilterResponse).then(cb);
    },

    signup: function(data, cb) {
        NProgress.start();
        fetch(endpoints.signup, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        }).then(FilterResponse).then(cb);
    },
};

module.exports = APIService;


