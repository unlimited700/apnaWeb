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

    logout() {
        return 1;
    }

    verify(data) {
        return data;
    }
    updateUnverifiedSolutions() {
        return true;
    }
    updateUnverifiedProblems() {
        return true;
    }
    updateUnverifiedMappings() {
        return true;
    }


    deleteProblem(index) {
        return index;
    }
    approveProblem(index) {
        return index;
    }


    deleteSolution(index) {
        return index;
    }
    approveSolution(index) {
        return index;
    }


    deleteMapping(index) {
        return index;
    }
    approveMapping(index) {
        return index;
    }

    sendFeedback(data) {
        return data;
    }

}

module.exports = alt.createActions(UserActions);
