import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', '9g2gmP4Wi1gETff4KQpDOvdJDoYGwl4blhmRvCO7GD-kJAND1_EH3lNG09lxuBX08iiQ10Lj22q2NqDcS1_mQ28YW_Wj92cnCq8zJRNYu315akBMFJUdUDysUcHc-MESO6doARnbMZGMjhV7d4WrVFmwfqxJD46j88NbEyf3Hzp2Xh7hHJ9MP2NYK2fqdn7onT2gaurTRNckAYu_r-Li3fdl2HO5Uam5BPPznKTOGNIdFb4-NoQUOhjoRPVSyGkriYAYwO5ENGGPk_sXTTyhRrLLvGlzf02Pm3FJEci3i4ZTOxUqlxkynjWFkkypALw8526QRVf-fQ---H61u3b2qNo0RyRIPxvox9JTYUPWsYsvBD2LyzqA_hPd5GLAtpFSENmDZU78z0Cybrl__pwtVqWXvr5xYz_E1z7dN1irhzNpZNodrt_lXkgR2xBRhWddR5j0tEGVaxqwINGBDPpfddsAhZhENWH2MvnK2_ZBNBKUS7np-mpzShfhr-7tzQY2m1o5oukNQfHDrEwnmkG06asg4JAN_WLiLELExTX_Nrhq8o4oTTKZo3d2UMF180vZF_OfRYWRq8pqlB-6uMvM_L3T5oLDtu2hyMie4nVumVhM9wKTtwHsRjbuSsTIAty236hnXNgGY5qKtDr8mb6uUh4lZM3wTAogEHIt7Yua49exkMDGpeTRq2jr19wFtnAJf5SyhIQDQcy5aKYI2eyfEdIaZxDoQw7sUU_-2rVoCYVL62s4J0ULDG1ERLmdbXq2hYwhcVA3gvCckM5F4JhQrZwGaSdI7F4KjaenBBa1KltIPqZ10O_mx9By-9p8rMQV7mrgdptfnNj5PUe8Gna4iTOCey0cTdSV1KuQJ_IE5Jaa6kecW-kT4dWCXJfYXcIse-jzBsh9EJ1knbYfdr0mwXuP6VaVgR8vvcEIOvcLSvy6vcPSah5HP89P-OmnQYw_flXz7fa5-gBBUGbPKrE35akE47lQ-rEAZQ7Q-abmxe5S_ssVyI8zH5SLiQxYheRcnIvXoZk8MPdxzoMREZud_51Kj34daQUTuzZmEzxrrrWEXXw1ZxKxocKckh555K1vP7hTjPreaiVQTimIlZoK59dglh1fWzIyRICj1kleQqmG4sHBXnfJ19NLDANu6jnETtPmMObHJIwYxvdA87CJv4gh8mj8N_yofAq6mScgJOxBdqnvJ3MCTVjLQ6PGffZOv-Ua6Du7FjXd_wwmJxATQ-2n0tQNEo015WybjxXa3NiNEjXQFh1PqlqNmngOb69ikdTh7Z_tERZRF49B_Yy_L27S_jZzvcUP_C147WcXV37cMzUl5OITzVAlIlu8Blwk_9xtpsBZAy5yAvdi_ECluois5MEvEnjk5oT1jJdmDHa-nFLl-GXOgthS5CDABWyvcb9n0bBZfLE1vCkWyTzA6U3JYkiJ_eKB3_OauKKuZkglRE6gWWidY6nr-Ir11UYp2q3NTdlXtFGN54GFKUVXZ8KOQbjqHtSzX-YQ60p1Kx_LyHWV2eKfgj6j4bfcZcUO28lnxFjuPQttA4pQdwLJtlD2L0gTnTnemgnLUPNLqqgg7QLXV_D2gSbU8t9ZAAWh');

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
