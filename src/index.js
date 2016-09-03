import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'AvLlWUa00K7aOmB5rMp2GWK9-F6xUC3ED25AZktKeo1P-j2LD26IDK43Zysi-Rm71TvGJqAvMmrLdzOWSncibVhXj08nljKVu2P3X_gVJS78cyFLyG22oLCcVHcJkxD1FDX0Pteq0lY1u-fjBBZQDb0k9oO_8XMO2UZ7Yri3qW_MGt-ymBCAzmqZqrAC-WdQVZ1-Jv5blj7GVFm7HdxFW1ZCV8iTuzhFRVTc32VEdnRDxoQi-k6NB4-2tQ5C5-5OhQqxSk7J_yqDzwBesNJiIoY1FW_6KDxEh27r09OwWLvbrqAz4w0T6UkPmjv_Z3NTb5xZo-9q7LB7v2LL3LrlH0Dcu3yLFp_kGwbwNzrOAGOYXMc0QFPFXoCIZtzpaCqlQcqMdnznOFt0c6J8VJ2vVypdyNcyCcl7F7Q8NyDE-dY7PsA749erAultr2Wh_0e-W5_EBKi82FkF2Zrso16WCab_SmQbvKwLsrBQlXuTF76EWV2rUN-GPpaHbP25IYyhIrMrcYfMghyZgkjF2EdoKrwFir949maucVHX26MRRjRAexMi7tdyo56253TutYup9gS2aoK4YXd2rXGDK5arRhGL_uve8_vNkRQFDu5eFPncs7Afaf8gLfboGUc7vbLBfEMAGINrKqyF0EOqStDVI51e9ApWoj9x04NPFN_w0vdxBCySFjstkwkiG946IehWVIH9_OW8_KnkIKfMXzLE9qRi9MAhI-iSAqNzOsaspzWbmqo9Q-SvcJspS1wZzmQEO3grUOrqGPmTTpkCKG_Qia3SNpsiYzFhJrUGBC_zQ-vJ60M78bftE_eiCthMKloHMZm4c56RlDMQd-p49fjMHbFprWcxxUQFz1Tq98T38cjSXlykTanFeiT9_W_8mclbYh-owh-u8qnGdg5jWwAvwLQk2-XSNQUBnuSmnbVTc9lc9dZ76owDfHFvZIvSP9vupG7BLtPvr-a5HFU2jF3lJqyNRLDABWVvl8IxLPDNwopQIsSFDhJVAk84x3Fg_RzGMmNHmfgOLhLO4B0tVWTaoD9piHJNPVmWbviBSVVvEwAk_SV0BKz5wxFMNbtNFGQ52xcGTg66dV6nN0nnbk0c3lSEoH0I_wUcqi0adAWAMC_VF83qRunLn_b3INH8Uhx2MmIfXmHZnixJxdT_Ry4hsXRWcSG_6lsIx8WG0rSlZF5tfs2aCc3fY6LhTM8UeHU0ZRCeS9WsV81L-Ex0umVueAXXlDIBn3aMvX9k1Y1SGWP3dL1_n-q3OCX5So17DNnIWPYrEg6ia5SyAepvqSd4-mUnIhwuTzCwY6ezFnk3fRMKP1jra_QRYVaCdGGSrmcLk1G0CT_ZSG299w_q4m5J1vVk4V-_N4IltBvtvEQe6wJ8dSSGSBLDPyHOf_gk-oRbIYZG_xhimp_tFsZFKabWkSyAWBXSACNKve4Y8f8-LO4uIvDxW3uA88WcR1Tc-7rEzoxlnCO6gJZU1zVqWu-5HHpgWQSVFNDu1bVx9oGxONDt164I23wjlOunCLQI0lzf5pkAjHScMwGLGBC2K7-yv93DqWvRAfH7OCjuo-XhVUcq3x-UpORVYT5z12bUUE74');

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
