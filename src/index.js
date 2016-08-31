import 'bootstrap/dist/css/bootstrap.min.css';
import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'UVBg_ObPXs4vumb0htaw_oNplxBy2P3FAJXn7dMOmWcZ8765p9jpkwqA3yoIL9cgM-DsLYF9Dq2M_Zb75luN42pVI91wSaDDqrNcfUQbKTMNByZesDBaN4fhyVROURcODWUyFKmOZBa68hkcZcEbxDlHU5hLTwlCSgSJWRw0XeT_L0ZHK5eDs4cnKdNBRYpOvTO0nXdFfTfjaegKDWyiq3YsO2rzql0W_YJWONFNJ3Rp4IjbHSM4jgO2vDokHxwBBBdNhtr2eKXhDuNJN1zIOXYYNk5epYq5UVypaiYy6QdnsN2mS6-SGpVXsCumbbDr7-4L2ek59yIa2hzPFBAdRGmaANREdB5O3Cea07FyDVorK05ntRLEriXsBWoK2WMTSsxVoqKHCB-hyJoUkzc2zJqjwtyfgBrU7bO-eQ9hjK8oJMZ4HGwkr_9GDR-FAas4ycF417EN94PkY5OH2SiEmsfOiqHkWhz0tF-53IFrfo9ltL8IOuXZHFYYaG2IBMXbO3bP9sWt7Z8X9ftFmwuFIbSBBwlbgf_Zv7VUVKBsLlmxp9pE2u8l8Jej7lP9B9rKsp1-2koEt9wkI8wfEtKWa8BgiEMJq2Yfng-6IEdc8xCroWanf0DyGKSeDOw3VE-2KrTuHo4DRib5TfCkKbISh0-R9xzRJt2_mH8j7Yi79r7ut2wCU6uyG5ydsKnVWOPMo8fjHPG0Bq42azJ8ilRjO_LwdsKRdNpyxvSAE7syefq-nVcyQ7SlKhfnFUCns2b6ywk2SzGEokpbWT4YAW0hviD5mWgTSik1BL4UTY4hbX6AtWTvjxx8N3Q31iyhW_xcba2HTHKDk58EjR9pPnZyH9YgHG6vzDzNR83-K6e8jLD08NHYmYJog8wrXLSZxUyJiA8Z3NIT__nGLXsdP462NFulouduaDC-lpP29vq5_2komp6IDAspGpeTcBz9vWC0RjO3WzNf154sWmjPcDc_xYPFISjWmAUrwhzn6sX7TVHgEYr1QNROAKJFL4RPQHpLIZSArL0TrWL-Lnrpz_Qokns-XJoDcmZhvhterQkhA59g0Rq1tmzciqvcPHbksLckT7TawjtDz_K0AcTNNyFiLf7zV395AjFFwL4ELixc4w5voG6mG6jRbQhUOMsXaiBMlhatBXrkhtMq5DiLVcx4JCbUPSIJtZD_IYJpOra47dQzxZg9U0xc2IgdBLmfVcf8kwtmD5CnerMxjtz47f3MgE_q433OJa5bnc0CtgXggchB_aE9ySAeR_FcGvfF4N0VSrViYYJvO1ukeaYfsz1PmhbOAq9TPtKlQVCWmoVfhauivJdSGR-fsXpiHSnSHFoyn2VmoIiG6EAI4E67pVHkOzPI_F5bOLY7KWF7twWUksNxNJlc6OoQO36-Dn25aR5uDXmcRyG5-HRNeAjfFnTYcQQjKryfYc_Ip4KLI0OnCUY6lyiDKiNTgww1v3K56WKLAqIV4xgkd_f-RJGe3OzbIibHfyOs_U4fyG6wRB2Gx6TTHs6orSpRL5B9NHtA6yIUAjzQtOkN45WiQGz35xUqS_s5SmsTqZptdHq8CGvkZsRgcFz8ZzW75xI1He0oMeW7');

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
