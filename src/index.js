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

localStorage.setItem('token', 'qktSRBuJVg-rhuMyMWmKM0uqJJrRDhLs19WH0tVHIj_FVBylplu-EcOxYNCUGMvih3WJoqXl7K0BxsGAXwG-hVaFu2hmsNeKX27QoALc0qRdhdCYpRq94QzMHpz1Ykgx6wUwcg1bPyyUklxFbMCyqZcYCBOH6qJYDmdRpcCiGl_2PaRU2Ku4JhZ2pyZa7sdrAJ4e8PnK4tXlEh5ChvSDKxAH86HJYEdrQpvyc15RmSOfuY_WAraL_WrIxkn8xN0rFroC3G0_hwjpRw_anKxZG4kng1hZX8tK1WnGXiB-fJJKqFUsvpdx12daPOPpq28jBy9Szylk94Uz55mk59ijPbyp6nReg9t4Y8dARkYpMGrnpMsQ-I3uqS2X1AmEl6F7LzAQrmiAEyvfoYkFpC1lD6LqG7HHFC-MPePOmVjvJu_kM1QMKbRiQH1Op5-5QTitb1Wy9RqZkfSoLHTCiAq76wBbQrJbicdt6SW7R57d4QhsL7hlZ-UVlRba1Nj1eH5mFx8iPdQdFCHq3YoT50sdFofa94b31XVZkNv3VS3BYOjISFu8di_g7BTKu3t0d9K3XzvloP_DdJDNWcCi5pf5bBUvq0gltftKquMy45b_7GQBi-Izg0MgEEJ5TL-Z9aqz29nEeb8_DMLcznCAB4RxDd40Qq3TfLmmMK6MiU8-hrvwvignDcsaiZZQWpPZw50-3BBd-7IdNIM6Wcm_5diRFzdc2pVPHMUVZ_BtSYsRlbQbGqF_YCd0j9-Fx_cIzHTzyQaPlFc4-KshWF8pPczt1sF2HMCbt3jrs5fFZ-WhvLCC30GHq95QYcJ-oW_TwWghVHZGxdWGTxveaLCl5zD9N8rJylndBofZlz6Z3qnkA4426hI8V91S0v_YwWZsIOkc7AHEgycO4I6biKyb1YB1zMVOdeH0GB7KWnfRou3_A5nMiKkkEA7djyNgMAfSuTJexp-lfeKaNopKGrEsCznjzRn9bkEgazsRnCh2NBmz3ht8lcgmW8LF7AMMZ_gzUxuUEaiRnQRjtlPUGt0WHGbAmewsoAfrMxUMhfdJu0Xdh8IEtQvZ_6Xyb2zDsGOjR4mJ2NEr7i8sOFI0JCCPOGD7nK55gzTTB4YWbCu2CWeX5ExjbZONb3jAPPDimqlHLZk2-pxLq-WVhrVvsC-9SDU3uRhwF9qS38siLJpPZHwIAiVPW5fzINZXk95A17ZzBVIiePSRG7jkHQl-1XkVOcwz3R4CokdLkmjNdY_l74UfVHy1orke67HLgr42M7p50bkJvK-0vUV0NJqM-OnxC1rf-CTZudoJ5ZSffkfYNH6SdYblXOGxvUEetQixyRsza7CAho-det0HwMrI4TnVC1cGWufNgsRXrJI95uDVD3vGiPdNZeG39D25WkVIEmi3V5VTCmre43eNI4ZZiI_sPdMqWrOV0cS_N_xMdq3e9fmF6AA3DwmtJ0h-77vNfMrklE473IEnLOfUt42_rnORkkCfZlaLaVsehZthu6bncdKGtpinOdZHn8-DEl2dU5cZ7uZm-bzszeg9P6N3aOQEaGtkDmzc5CzZ_1PxnqyBIYjMFSMzPnRRsHis667rPZ4CAXOQ');

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
