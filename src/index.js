import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'KT5892tCVrfhPuhG5CuSTEXARTal-wZotqzNzs4R2EblMpEUaMUyWOnYHX7uzHxBJ9A34CKvvW6s_wb-v6W1n8MeVVmc8BdIwVbD-PEOtuSEoUgkqQafK_cbfrLj572zfu0tcKYwsXV63p9-c9r-cidhnNNp-AAWhUpp6iMWH8T6uOld04CQm4QtrsTeQIrH0HTO9eMhqFbFfRE5tVjKXllSe8rqrj7nS5vzJKv3viZ79SfTUr9MXFZOJHgjwpW5YEeMDDzakKkHl5eg46VY0BdMSD1vJcXEVHd_LGvvyKQxNtwBb8gNxMBpGGIfvCuv_BSQMi0fT0H2dgfqKQsmXPBUIQPZGDkS78TOFQnmKYN8RHai7EpnMnGSST4iLf3Mi-39rMBXzHDLOTphkvAjtiT2X7Wc7flmoyc6W8pE7lP1iqStWjwXaH6evQNS-E1AwtvKZpdDE-buYXNvpP6_V2F6waV6zG4-S8x9zdsvhTJtYJGI-k3CQNCDCmK_MDxW_IpVaHuiEVAYfFw3HweD2czgMda2L_xcTcteoYUj6wrLwHkZQLh0lI-2AKO81OdYaiE58PhWwrch651zHUeoxjIzIF6Stb5ZTnG6lmOGJS00BDyWPQuM7fIwcjzJ5ViQO373FFsxlDnxNaGSIFRbOop08GStYq0UUVZ11T-OkOhxMwxTyQZVEAStGVwh8kbLwUFYqW-UHUsDXXmmmvMgjlW3iF2WT98v0bEIK050hnax_J5pXUlUJPOz16Bv4z7MnQu7m2RnhBwdq4I7nSkll1IIPujLpjbEKPgMGNsWVSivd-zT0Vj7AJbznOkomaWJoRWc5hjvW_iIppT0wEy5MJU5c-8387gAc5i87KUQ8XvrsM41oEQ70xARcnqIcbRvsY9hRxVNOrKhDkC3koT-_UwhR25JxaipVhoONE7aLJzNDdzCZeL2jpfrwJjEC6p74DCxmwO_7ntW1RJIx5PFAMz0pPSLaA744u2ibiNWoabOCqaYiGZXpRl9_KUyLxzK3iuHft5fcIz8V_swGbk2hzIPID8e424B14W2d0ySUGyt310zbgkP8hHI4gbx3ZnvfeipiL1Co10hp5Hj4Ruh3K7gegACG1dYOHH0Y29c02qvxUkVDYBUiFKsqSScsuW7z3ST7ZU0aV36kU9GMXmRQZeRCN7-dEbLggC_I2dnS8IWTDqUQl5SfVcE5ZYeH4d1VH5Rq4HeXqi9ujpqy20ZJmI_VdxCXuxgcI723wk_dMBfJWpkNtnX7cLx0962TYCwkaI9wTxP5shbncEZNE8eor8pb7Bv7sAbBP7zAP9tF4GdioER9YxTUlhbYScsp47CdcgEMyE770vb7PocZOzRzB4mojtTiULDj7MhdbYw9hwroixxPtYHSyJ_jKISjhvQTo7_pLUxfYCYR8LSO6mKtyLSWCuYSkjvrMbswIprrejm5xOf9FoEIOieBLhUoBdBw6vrlOsdW2pRYeRPkLTjlsM2wXkvhKp-VxfyewhXwOcusan6GUWAOgiTq4QKwm60MhbVeZR6C4MNCZf0EG5g9h2pduakdcvVWA_7zzjeHihptDv-9t50D-Gqm-L6TZLF');

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
