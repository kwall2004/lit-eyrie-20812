import 'bootstrap/dist/css/bootstrap.min.css';
import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'Je092gyV3Vv9Ft_JaM7jWnvffi_ZM-UOBIu-hynQya-9FCRgEHLixTnWF_wtR_8jLLcayAmbdwo-A1psHHievjH3uIntzhqMgxjxRdEyewvquXmS2Nz-4JgNbHHy7_hWFPo_tVECRlK8xOPfJB9LlHXFryG4_PMxLThhEI1KxJ6kzOmlanu_MOHphejVLuhGdmBhWnM6QdqOZE5f-rUWzT20FMU3q4yfSLXgnpqcqjbnha9ZOrUOZZ5yiLXR0aw929mXa7HsXJtyHocA0IUCRjMcoGCrgg1ZvsN8gOUTEDVjXshb_ijQTk7c1S8b_O_OqJ0xMjrUQXX7flPfw05aTYp3rZ1gsxbkGfBTHmsOixZW8DseY2UGW4asto6mgoCki-fztoE64xV04QH_ijwks3fXzGDrOYIRNxlUX-wS1CcrSMReaiuOSOMazAoWfvl1I9Eyo58K3j_-0AMutQTBtqURjlJ-ze5Vzr02xQodnevLQa8d_Yyl0Enec6LDBb4KR7wWeTA2it22W0QmACZR0PQSyKhEkhVLbl8EPFHvkNxFJ3zNt8mBkOuRccMhzjAj4OED4l-TgiipZ4wmWvl0W5HZQhwEnWtgLJ6tE6lh7qUx5x1o02WjYAQIXRoVWOOE8lsEYOw2b5yObOmLxwLUNhGglrK6FI_Kvh2CQgAtxcJEQN1Fn0HTtFOSud4EK72VR47dyF4a3BAD8SyKgsO1tv9INH7PYoMnjrCnkgwuQTtEgsYytDm-nk7I85V7HzO-dCk4iRbTR78E-tSz02mfeHm3HwD69SwES5gEpgtP6GRIu_fTkiXXq3i7XXqWY4YNo-ZRECrSp-Fqxp2WFos6HntbQce_xmIrQyoY3_l_Vpk-jaIrHRjaD3LsYoghU_BbKPc_YW6tFQsgJ23WDcZVoGzKU4tEMwft2C5zu0jjWIS_4rP4CjO9fbytMWfMxDzgJUWfCIOKlpNbGK7fT0e1n9qVcwIvXnA0E5L3sHpPMM0BR_wxhldreXh4P09VeTCuSY8pcvX9Rg1xPdFigQzTqruojlztKrnWbOa7vIpXhP4285yLc-54zjfpHu9cvlv297w-jT0we27sY7ADo0L3cE2Than9vgLIJ1YTLV8M6rrOxZ3LH1HinNuNokcV-9s6r_XiP9bodH5UJNm8Bcmjsdm8EK_QcbvyYTn2S81OwlRqpfJ8Znx04RavRShPVteBAouzk3ag3aiA6qhaaXiqVjnWxxOLniRCD4OVWs6iVDV1rQtPgreQVDcMI_O3_NyXwtMZUvLBllkzvyfQyAs6xZQGmLDxh9mnLhPYljT65IF_M2D5SMWthgDOQrkTBr0N70TWbiE-lXk2qzodhQgTJU6OtO1NBDw9_zkeP5_El9YCLSEGA8uhmxOtpe5QnHJs_hSb0sTzDfv-DnFahaLbWqgBtUz8Jwyy33FS78vgkaQtINXFbHiOMQNqsNzdyG1kJcd4OgDSXt8QeZYpdfmME2bgn23htlqWus4BCQY-rzrr0R4ORTU5BJaDoFAlTZo_Y1JOU6yYHg7t0mT8MeY3GKxhZbXzFYjlN4cHw-QpN6CBlIpTo2DBhIpZt7vNiUqa');

kendo.ui.plugin(kendo.ui.ComboBox.extend({
    options: {
        name: 'VehicleComboBox'
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
    component: require('./components/shell'),
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
