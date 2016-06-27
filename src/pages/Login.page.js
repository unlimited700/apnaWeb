import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../actions/user/UserActions';
var LoginPage = React.createClass({

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn) {
            this.props.router.push('/');
        }
    },
    render() {
        return (
            <div>
                <center><h3>Login</h3></center>
                <form className="form-container login-form" onSubmit={ this._login }>
                    <p>{this.props.loginError}</p>
                    <input type="email" placeholder="Email"/><br />
                    <input type="password" placeholder="Password"/><br /><br />

                    <button>Login</button>
                </form>

            </div>
        );
    },

    _login(event) {
        event.preventDefault();
        var user =  event.target.children[1].value;
        var pass = event.target.children[3].value;
        UserActions.login(user, pass);
        event.target.children[1].value = "";
        event.target.children[3].value = "";
    }
});

module.exports = withRouter(LoginPage);