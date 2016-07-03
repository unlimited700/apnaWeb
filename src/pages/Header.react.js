import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
    render() {
        return (
            <nav >
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><Link to="/recommend" activeClassName="active">Search</Link></li>
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/logout">Logout</Link>) : <Link to="/login" activeClassName="active">Signin</Link>}
                        </li>
                        <li>
                            {this.props.User.isLoggedIn ? (<Link to="/dash" activeClassName="active">Dashboard</Link>) : ""}
                        </li>
                        { this.props.User.isLoggedIn ? ( <li className="welcome-li">Welcome {this.props.User.user.name}</li>): ( <li><Link to="/signup" activeClassName="active">Signup</Link></li>)}
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;