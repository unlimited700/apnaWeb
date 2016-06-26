import React from 'react';
import UserActions from '../actions/user/UserActions';
var LoginPage = React.createClass({

    componentWillMount() {
        if(this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    },
    render() {
        return (
            <div>
                <center><h3>Login</h3></center>
                <form className="form-container login-form" onSubmit={ this._login }>
                    <p>{this.props.loginError}</p>
                    <input type="text" placeholder="Username"/><br />
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

    }
});

module.exports = LoginPage;