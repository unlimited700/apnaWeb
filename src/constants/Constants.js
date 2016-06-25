var Constants = {
    SEARCH: 'query',
    api: {
        APP_HOME: '/api',
        GET_PROBLEMS: '/v1/problems',
        PUBLIC_CREDENTIALS: {
            uid: 1,
            authtoken: '5713b9d6-dbc6-415e-b8d1-db3be2961793-jpradeep.93@gmail.com-1460293796095'
        }
    },

    ActionConstants: {
        RECIEVED_PROBLEMS: 'recieved_problems',
        PROBLEM_ADD: 'problem_add',
        PROBLEM_DESTROY: 'problem_destroy'
    }
}

module.exports = Constants;
