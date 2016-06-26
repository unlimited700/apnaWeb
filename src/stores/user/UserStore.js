import React from 'react';
import alt from '../../alt';
import UserActions from '../../actions/user/UserActions';
import C from '../../constants/Constants';
import FilterResponse from '../../utilities/FilterResponse';

import 'whatwg-fetch';

class UserStore {

    constructor() {
        this.loginError = "";
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
            handleLogout: UserActions.LOGOUT
        })
    }



    handleLogin(data) {
        if(!(data.user || data.pass)) {
            this.setState({loginError: "Please enter username and password"})
            return ;
        }
        var obj = this;
        fetch(C.api.API_HOME + C.api.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': 'apnavadiya!@#'
            },
            body: JSON.stringify({
                userName: data.user,
                password: data.pass
            })
        }).then(FilterResponse).then(function(data) {
            if(data.responseCode != 200) {
                obj.setState({loginError: "Invalid username or password"});
            }
            else {
                localStorage.username = data.name;
                localStorage.token = data.token;
                localStorage.uid = data.userId;
                localStorage.email = data.userName;
                obj.user = {
                    name: data.name,
                    email: data.userName,
                    token: data.token,
                    uid: data.userId
                };
            }
        })
    }

    handleLogout() {
        localStorage.username = "";
        localStorage.token = "";
        localStorage.uid="";
        localStorage.email = "";
        this.isLoggedIn = false;
        this.user= {};
    }


};


module.exports = alt.createStore(UserStore, 'UserStore');