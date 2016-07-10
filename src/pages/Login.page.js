import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../actions/user/UserActions';
import SearchActions from '../actions/search/SearchActions';
import { VelocityComponent } from 'velocity-react';


var LoginPage = React.createClass({

    componentWillReceiveProps(nextProps) {
        if(nextProps.User.isLoggedIn) {
            this.props.router.push('/');
        }
    },
    render() {
        return (
            <VelocityComponent animation={{ opacity: 1 }} duration={2000}>
            <div className="search-container">
                <center><h3>Signin</h3></center>
                <form className="form-container login-form" onSubmit={ this._login }>
                    <p>{this.props.User.loginError}</p>
                    <input type="email" placeholder="Email"/><br />
                    <input type="password" placeholder="Password"/><br /><br />

                    <button>Signin</button>
                </form>

            </div>
            </VelocityComponent>
        );
    },

    _login(event) {
        event.preventDefault();
        var user =  event.target.children[1].value;
        var pass = event.target.children[3].value;
        UserActions.login(user, pass);
        event.target.children[1].value = "";
        event.target.children[3].value = "";
        SearchActions.updateSolutions();
    }
});

module.exports = withRouter(LoginPage);