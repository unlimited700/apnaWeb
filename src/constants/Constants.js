var Constants = {
    SEARCH: 'query',

    api: {
        GET_PROBLEMS: 'http://localhost:3007/v1/problems',
        PUBLIC_CREDENTIALS: {
            uid: 1,
            authtoken: 'e8008f83-9f70-4df0-b7ea-676b22d9d335-malikanshul29@gmail.com-1466419597165'
        }
    },

    ActionConstants: {
        RECIEVED_PROBLEMS: 'recieved_problems',
        PROBLEM_ADD: 'problem_add',
        PROBLEM_DESTROY: 'problem_destroy'
    }
    
}

module.exports = Constants;
