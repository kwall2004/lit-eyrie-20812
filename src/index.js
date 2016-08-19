import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import site from '../css/Site.less';
import visionfont from '../css/visionfont.css';
import visionsprite from '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

const routes = {
    path: '/',
    component: require('./components/main'),
    indexRoute: {
        onEnter: (nextState, replace) => replace('/home/dashboard')
    },
    childRoutes: [
        require('./routes/home'),
        require('./routes/clients'),
        require('./routes/settings')
    ]
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
