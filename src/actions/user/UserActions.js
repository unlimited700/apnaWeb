import alt from '../../alt';

class UserActions {
    login(user, pass) {
        return {user: user, pass: pass};
    }
    
    signup() {
        
    }
    
    isAuthenticated() {
        
    }

    logout() {
        return 1;
    }
    
    
}

module.exports = alt.createActions(UserActions);