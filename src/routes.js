import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LandingPage from './pages/Landing.react.js';
import DashboardPage from './pages/Dashboard.react';
import MasterPage from './pages/MasterPage.react';
import SearchApp from './components/search/SearchApp.react';
import LoginPage from './pages/Login.page';
import AboutUsPage from './pages/AboutUs.react';
import FeedbackPage from './pages/Feedback.react';
import SignupPage from './pages/Signup.page';
import LogoutPage from './pages/Logout.page';
import VerifyPage from './pages/Verify.react';
import YogaRecommendComponent from './components/recommendation/Yoga.react';
import FoodRecommendComponent from './components/recommendation/Food.react';
import RemediesRecommendComponent from './components/recommendation/Remedies.react';
import DoctorsRecommendComponent from './components/recommendation/Doctors.react';

import DashboardLandingComponent from './components/dashboard/Landing.react';
import DashboardAddProblem from './components/dashboard/AddProblem.react';
import DashboardAddSolution from './components/dashboard/AddSolution.react';
import DashboardMapProblemSolution from './components/dashboard/MapProblemSolution.react';

import PreAdmin from './components/dashboard/admin/PreAdmin.react.js';
import UnverifiedProblems from './components/dashboard/admin/UnverifiedProblems.react';
import UnverifiedSolutions from './components/dashboard/admin/UnverifiedSolutions.react';
import UnverifiedMappings from './components/dashboard/admin/UnverifiedMappings.react';

module.exports =
    <Route path='/' component= {MasterPage}>
        <IndexRoute component={LandingPage}/>
        <Route path="/recommend" component={SearchApp}>
            <IndexRoute component={YogaRecommendComponent} />
            <Route path="/recommend/food" component={FoodRecommendComponent} />
            <Route path="/recommend/remedies" component={RemediesRecommendComponent} />
            <Route path="/recommend/doctors" component={DoctorsRecommendComponent} />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/about" component={AboutUsPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/verify" component={VerifyPage} />
        <Route path="/dash" component={DashboardPage}>
            <IndexRoute component={DashboardLandingComponent} />
            <Route path="/dash/admin" component={PreAdmin}>
                <Route path="/dash/admin/unverified-problems" component={UnverifiedProblems} />
                <Route path="/dash/admin/unverified-solutions" component={UnverifiedSolutions} />
                <Route path="/dash/admin/unverified-mappings" component={UnverifiedMappings} />
            </Route>
            <Route path="/dash/add-problem" component={DashboardAddProblem} />
            <Route path="/dash/add-solution" component={DashboardAddSolution} />
            <Route path="/dash/map-problem-solution" component={DashboardMapProblemSolution} />
        </Route>
    </Route>
;
