import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'en5tSpzfMymcCDMlyhr64MWR0-6CSPQNzcefX06WjmKN_h9fnrgvPhdP-yaY4GRPjcSc-xk_NKBbf0-L68CnrbZ5ZanYUAv-U9K4fyszP9-FsgeZlwRxfi1sOV_y1hpMc9g6j8IDwrtZytKx30vmns21j2jTeipMwqZF3UFKvkH9g15DR7EVpItJLZu942a1AYeRou73apdgYtO066gky8Z-F2SIcfqU19VMqfCYawYqRxzIzNvN3aW5pXtTxqyF-QPeTp9wrc2FNynAriSjH13Gq64w19QhtWgV_msU3IfgCH0yKcOLR6hxm1fnFD30IwT-Lk9qrVXWpjKwvuIOHNJwPu5OD4oi9KRCuzB5ZGqnOEK1NNKKULiddevatSzCXANOl6LSaEtYUH8pGjjkJpBkIqqS6Ini60biuXjwNKQv8JS1U6L0mq-V4p8pIR-KTStnZWtJIOyRBxjgHSew-hEntyOD6dR3SOakQM9nPovzz0vaDYR0mR5-u_4a6GSlpoXbxdagLKdU7qVq-Pa1EG1i8mXPWVAeHz8iSxL1xXWwyvHEiq29bKXBZwv5DB5HJGVmYq7VQH87rmZahITgl3if2_h0W79CWczlhdMkFMXQQh21ifcR2cCqsYsXzGp-N7ec0W1pmaIFu6C7L8lFuZxZnim-2T58_WrIaALseXiEmk_CKpekFhFRVY8161VR-cSsF3eOWH3zfo0LHrtFBIBTbD2vV5N2BxWTGYVawZUeVxBJmaNy1cHiwt7upbk0l4QdjZ3MJlRRWFedap_jHjh1yw6wb1G5SDP4xIj13Xhk5-auaQHhpNh7d9aXa60W5dzbc-rrtSwbmUbhY44sd8l5L56x11IjOfXxba0RSUekV27LI-qPlsK3fE6mAMuCCXKqJvgTd3HUGNOM5_VIXEbK4OGkNvKgXyHE6VMBIRVBRaf41kinSmsBT4TJe_5K-T3AXT827xee8Fk78qAJUDDiKs-ehJX1auRFyPrDpk1KBXRhI0lRsXOPqOndg7XtkzOFqcHuM6whJvtlfito3F-BJUIf0lKy_ot_sh4r_-BSiru551FsDFz3msQoYaZCGp1dNecVJvgJTiDRCTqvMV6ktYeEBv9e_Qj2su8BwFuocXrPzTPyE5ypWmeP8Bdovs_fRQku6q3LI5iMH-d41wyAyXBMq8YkLku7AU8FL7KxoSIl5kVzR9eNd3EDKotRRZ4m5RU2idWmF3w3w7Sy5CM-6ita7A6vR8LIKU49NqjSk21DDH2xmoACN7vWxtFjDnxjrOR6GVwN4AcW1bQGAkDv5BhH1VMTtUx-u7ucBBs-w8aYOL4nGsztSzjSgT6mdgQYx7IaLFnZfFrFabKQhEPFV9EzNc3i_63NMfXWwmpSXGCj5XbzJMOe2vVFIdrLP0gxDnxlnLdZ9qumPF20AKyudX5oNG8Nbv6tVVR23UCEJJYoMNTgmMi0Viv35j9iVUoTh0PGbNnHgg-OJFpSKT9_UbaoiybIqOptZj0weG0YOpRwOS_jYUorqYsB10XuJU0VL1zo0xPZGJikFWvpzLH95sX5LN1qadaa3Uu4IzDsUXzecYpZCh0ios0dcs3G');

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
