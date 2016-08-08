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
                    <div className="left">
                        <input type="password" placeholder="Password"/><br />
                    </div>
                    <div className="right">
                        <input type="password" placeholder="Confirm Password"/>
                    </div>
                    <div className = "left">
                        <input type="number" placeholder="Age"/>
                    </div>
                    <div className="right">
                        <input type="number" placeholder="Phone"/>
                    </div>
                    <input type="text" placeholder="Promo link (if any)" /> <br />
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
        console.log(input);
        var data = {
            name: input[1].value,
            email: input[2].value,
            phone: input[7].children[0].value,
            password: input[4].children[0].value,
            confirmPassword: input[5].children[0].value,
            age: input[6].children[0].value,
            promoLink: input[8].value,
            male: input[10].children[0].checked,
            female: input[10].children[1].checked,
        }
        console.log(data);
        UserActions.signup(data);
    }
});

module.exports = SignupPage;
