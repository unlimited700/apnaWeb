import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
    render() {
        return (
            <nav >

                    <ul className="nav navbar-nav">
                        <li><img src="/img/logo.PNG" className="header-logo"/></li>
                        <li><Link to="/recommend" activeClassName="active">Search</Link></li>
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/logout">Logout</Link>) : <Link to="/login" activeClassName="active">Signin</Link>}
                        </li>
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/dash" activeClassName="active">Dashboard</Link>) : ""}
                        </li>
                        { this.props.User.isLoggedIn ? ( <li className="welcome-li">Welcome {this.props.User.user.name}</li>): ( <li><Link to="/signup" activeClassName="active">Signup</Link></li>)}
                        <li><a href="https://play.google.com/store/apps/details?id=com.apnavaidya" target="_blank" className="app-download-button"></a></li>
                    </ul>
            </nav>
        );
    }
});

module.exports = Header;