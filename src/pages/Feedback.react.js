import React from 'react';
var ReCAPTCHA = require("react-recaptcha");
import UserActions from '../actions/user/UserActions';

var Feedback = React.createClass({
    getInitalState: function() {
        return { captcha: ""};
    },
    render: function() {
        return (
            <div className="search-container">
                { this.props.User.statusMessage }
                <form onSubmit={this.onSubmit} className="form-container">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email"/>
                    <textarea placeholder="Enter your suggestion or query here" rows="5" cols="27"></textarea>
                    <ReCAPTCHA sitekey="6LfPKicTAAAAAIppdBaRWzMiTGflG0uGb8G3pil6" render="explicit" verifyCallback={ this.captchaOnChange } onloadCallback= {this.onLoad}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    },
    onLoad: function() {
    },
    onSubmit: function(e) {
        e.preventDefault();
        var name = e.target.children[0].value;
        var email = e.target.children[1].value;
        var message = e.target.children[2].value;
        var captcha = this.state.captcha;
        UserActions.sendFeedback({name: name, email: email, message: message, captcha: captcha});
    },
    captchaOnChange: function(value) {
        this.setState({captcha: value});
    }
});

module.exports = Feedback;
