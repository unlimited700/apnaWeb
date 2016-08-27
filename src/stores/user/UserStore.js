import React from 'react';
import alt from '../../alt';
import UserActions from '../../actions/user/UserActions';
import EmailUtility from '../../utilities/Email';
import APIService from '../../services/APIService';

class UserStore {

    constructor() {
        this.loginError = "";
        this.signupError = "";
        this.statusMessage = "";
        this.isRecommendationLoading = false;
        this.unverifiedProblems = [];
        this.unverifiedSolutions = [];
        this.unverifiedMappings = [];
        this.addedProblemStatus = "";
        this.addedSolutionStatus = "";
        this.recommendedYoga = [];
        this.verifiedStatus = "";
        this.isLoggedIn = false;
        this.isAdmin = function() {
            return this.user.role == "ADMIN"
        };
        this.isModerator = function() {
            return this.user.role == "MODERATOR"
        };

        if(localStorage.email) {
            this.isLoggedIn = true;
            this.user = {
                email: localStorage.email,
                token: localStorage.token,
                name: localStorage.name,
                uid: localStorage.uid,
                role: localStorage.role,
            }
        }
        else {
            this.user = {};
        }
        this.bindListeners({
            handleLogin: UserActions.LOGIN,
            handleLogout: UserActions.LOGOUT,
            handleSignup: UserActions.SIGNUP,
            handleAddProblem: UserActions.ADD_PROBLEM,
            handleAddSolution: UserActions.ADD_SOLUTION,
            handleVerify: UserActions.VERIFY,

            updateUnverifiedSolutions: UserActions.updateUnverifiedSolutions,
            updateUnverifiedProblems: UserActions.updateUnverifiedProblems,
            updateUnverifiedMappings: UserActions.updateUnverifiedMappings,
            deleteProblem: UserActions.deleteProblem,
            approveProblem: UserActions.approveProblem,
            deleteSolution: UserActions.deleteSolution,
            approveSolution: UserActions.approveSolution,
            deleteMapping: UserActions.deleteMapping,
            approveMapping: UserActions.approveMapping,

            sendFeedback: UserActions.sendFeedback,
        })
    }

    handleAddProblem(data) {
        var obj = this;
        if(data.problem === "" || data.probType === "") {
            this.setState({addedProblemStatus: "Please give some info to add."});
            return ;
        }

        obj.setState({addedProblemStatus: "Processing ..."});

        APIService.setProblems({
            problems: [data],
            uid: this.user.uid,
            authtoken: this.user.token
        }, response => {
            var message = "";
            if(response.responseCode == 200) {
                message = "Successfully added.";
            }
            else {
                message = "Something went wrong, please try again.";
            }

            obj.setState({addedProblemStatus: message});
            setTimeout(function() {
                obj.setState({addedProblemStatus: ""});
            }, 2000);
        });

    }

    handleAddSolution(data) {
        var obj = this;
        if(data.solution === "" || data.step === "") {
            obj.setState({addedSolutionStatus: "Please enter all solution details."})
            return ;
        }
        else {
            obj.setState({addedSolutionStatus: "Processing..."});
        }

        APIService.setSolution({
            solution: data,
            uid: this.user.uid,
            authtoken: this.user.token
        }, response => {
            var message = "";
            if(response.responseCode == 200) {
                message = "Successfully added.";
            }
            else {
                message = "Something went wrong, please try again.";
            }

            obj.setState({addedSolutionStatus: message});
            setTimeout(function() {
                obj.setStatus({addedSolutionStauts: ""});
            }, 2000);
        });

    }

    handleLogin(data) {
        var obj = this;
        if(!(data.user || !data.pass)) {
            obj.setState({loginError: "Please enter both email and password"})
            return ;
        }
        APIService.login(data, function(data){
            if(!data) {
                obj.setState( {
                   loginError: "Something went wrong, please try again"
                });
            }
            else if(data.responseCode !== 200) {
                obj.setState({
                    loginError: "Invalid email or password"
                });
            }
            else {
                localStorage.name = data.name;
                localStorage.token = data.token;
                localStorage.uid = data.userId;
                localStorage.email = data.userName;
                localStorage.role = data.role;
                // TODO Add role to user object
                obj.setState({
                    loginError: "Successfully logged in",
                    isLoggedIn: true,
                    user: {
                        name: data.name,
                        email: data.userName,
                        token: data.token,
                        uid: data.userId,
                        role: data.role,
                    }
                })
            }

            setTimeout(function() {
               obj.setState({loginError: ""});
            }, 2000);
        })
    }

    handleLogout() {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        this.setState({
            isLoggedIn: false,
            loginError: "",
            user: {}
        });
    }


    handleSignup(data) {
        var obj = this;
        var error = "";
        if(!data.name) {
            error = "Please enter a valid name";
        }
        else if(data.phone.length != 10) {
            error = "Phone number must be of 10 digits";

        }
        else if(!data.email || !EmailUtility.checkEmail(data.email)) {
            error = "Please enter a valid email address";
        }
        else if(!data.password) {
            error = "Please enter a password";
        }
        else if(!data.confirmPassword) {
            error = "Please confirm the password";
        }
        else if(data.password !== data.confirmPassword) {
            error = "Passwords didn't match";
        }
        else if(!data.age || parseInt(data.age) > 100 || parseInt(data.age) < 0) {
            error = "Please enter correct age";
        }
        else if(!data.male && !data.female) {
            error = "Please choose a gender";
        }
        if(error) {
            obj.setState({signupError: error});
        }
        else {
            data.sex = data.male ? "Male" : "Female";
            APIService.signup(data, response => {
                if(response.responseCode == 200) {
                    obj.setState({signupError: "Successfully signed up, please check your inbox."});
                }
                else {
                    obj.setState({signupError: response.message});
                }
                setTimeout(function() {
                    obj.setState({signupError: ""});
                }, 2000);
            });
        }


    }

