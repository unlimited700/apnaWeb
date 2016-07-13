import React from  'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Routes from './routes';

ReactDOM.render(
    <Router history={hashHistory}>{Routes}
    </Router>,
    document.getElementById('app')
);