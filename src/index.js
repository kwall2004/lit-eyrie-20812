import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'zDwmaklaOQHprJYwXon4B0sf9CSWYFUlde3MMEacpHtUPaAa05Rb70Cf1hIB3IePFKugu1_Jsm_iR4HrIBpLa73CbM1FzPdfG_di0SfhGTO9qq7eR-t3jnGEDcUwc9YXohnkFxCfGav_cACH5fB4_zwMDBpPnrzKVCcK1eGdGrLv7PrSbN316L0R3gx1daSv1or3pnqBMEcvY_xm2w-Ngb7phu6prMHsMMcR6b8oIs3O_ZOISpxe8Fe6CNu9QHyohPUWt-Hr6rLCSA5eJgoTJyplM0_gBjxZnlVUAFuZQmyy5uzirRwzfVGQXET9os0MO_EjcfuvLi_uBCqtTeD67w-iLf8VW6MtuG_cT1XP0F5ia0_KSlv1tNkInQy9bJD8795olzlWwgNXOIqYbEM39XjNk-mpxtKPyBTo_8fu6i9atdwWRbDJsAWDyFHjTLqFeD0G_ZoD0OeOk54L4KPX_aAltU-9ibPWNh4wMRULQL0sRbbAAEM9nNuNg8J6JZjnFZ5FeUi7K5t0TqnzpZtCkYU_SpPR0_V5xMMkChLPofGOYX7eprKqpf6pm3io6P5hhDMm7PlXAHzeNLkNHZNCw_iYmljkkVrt95CzQsMFhMgiXXXh8L6pkvBOEiUF4RISZLyifuxa4TJZkkeqdNTqYm6jlEkM-_HY0b05FTNHv8xtIbdaYnoneWjplm1HqiRDt9xaqXR2YQmWF0VfOwTGpqZh4znhDoObpMS8J65CIJpT2irTstnOtW1Y7xcRcMcrhIT96epzw01ZNlmCJFXOzsCsoLAXiLEWbDPUmBlAfO_1p9972_VjbmT40crybc9alB4A_q8cGLXl7cINlI2A8W_er6RXBaMPqi-N5BYmAj42ovJgL8zgW_Qa2lCy6A6zRFpSNtWvBjh4FXAEEaOhmyW1c6VBXPK96t_VKmcu_3BkA-N_cudk2LA8k4wB9PMdUzU8ihUA3xpJTlbNxqtw2ZqEIY68QsF-Aazy6S0W1ToONpy6ex9gn4zD_lbBKQ82ifCf1lReD-tx4c3HLDd-0qgZx_wCnoRv0ki-lpvXqayPJwcocaIlduamxVlsd_7J9_djoEznH7spjV2lHc28ssCrWNlthiXju6KkVUs80nPCe6ICOxSyay7E0h08fH-pTAjk5cXg44XfgUNp-_L5UAZdfsW0d-M32Dwr9kEStMpJhjS9Etafojb5CUB-9aifJIU9YvGjznRsRyYC4qUyGsRRNgjYRyvc2mBAGNl4FIQ8-pfjCzS3Hx0qExFNklnRkaQaN3CrPjtF2mBsR-1spGC3hbZ0AyWG0CCZ-UAvIR4eRTXQNv48BKdTQKohF7E8bIj1vRdXjzxUjhpb-Y01N0ghvDS8iGdMm0-hbLFub3NnALem5_W9EBjsOyykQq5TFG7NnS7zVq7l5eXzPRv9d5RD54iDN4TuLtRbh6z2278PXMpBtLgIMifpogtHoDrW8p5lq0mgsd3maDOWg59b0EYLbonhmN8dMvTDsObklNUwQtPimuNoyAgSKp9xpQT4MddS4UOyYCkKrbzi2XV4DrHrsyk9G7ofnp9w0W8QEYFdZ-4DLNiSmx9CcvtPShM5');

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
