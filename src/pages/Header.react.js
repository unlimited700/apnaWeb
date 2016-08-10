import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img src="/img/logo.PNG" className="header-logo"/>
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/recommend" activeClassName="active">Search</Link></li>
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/logout">Logout</Link>) : <Link to="/login" activeClassName="active">Signin</Link>}
                        </li>

                        { this.props.User.isLoggedIn ? ( <li className="welcome-li">Welcome {this.props.User.user.name}</li>): ( <li><Link to="/signup" activeClassName="active">Signup</Link></li>)}
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/dash" activeClassName="active">Dashboard</Link>) : (<Link to="/about" activeClassName="active">About Us</Link>)}
                        </li>
                        <li><Link to="/feedback" activeClassName="active">Feedback</Link></li>
                        <li><a href="https://play.google.com/store/apps/details?id=com.apnavaidya" target="_blank" className="app-download-button"></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
