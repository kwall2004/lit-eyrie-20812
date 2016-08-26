import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'q29F6k1pRiqD5o76wDQpYjZVpxQ9ei809jtomqOKlb6n7qzSbbgcETSIzv7Jh0SasIpbFrJ8KLv4uYhf1MDmeCDhdeHZNiAtUUWSp1szynFPOQZY_LwuujstaUqtvA-ExBoAL6saQUM55Z-4heuB8drjij97KmxgLCZK0kAuMHrn3QnJjQ97IsBf_egIUhy1A9lKVGnGtdZcBpxjqXoVb2FR3oVlC4SaKTvNON99EKUcnW-yv56nZZZQtbuCK_Slt-mA7s1gZo9RNqe1TpD9baUcW1cG3PJsJPF-2gge0IaAMq2XRlp3Y93FoX_wjNlTBpNIfnPUwqPikGSORaYOChUgU8E3ehjn6Lf2rmcaQoU3rpxQiqm8g5SIhJS-4abuaGTGjzLN1YsVzz6RtKrMmZ5bAwofeYs9ZqQTQI7pImzO7VijYiZjI8lLsa42_xEo13fkBMsqFxX4VJmdzHxomXNOumeEdN3edCKEIcNIR4_N0-sSuAl2ahMq7vQZ2yRPDZdTXNbgg8pSS81fy4s5iaTlb8F2fSIQ0hmiq8MjBK2w-mV8_kMcqBg95oRtr-qknbV_tcnQK5rfNYwRjQqBTVbOWH4II03bC_-ddm-sUkdze2Yl_lZTXpGibZJJIlIEy_38aKnQGk-8GHjMmI_YMs3qYG3HLbTMJyp0LLRh2kmK0aF54gQ2UYnzCXG_aureFxzUj7eZ6VsYMWkpbJJxBcMZkCrG6Vs1odovenxFswDajog4Rzcj6_ipYVFnIsnoJl_guIG2RFguzFc7RWIMUDGQT-kDo-vRC_fDl9lJhkrXVl8EtwbCvwSDXgL3wvhImySHYhGr6SE_zPazVv697_kQxBjlvmFMxdsyx21Q6nACuxZBYAn_PrHpG2f0rUlg2IGMx1g0fvfb68fqAhCu5TFT4A98IEQKbdnFWCs_akHanRhsR0D-bM8rpb7YYMGBHmddH4X51F_A43h96ogUrUhmC27ccALY68tq5zVUF5S4J4yS8-OEZHZkYv4mrFulQ3quCtiFH9APoNHDTX8UCe3d3Ws9Ccj8nrzzkWx0sLyw3Mln7w3MwkG8EoM4bDoH2KpB2M9ysatbiGxRViukNOlpc-6MCFo8pQFHPKbQWuJkpr_fOip2G6NCSJgy5VzV2pLJYqWsW5B9ZPC7AlWiMGYCeBnUOybVRBGT_qH4f9DvNwM7UNqGj3sGMEvX0FNsVpYZSgk2jqTv7DoYAhzmSkLpxh4wzA5v3UymIhk28VxrymBY1UNn-HT32nCJxGupQPO8-4_OSt4J6PlmNJLtb05DjTpc4aVUcL_I6mrsGnYRjpEyZnndeGJ-oL9lIF_d4IFYMrwBf1aJdmaLvFNfEtidL4yUD8k5CtUPKjNkh37JqsnMzW7QlijuLebEymoWdGim32YnZ5uNlTAPU14UfFHrjloRwp7TmX6N5fm0jkDWp4qymIh5AV9xYpwCByL8ADRJAzaLLEp7Ea8juMS2f0xs7ObWKrGaHWZEvBGtnqmoulwdhatznOKn03gMNcnKoQS4ZlZ6w_oTP1Pcm_nYgiy8_V4-2U3Ce9-Za8BdXUwbGvmwsPSk_M86hHdgRrxd');

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
    component: require('./components/Shell'),
    indexRoute: {
        onEnter: (nextState, replace) => replace('/home/dashboard')
    },
    childRoutes: [
        require('./components/routes/home'),
        require('./components/routes/admin'),
        require('./components/routes/settings')
    ]
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
