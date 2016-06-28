import React from  'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import MasterPage from './pages/MasterPage.react.js';
import SearchApp from './components/search/SearchApp.react';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import LogoutPage from './pages/Logout.page';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component= {MasterPage}>
            <IndexRoute component={SearchApp} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/signup" component={SignupPage} />
        </Route>
    </Router>,
    document.getElementById('app')
);