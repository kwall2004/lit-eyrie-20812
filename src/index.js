import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/Site.less';
import '../public/css/visionfont.css';
import '../public/css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'oFjxjhM0ki_IPHxF7KHUDmIIjI3TxTUS_G85yKdybr8s2ZckuibxdErQf-pvtYNjq0WdOHJo4fiAVnfu_Q3NisCavrWnN3vW9D2rlOjZ_iv2I-madagUVQMOT0seho9gDikl5gZrZyCaEE8AF7B-nudHRjYrYGLqs1zJkNsWcxuLtRjwgBiB0SE3yIifT6DQgTiY36DtEAA2ddHdPUkEBg25vF1pBxHW_coDZtjIGEBp-95HAzCaJ8KMTVg-xJ7EIzVMr6i1bglkBUmHTrXBDdHjbomWTgXTp4raSugZlFlJ7dvRAnQsKlDuj_6bRl6ovi_t7hIn6bxe4B1wYiiJ3riW_a46EZ1GOO2LQV4fmcyyDGOtDA3MZDgaVS7yovYGZsDwwAloe9BoN6X43kT0M0xF_Cf4ayLyzPP6ByDLnx2nmGMT5kxYNVSiHpeFlLPdlU8cbq9EpInKHfvl1mxQsHLg6Nlgr5qZeyOkU9xwkkTlya824J85-zkjSrI3MTsH6akm6fUw_jy2QjWxgJLvELZZi5vkxJX6Aqlsta5nrCzYTtbMrMv7U-vLPoPL5ihzbFwLAdvrPvwWgl4iPqpuS2qkOJacEEDbOgch0oxoczRW7r51kfHOo5eONBO9jKZ-M-aT7ZaP08_f3qMrFtfna6csUilxRNDYZjlw_BQMIXLLsorJ6HQWX8JQ4rUjHlrapZh-m_Muaf7_vSazPtXe7AC4yfBqSd7uayr9z2SALFdVq7eVubRDkUIL0UjaB24yrgGkY0T1miAYHhkz0oTE1NBLNK-ckKHDWJNtFJmZj8-ERt1gY3dx7lZQoGegsbngf7d3syJPKV2qI6IqnGDxXbvGn_HMbWFQ1U2qXL7ds_0CtsRvUb690Qbr0ACHZHrrafxU-OfYKCUPkbyPH_tJffAl5MN4wWI-ntv6N_SSf58Y--ovKZuOnOlDxwD2imGdkSwTzluV0VjgnaKPUm6gGO6NKaAQ9Im5rXSVxFXemaknZ8wjky7DgRBq1lByldcgySdxNLMZmyRIqVbetbCsJKxD44GPfZIq06Ix_IZVATOm1r0xvTFNLpEK9e9RDmgoIcFFA__mUjXpiqmCwGmFv8qmWfFgK7Lw7fg8u0rBvYH8coUR5NsvLY59jrZs-LUHdhULVyt0Un4gOwpcJj1DO_OdnJQZGiA5zIG50Y15dpmCX540-by3sTm0l8iAjk7-lM5pz-td7WygV7myvGUEgMNGftUuxML2Cac-Y56Sm8Ek-F6uZGdxLk75KOj541LotQE7YIjj_sDnGQyCt58kd8Fhp1Iwn5ywmWRdveVBrd93v8ohLpy4Ql-Km2tNpV_ak2P_zaeY9WfYu_huEvOW3K4FUzw4IapbvPpz0LljquiMBV3xPytrU5r1ViABNn9-SQ9iLEsackv2_FtS-4rOUWhlkR0dc5HLre85DKLsBnXgnZ4JXxajiWOSPi5hiXpwXpS7ABUxaWSiDTyO6-n9XwM5BATMNSDtABcSlORZzPqrddwLbJhvxQ4xlyGY7yCMxT894Fxyn5vDx3yj4ShYcaPgd_NhrIkQ8DhzF80bRhxdpLCC_n9aYDkYGc_7ScTB');

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
