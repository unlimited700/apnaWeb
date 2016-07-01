import React from 'react';
import UserActions from '../actions/user/UserActions';
var SignupPage = React.createClass({

    render() {
        return (
            <div className="search-container signup-container">
                <center><h3>Signup</h3></center>
                <form className="signup-form form form-container" onSubmit={ this._signup }>
                    <p>{this.props.User.signupError}</p>
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="example@example.com"/><br />
                    <input type="number" placeholder="Phone"/>
                    <input type="password" placeholder="Password"/><br />
                    <input type="number" placeholder="Age"/>
                    <div className="inline" >
                        <input type="radio" name="gender" value="Male" /> Male
                        <input type="radio" name="gender" value="Female"/> Female
                    </div>
                    <br /><br />
                    <button>Signup</button>
                </form>
            </div>
        );
    },

    _signup(event) {
        event.preventDefault();
        var input = event.target.children;
        var data = {
            name: input[1].value,
            email: input[2].value,
            phone: input[4].value,
            password: input[5].value,
            age: input[7].value,
            male: input[8].children[0].checked,
            female: input[8].children[1].checked,
        }
        UserActions.signup(data);
    }
});

module.exports = SignupPage;