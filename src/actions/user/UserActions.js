import alt from '../../alt';

class UserActions {
    addProblem(prob, type) {
        return {
            problem: prob,
            probType: type
        };
    }
    addSolution(problem) {
        return problem;
    }
    login(user, pass) {
        return {user: user, pass: pass};
    }
    
    signup(data) {
        return data;
    }
    
    isAuthenticated() {
        
    }

    logout() {
        return 1;
    }
    
    
}

module.exports = alt.createActions(UserActions);