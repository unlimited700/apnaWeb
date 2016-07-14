import React from 'react';
import alt from '../../alt';
import UserActions from '../../actions/user/UserActions';
import EmailUtility from '../../utilities/Email';
import APIService from '../../services/APIService';

class UserStore {

    constructor() {
        this.loginError = "";
        this.signupError = "";
        this.isRecommendationLoading = false;
        this.addedProblemStatus = "";
        this.addedSolutionStatus = "";
        this.recommendedYoga = [];
        this.verifiedStatus = "";
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
            handleAddSolution: UserActions.ADD_SOLUTION,
            handleVerify: UserActions.VERIFY
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


};


module.exports = alt.createStore(UserStore, 'UserStore');