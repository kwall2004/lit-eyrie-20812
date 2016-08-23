import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import 'kendo-ui-core/css/web/kendo.common-bootstrap.core.min.css';
import 'kendo-ui-core/css/web/kendo.bootstrap.min.css';
import $ from 'jquery';
import kendo from 'kendo-ui-core/js/kendo.combobox.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

kendo.ui.plugin(kendo.ui.ComboBox.extend({
    options: {
        name: 'VehicleDeviceFilteredComboBox'
    },
    _filterSource: function() {
        this.dataSource.filter({
            logic: "or",
            filters: [
              { field: "name", operator: "contains", value: this.text() },
              { field: "imei", operator: "contains", value: this.text() },
              { field: "userId", operator: "contains", value: this.text() },
              { field: "userName", operator: "contains", value: this.text() }
            ]
        });
    }
}));

const routes = {
    path: '/',
    component: require('./components/root'),
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
