import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'xQ6UMHtAwAGIapkPo4KHlLUiYPgadp-7ZZRWu16bQODPCaKUnji9pNP9l4fGNv1Z0DeHujc29Xk0vX8OIZCL665v_ncFtWY-EFPvRyYiaCIpv9Ch2sZ6KffVSMorbIh0NvRRGoERr3rm19IKHsZ0ZTK282JA4_HFImyOn7fSL5HgHVtCrmmM341rnOjBOlfKmYymwx_CvbABYe60eZveeGntjEJNMHaIj6KfIo4RRI8DYnzu4wHQIAR9FCZ8TAvpZBWyE1VVdZvu-YnZuDCcn8SizC3jjcZWdjBalPt38L-HnFlp8WdYEurAfebVEu9ty3FVM-OUWbi-iXnckFSh5g1YY3Z4JbfUauhzYgJnGwQt4k4zaNgtimd4AQsvb6Ukn0-ObauP3ebS4d7h7cf7IlDNzhnMV_ZpfBxuW4CNo9jRg_77gvZ-GmOmcRy0MjWYu4V4M9auMpBZBSQKjg31sSXGr696EVW5I79_O90oLLqo9Qw-hsqVcezMiVGs3AKFCnaicGJ2M8wSM-UspvRKNdl0yn0DmBzVIt1viRkb-RpCumquxEG-6APeuCy6vn1rIR1ZiO3SRF8tXKFnPcD-ccDcRpQxZhyaQbzNKL68B3y5OGVShFSO0WAJxGnjC9zc6lTiH4GZXZstHN4b0drdWMocQKpHXkzr6dhfWUqtOXrmmPxfV0BIIdZENgBhImoavqABdXd7_2Fpv1x8UFc6KRoqWpN8Ep_Axdcav034r4vH-gZfEvWri1ukANi_HocSIsngcGga5A5ZyFgBgyGZOs70Ktm9v6ly2-6qZhD7mXgM_k3SWEDngLiGbtmm2sQ9hk83GdF6iAkCujHerBmPC5fANhiq0aZyxCZtZyyRN1Bgj5cmDZogVC632sj-4jNtHm-s_ds6PCNO-WK87gEtfYtg0JfeHLsq1nAjCj8Z4pDiMJ88fhqF-3ZgbfgLRqPAHa8WpqZzXvDmmBLsqNPDr4_jez94DD_TLqhSgs5OB5o_0X1SaBnfyZKd5x1fvPlrmg8eJugm7BMyzYiIuciYR1xEhH_kUBxJGNXsc4PRI0xzL1NuMqdN4WeJOsB2DNIY12xZ1oVAglpPZGayhOrZEmvTwzkjaefJR1AZCQZCzFIrLTCh1WD2shr_FgQIZHGXHz9-TAuj1alAVnJ9u9aTa18Yt3Vj62s-eZgo7mXPBexc0tLvF-vddhs4UJ8mS9gQK8icr16ZNkwG48cOfkDFJoyzD5iXtNEPn9rUTrwbekXiTLqOOoaFaySyk9AOSYqYRJABOXpFc-57q3K8aJBPGX4zx9_eDrtTaYibonRUr9x_iYap1mL-Uy-qeo0uGSG4GHILYPbVbyelLHLCHg6naBQr2ssm5ROiwV4fQ2ystHrHcVhjp8J6DAICroIO9MMa3xjHv5Q3dkxAB5EI-Ogr0QGGm6QPvymYIje3g_xnwjJvbXWF6dDxXL5hq7Y2UfWkJkcMHu-m-xqaTVYggGdt6Uni3gcgweWnQxDii1jktQ9752vTDA4OGEAWDJzQBmhnbBPZJ5gpDkxqZy1LxfgXUgn2CkBJkfwAEQ2wy7tEtoVdhH36YJowlI0YOZtqL_Mh');

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
