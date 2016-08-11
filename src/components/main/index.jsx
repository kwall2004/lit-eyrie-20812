import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store';

const routes = {
    path: '/',
    component: require('./Main'),
    indexRoute: {
        component: require('../home/Home')
    },
    childRoutes: [
        require('../home'),
        require('../one'),
        require('../two')
    ]
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);