    handleVerify(data) {
        var obj = this;
        obj.verifiedStatus = "Hold on ...";

        if(!EmailUtility.checkEmail(data.email)) {
            obj.verifiedStatus = "Invalid email or token.";
        }
        APIService.verify(data, response => {

            var message = "";
            if(response.responseCode == 200) {
                message = "Verified successfully, you can now login.";
            }
            else {
                message = response.message;
            }
            obj.setState({verifiedStatus: message});

        });
    }

    updateUnverifiedProblems() {
        var obj = this;
        APIService.getInactiveProblems({uid: obj.user.uid, authtoken: obj.user.token}, function(response) {
            if(response.responseCode == 200) {
                obj.setState({unverifiedProblems: response.problems});
            }

        });
    }
    updateUnverifiedSolutions() {
        var obj = this;

        APIService.getInactiveSolutions({uid: obj.user.uid, authtoken: obj.user.token}, response=> {
            if(response.responseCode == 200) {
                obj.setState({unverifiedSolutions: response.solutions});
            }
        });
    }

    updateUnverifiedMappings() {
        var obj = this;

        APIService.getInactiveMappings({uid: obj.user.uid, authtoken: obj.user.token}, response=> {
            if(response.responseCode == 200) {
                obj.setState({unverifiedMappings: response.recommendations});
            }
        })
    }

    deleteProblem(index) {
        var obj = this;
        var data = {uid: obj.user.uid, authtoken: obj.user.token, problem: obj.unverifiedProblems[index]};
        obj.setState({statusMessage: "Deleting problem..."});
        APIService.deleteProblem(data, response =>{
            if(response.responseCode == 200) {
                obj.unverifiedProblems.splice(index, 1);
                obj.setState({statusMessage: "Deleted"});
            }

            setTimeout(function() {
                obj.setState({statusMessage: ""})
            }, 2000);
        });
    }

    approveProblem(index) {
        var obj = this;
        var data = {uid: obj.user.uid, authtoken: obj.user.token, problem: obj.unverifiedProblems[index]};
        obj.statusMessage = "Approving...";
        APIService.approveProblem(data, response=> {
            if(response.responseCode == 200) {
                obj.unverifiedProblems.splice(index, 1);
                obj.setState({statusMessage: "Approved"});
            }
            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });
    }

    deleteSolution(index) {
        var obj = this;
        var data = {uid: obj.user.uid, authtoken: obj.user.token, solution: obj.unverifiedSolutions[index]};
        obj.statusMessage = "Deleting...";
        APIService.deleteSolution(data, response=> {
            if(response.responseCode == 200) {
                obj.unverifiedSolutions.splice(index, 1);
                obj.setState({statusMessage: "Deleted"});
            }
            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });
    }

    approveSolution(index) {
        var obj = this;
        var data = {uid: obj.user.uid, authtoken: obj.user.token, solution: obj.unverifiedSolutions[index]};
        obj.statusMessage = "Approving...";
        APIService.approveSolution(data, response=> {
            if(response.responseCode == 200) {
                obj.unverifiedSolutions.splice(index, 1);
                obj.setState({statusMessage: "Approved"});
            }
            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });
    }

    deleteMapping(index) {
        var obj = this;
        obj.setState({statusMessage: "Deleting..."})
        var data = {
            uid: obj.user.uid,
            authtoken: obj.user.token,
            problem: obj.unverifiedMappings[index].problem,
            solution: obj.unverifiedMappings[index].solution,
            doseId: obj.unverifiedMappings[index].doseId
        }
        APIService.deleteMapping(data, response => {
            if(response.responseCode == 200) {
                obj.unverifiedMappings.splice(index, 1);
                obj.setState({statusMessage: "Deleted"})
            }
            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });
    }


    approveMapping(index) {
        var obj = this;
        obj.setState({statusMessage: "Approving..."})
        var data = {
            uid: obj.user.uid,
            authtoken: obj.user.token,
            problem: obj.unverifiedMappings[index].problem,
            solution: obj.unverifiedMappings[index].solution,
            doseId: obj.unverifiedMappings[index].doseId
        }
        APIService.approveMapping(data, response => {
            if(response.responseCode == 200) {
                obj.unverifiedMappings.splice(index, 1);
                obj.setState({statusMessage: "Approved"})
            }
            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });
    }

    sendFeedback(data) {
        var obj = this;
        obj.setState({statusMessage: "Sending feedback, hold on"})

        APIService.sendFeedback(data, response => {
            if(response.responseCode == 200) {
                obj.setState({statusMessage: "Thanks for the feedback"});
            }

            setTimeout(function() {
                obj.setState({statusMessage: ""});
            }, 2000);
        });

    }


};


module.exports = alt.createStore(UserStore, 'UserStore');
