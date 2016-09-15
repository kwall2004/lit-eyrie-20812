import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'aweEKsOso6HVvqophjx5cief2UWnnkdTHMiVvEhcJOclfJna6vczqGq6aOQvHP6eAVP1SEiXlvDDRgRU3jla2Zq0KajwHhrwc4eLCBZXXtHt0l42-e-2QMF8ZYGk3BjcHUstlajpOnKUBMUOZF2YrbimxBHBuGco0teizxlOdZ-jqPZCQb1nfAQH1tR9ud6j1nrS8ymgaKmi1q1aE35ZGtWwxyz048GiO4XYgxrjq0POHT1x-jQl2PvhcHYhhBR8DmQhYID4iu09tpuZ3VNGdMZaEFnV3UZPStZTzBZPJeJeXYMm088cL6-B-conyLKs7p1hYxP-8IQFxp3hhll2AKN0wGC1HuxLkvVnGha7xmDABVdtbG9BfVwhugMdOw-rJxkYSXbgOybRSyBE7_h9pbxEWfZzr4FhqpXwxubyaXIH7Odxeg6e9cmNJ-oxGrN0mpsdf8wDYtzyBNwYKOQMj4tBorQhXHs_qgu5IuqHPz5CdfmHXODMewmu1zvteWenWjnxLmS9PwUX9ygLz5fppIkqHLUAwBUhxelBJ0i_eBu8eFyloAo5HqR2IR6yvF1PWI7jm_0gNk-2Q51NTTZIhXcyDdAJvOBDypAYbHOcbfU4j6X5kUlLw3zt2u5cuYWHODQQh8Qco7tHfGElIbfcD-W4A2ZQQEe4340z2uVHsh_Nz3nKtjqN2hjrZKUQHDq9Pu4wnBGoipDl1GrlW6VjXng_p1OxiY3rwFDSu7QItQV6K10xYi-KkeuhQ1u-Wjm9cbVpNhSwuyyIAAzMhIBJ1LO2-sDju86-8ClgmRz33CWDXREY6mKtYYwttAqVHLdrC-OnoE4s1c6Y5HSBEnDCYTqAJj-puUgQY3g0IubetQBQhSZC4m-yZihtFv0dpfjp5Hc-V8W0-pJhOgNxuApvDLv6BsGa0WwG3Ym7vKMMvWff2GHE9XFNXxm62q8SoO-4XMWa0QRZ_NVInn7oE2hbEC6u9vvmEGnS7TnXxiyLksxDp1VW2_2AbxKGA6FQMF4EQcireRXw1W2YEDFqDpr66xckUbGntr3Q1CgTX0FbTpnAnR7DrK_sZoyq0AcBLHrUa0YC92sjQS6smIBxJfW-QEunQLfHlkKEaDIrGXEqdjPWt46qX25yRuRbDszAkum8Iy0jHC8LN_ufM9v5glFn61hZOzLBol4y-znIFD8Yvlj6nrk5B6IrSonllFGcZ5tivhNGMjD2ENAR7J-aumm_FLqqz2p1FWCvcEG9UW5VZcQdhrnSEQpAGHOU_YlPiSm8ws4xdAtXzqPwKx7ThEMkUIqeLNR8oDd4GlNlDe6g44cgxnQntFJzPvLDCanP-sDOavxZG_S-oSukzTQxMBbpuEOPuKsOaTEvWm7QopLEpfHgO8MCT59gWxV046oTyyxZ3q3noBYY2jV1m9BS-8kqnIdjzzgzkoU5KlH4b9cH3ZokSAWTZh2yHIXvEhq342QQeM8fjA3VM_kUmme01JMCycR87JiotBDMaAOc5IPRp2Rnwh7J_Jh31oKV5Ke_Ia9J5NwTjFhalt9kN2mEBww-2T8Nyme1XNBo4ViiYbmqREB455TnFI41wyeYgOvNY1ds');

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
