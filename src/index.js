import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'H9BidiVTGT6eZl76dAWXzNw-_rszfwO9VDfZ13ZECYZEFk1Kd0Owpt74vkWYvy8znbQ7YL2IMw2Opx62YUkcWYJIYJFT4vsM-AKTztU0oXe8OPPKX7hyrGnYnXXaMm0nMyzpsPofkEq5wfaemywdeMQx4C3pHASjFpYsVeKS5Th-oQ30jO8nvePzJ6KxnBc6T-qBGn9CxJ58w4KMYWEZVm9UkSt43sTBpOFkC8oXFnCj6A1MMMMUYIXcY1o8XYzhxIl2flE51UlMlp4xKIF8RAzk3IWVwX4d8gBJU0dD_JnCibXB1mEaC6BPsfyBNaFBEPeVG-Yn48CkkgXJ7WYKsdvy4MByjUu3LzM0T0szfJqdzdVGG8smO0FpJhI2lK3QxOI9wSM1BzljemzY3nYDiCNYsq320EICvJDTY4XW16hv8KvkKWUnoTEwnoVny7UU37itc33lZTQf69kOLzJRdektu-0mvTpJKLs4M99two-wtuP92pO8yftrHN4CWwft3mE-PyyTlVwVAxpi6A9bBlpvlZWzOpjQP469tWTsaScNfV1UwLPuggP2GgAyptr29mYLvXiQw2O_mDQ6lPsiJVkj7A6CxDguROPgYEx7LdR7-Kj7GP08LG2DCULvvu6D_fnNvG5xvc8n5cX9L3lHExUDSyTvdMR0qOydpZN5cQLYYU68BhLGtj0x5zPD6IGn978Y39jptj536gV89ytoNs6ZVH_5vir9_GatCbfUkoI9pMkK-qzve4IKOhwGay2mS5wLu2Tlxci__BAPGyc7_BXTPz2DIX9etleUnbBQrDgpqKonOzwWB8YPs97nyEDRfuntOJuIjZVCMt52SSPpLZzldt0pQvdoMyyiumtrWkXnrLzCdzpfwRH7L2dWkxwF-IhedyNOH5T_9JG605PRrc3uLhHgpqdfvElWZpSdWvdv4PK7DjkOhFFiwP3OEn8JSKaVqcTUHSijaJAPMgyIA-tmjhbzxscWrNL4VzagrQTWis_oXFhSXtfws2B5EHI2kSNyTp5dtfCZLenOzquIRZ4yFfeb_0bqp7H4HPLxjJ12rJcedWZpL0trOnBFbRgFRAjIj6gx60ndr7W_6yuT_AVROQjHxvD3jW10swGvkS35jgDFqQm5XVm9hhe71T3sT3lQzy1wNkJYdiXuhgMAp0cXtOD0ZBoPj8r-1Ewxzamj9e34a3cb5p_3Fol8Hc0inLHu9o_wVCtqmb7jP2jZv5VmD6wKpjRJZHkNp6d5o3xgIk4YxJUdZGEBDZCjtdmQWpRjHyZTI4OCdeOY67pocn8mTmZl6_y6allF6fjMoXZ22j6RJwtKgW78vwKD2l0zgBE30DEdSj_XMlf7L8qDsCdl_unaU0Q1uaS7vLpDYT6sroBpRZzp5v4gGqyS0ThL3KnIM__xux7qFS8JMTGKeJ3bA5u1q0q84nrCITZmZkqoxsUDdo6NWKrjClJDdcxyKv3pcF--1rlL2zEUBFgJnX0rJWL1mPswdKzwD0hIIYvC2r4PrSm6nxPxJAme3D21q6WbIUTg3f0qIc6bwKMOCL3NtQzRmmpmX3pap-gmu-fKACkkArARZda3qt8OAKOm');

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
