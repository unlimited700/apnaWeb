import React from  'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import MasterPage from './pages/MasterPage.react.js';
import SearchApp from './components/search/SearchApp.react';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import LogoutPage from './pages/Logout.page';
import RecommendPage from './pages/RecommendPage';
import YogaRecommendComponent from './components/recommendation/Yoga.react';
import FoodRecommendComponent from './components/recommendation/Food.react';
import RemediesRecommendComponent from './components/recommendation/Remedies.react';
import DoctorsRecommendComponent from './components/recommendation/Doctors.react';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component= {MasterPage}>
            <IndexRoute component={SearchApp} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/recommend" component={RecommendPage}>
                <IndexRoute component={YogaRecommendComponent} />
                <Route path="/recommend/food" component={FoodRecommendComponent} />
                <Route path="/recommend/remedies" component={RemediesRecommendComponent} />
                <Route path="/recommend/doctors" component={DoctorsRecommendComponent} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);