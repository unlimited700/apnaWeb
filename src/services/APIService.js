import FilterResponse from '../utilities/FilterResponse';
import Constants from '../constants/Constants';
import 'whatwg-fetch';

import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

var apiHome = '/api/v1';

var endpoints = {
    getProblems: apiHome + '/problems',
    getActiveProblems: apiHome + '/admin/inactive-problems',
    getInactiveSolutions: apiHome + '/admin/inactive-solutions',
    getInactiveMapping: apiHome + '/admin/inactive-recommend',
    deleteProblems: apiHome + '/admin/delete-problems',
    approveProblems: apiHome + '/admin/approve-problems',
    deleteSolutions: apiHome + '/admin/delete-solutions',
    approveSolutions: apiHome + '/admin/approve-solutions',
    deleteMappings: apiHome + '/admin/delete-problem-solution',
    approveMappings: apiHome + '/admin/approve-problem-solution',
    getSolutions: apiHome + '/solutions',
    login: apiHome + '/login',
    signup: apiHome + '/signup',
    setSolution: apiHome + '/solution',
    mapProblemSolution: apiHome + '/upload-problem-solution',
    setProblem: apiHome + '/problem',
    recommend: apiHome + '/recommend',
    verify: apiHome + '/verify'
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

    getInactiveProblems: function(data, cb) {
        NProgress.start();
        fetch(endpoints.getActiveProblems, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            }
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

    getInactiveSolutions: function(data, cb) {
        NProgress.start();
        fetch(endpoints.getInactiveSolutions, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            }
        }).then(FilterResponse).then(cb);
    },

    getInactiveMappings: function(data, cb) {
        NProgress.start();
        fetch(endpoints.getInactiveMapping, {
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
                problemSolutionDose: data.solution
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

    verify: function (data, cb) {
        NProgress.start();
        fetch(endpoints.verify, {
            method: 'POST',
            headers: publicHeaders,
            body: JSON.stringify(data),
        }).then(FilterResponse).then(cb);
    },

    deleteProblem: function (data, cb) {
        NProgress.start();
        fetch(endpoints.deleteProblems, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                problems: [data.problem]
            })
        }).then(FilterResponse).then(cb);
    },

    approveProblem: function (data, cb) {
        NProgress.start();
        fetch(endpoints.approveProblems, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken,
            },
            body: JSON.stringify({
                problems: [data.problem]
            }),
        }).then(FilterResponse).then(cb);
    },

    deleteSolution: function (data, cb) {
        NProgress.start();
        fetch(endpoints.deleteSolutions, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                solutions: [data.solution]
            })
        }).then(FilterResponse).then(cb);
    },

    approveSolution: function (data, cb) {
        NProgress.start();
        fetch(endpoints.approveSolutions, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken,
            },
            body: JSON.stringify({
                solutions: [data.solution]
            }),
        }).then(FilterResponse).then(cb);
    },

    approveMapping: function (data, cb) {
        NProgress.start();
        fetch(endpoints.approveMappings, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                problemSolutionDose: [{
                    problem: data.problem,
                    solution: data.solution,
                    rating: "1",
                    doseId: "" +data.doseId
                }]
            })
        }).then(FilterResponse).then(cb);
    },

    deleteMapping: function (data, cb) {
        NProgress.start();
        fetch(endpoints.deleteMappings, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uid: data.uid,
                authtoken: data.authtoken
            },
            body: JSON.stringify({
                problemSolutionDose: [{
                    problem: data.problem,
                    solution: data.solution,
                    rating: "1",
                    doseId: "" +data.doseId
                }]
            })
        }).then(FilterResponse).then(cb);
    }

};

module.exports = APIService;
