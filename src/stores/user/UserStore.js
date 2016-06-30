import React from 'react';
import alt from '../../alt';
import UserActions from '../../actions/user/UserActions';
import SearchActions from '../../actions/search/SearchActions';
import APIService from '../../services/APIService';

class UserStore {

    constructor() {
        this.loginError = "";
        this.signupError = "";
        this.isRecommendationLoading = false;
        this.addedProblemStatus = "";
        this.recommendedYoga = [];
        this.isLoggedIn = false;
        if(localStorage.email) {
            this.isLoggedIn = true;
            this.user = {
                email: localStorage.email,
                token: localStorage.token,
                name: localStorage.name,
                uid: localStorage.uid
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
            handleAddSolution: UserActions.ADD_SOLUTION
        })
    }

    handleAddProblem(data) {
        if(data.problem === "" || data.probType === "") {
            this.setState({addedProblemStatus: "Please give some info to add."});
            return ;
        }

        this.setState({addedProblemStatus: "Processing ..."});

        APIService.setProblems({
            problems: [data],
            uid: this.user.uid,
            authtoken: this.user.token
        }, function(response) {
            var message = "";
            if(response.responseCode == 200) {
                message = "Successfully added.";
            }
            else {
                message = "Something went wrong, please try again.";
            }

            this.setState({addedProblemStatus: message});
        });

    }

    handleAddSolution(data) {
        if(data.solution === "" || data.step === "") {
            this.setState({addedSolutionStatus: "Please enter all solution details."})
            return ;
        }
        else {
            this.setState({addedSolutionStatus: "Processing..."});
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
                message = "Something went wrong, please tryy again.";
            }

            this.setState({addedSolutionStatus: message});
        });

    }

    handleLogin(data) {
        if(!(data.user || !data.pass)) {
            this.setState({loginError: "Please enter both email and password"})
            return ;
        }
        var obj = this;
        APIService.login(data, function(data){
            if(!data) {
                obj.setState( {
                   loginError: "Something went wrong, please try again"
                });
            }
            else if(data.responseCode != 200) {
                obj.setState({
                    loginError: "Invalid email or password"
                });
            }
            else {
                localStorage.name = data.name;
                localStorage.token = data.token;
                localStorage.uid = data.userId;
                localStorage.email = data.userName;

                obj.setState({
                    loginError: "Successfully Loggged in",
                    isLoggedIn: true,
                    user: {
                        name: data.name,
                        email: data.userName,
                        token: data.token,
                        uid: data.userId
                    }
                })
            }
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
        var error = "";
        if(!data.name) {
            error = "Please enter a valid name";
        }
        else if(!data.email) {
            error = "Please enter a valid email address";
        }
        else if(!data.password) {
            error = "Please enter a password";
        }
        else if(!data.age) {
            error = "Please specify your age";
        }
        else if(!data.male && !data.female) {
            error = "Please choose a gender";
        }
        if(error) {
            this.setState({signupError: error});
        }
        else {
            data.sex = data.male ? "Male" : "Female";
            APIService.signup(data, response => {
                if(response.responseCode == 200) {
                    this.setState({signupError: "Successfully signed up, you can now login."});
                }
                else {
                    this.setState({signupError: response.message});
                }
            });
        }


    }


};


module.exports = alt.createStore(UserStore, 'UserStore');