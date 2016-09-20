import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/Site.less';
import '../public/css/visionfont.css';
import '../public/css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'GRmhZUHJKz-ZbXlQsKAduE166Z5KyogiQ-H8troPvR-kU3vnjwrsu-0T92HgpZuXeWc15Plx6Nd98VZz17kHh-KuGv1CYgzrKZllWQauuVAOsrvUdItEKA2WVOBH_T_rMt2FdVf_MnjMv8IvfinE0qQ9SA43jsskxDU0tUlw-NYQ3cFpOXITP7fGZUYCkau9sMv5Zr4DvUaVxzpywdKfTqhaOv2rx3Fzm2BGrfO1eYBMF86stWarIf19frh2LdE9U8WX2PWzmzDQr9fN_Tbrzburt7K7SoQH59p8W7NS2n-4lo80I8Bw5D4Xw7wVhatDmx2JfvYiFwN95-kEEXESNK44_3_V3jG1ojl4wZBpa3LqnuFm0WZGKP8Q3cEpD0Z59aWwr4EEwyUG0eOWPFg0_iyQTtUrJFi7C9S4FgjRK2FLGOC-icg9JqjFROfdflXq8muO-AidIbcVEBxvQ5APeMoEKYZE0zX2yOFduNAKPQMtEIfyS0kltcCO8OlF7rw_oN4fS6SJ2wdS-ofHp9vqnD20lkXzPErc4Cz_geeEHCVYUJTnm0PR1sg4qCJroAs7ntYvVO9MGuFGU4RcC_g3A8S0hW9zaw2-gojfNa5odVF6yfAUhIGITy2DoirYxv6SvHuePGSZZwIHav8mqjIUKa5xgELvvhF1BFzfwKAAA4hCmDSlP22GrgZftginEaXjTMNyijX6Zoq8tASJMTQiqvpyqus1dsVEwIhmLl2s7JluhHTyF7wuovRIBClf6HjqoBf_0NPWodMO_oyppxqdmxrp0LYhXJ9A7Rk9s4xzbgfq_qLgwyltgj_UBv14zc2dr_IZTQQas2E90rcUDlnKAPHblrJJvVkn39h8cepYY8jTtwQj6NHUi62aE-tp96zLimyUekvzC45ZnDUwbxsMU-72df5YDPFYfN2I7M6yQWRKwNvS4PnNfyzot1pmoQewFoKyuid4SkSbe4FCDAeTP8W2ag_iESSvHBnIFGC0GmH7UhE18SKDuYNZt5varAr7DcROzJa7ZSfmGyFhxyX7_46dfs8zfdn9Gou3JE8-rXr8warPO75-F9Ky3HqRZ_daLGdViAvhivQhbj1EP6kthgm1AHd_EsjQEqWRUdhqhQ7W-hlIgjw17QsbieMuDEnYSK3feaK68vPAFCZyTdJDXgZGGPQCl90AERQBeB3BJws9Ri6P06GruwFEQYU7tEUbTmaEYicU8GoaqdzhNIsOmsAaH1zeQbPeQSLnOP_3nTjqdt3oSqP2eztlCTqK8U_V2DIMO4dZQrDg7uJz_FL5IkIdu76-CS580mzCol3UL6a-hPH97wGi184OyKXqcrkdC-p7ypzpcv4VFu7BNN7yEaNp-GrID7eRD-jzR20v1ZDhCPZqMGOfXbiILFS44-6urFUVyd-Z_CHYSgfC5MNQW4lhRAhGumk9UYq8bT56_6GYJ6uo6J8m7Rr9EhiddCnGzSt0Q1uxTldrsR8zROa6JXFRooZ_JAfCQgALxHhH29iYUgDYZv1XecDDlkhgK7fV2UibJuaRo2tR8ZPCqRu1HEYw2opJGayBmiqTKngyy-w6ikVWUurVJ4VdUK7MwHEV');

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
