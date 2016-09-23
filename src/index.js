import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/Site.less';
import '../public/css/visionfont.css';
import '../public/css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'HhY1BeguNRvnSdZO1Df-c-rW4XX8zGK7VvTgY-OGZQxg70yk7NC_mCAx-lqGIRVKQK2PggpjMxVVITKsrl8Y-QXf0tnbbrOcbr4UPVbrkPN8jVtes34gDhmDrIoB60lBXISEV9o4z1E5jFNLa-x0u0qcTf8_DQStuk3rXIzj-idzGNJex1WpV2HSyjuysOdmrBUmSr2B_8ghm3YVpimVxyn5dzHXXZzt2JrZfxDIhvTHuJRyrbd32M2WMF_zn_yitcn2eRcCAlg08j3rKpmkJcwjhHEtam0ySxKkZ3bzzf-IvVAz3FE5TsyMrBUnq38qLHNZfBRJcClZDfZyKKcYdvj0enB8STXohwEjQIwFMVmzs-phiTYW2NTXRSu3d74q9mft3jvMkW6j_r4Bm0Iwzxn16NAVW9a5W5CYmlJUR-V-yEnr0ICX7_srIKUUQvlysIfa8GdRdjiuB-VdKvVKAkXZwV1sPpyxlQsDzF1NFMNdV10UDfa9sVLuge9g9AQb7Bzq02uRIaQrmNMqcx_0tr1XwDAHE0C-TVjj1CFkp1AWafCNX0Le4vzZ5ZKQa0Tt9qI3Iakeimrys1FOs58GKjcfwT1sMqG62kwECKHnQiVdTUzkXrABSM5Qhz4d2RCUn-sUXQTocbbmLHxlEayXrDXYy_Ndwy1LyZCXqh8jz0YcifKV5wrmmS0vAiRSCClmbtMz83T8BKFe8hCYGChTzo9rRtvKNw14DF4IUxZ4k2sVjdsvACBap98NIRvILfGU3BfnPMHyNIekMs1WFq6lr0Kn1oS7vkKHReWNOlwQlgjc1YdqwFOa_NLB2Cu0ShVdMwhOBsP8fia_ZfaLgT7ioaSV13y8Z1_y_4k2Zzv2451SFglC5W07GeC_PMFPqT0ghXv59trLkJq3EIAoJL5hvUd_97MQcZ8HuNoMfuvACSjJLpKHDKk3gVmZBHZQRqxMGbmgEzordRkjJdPGvVEQp4APQtLSQTRtRtUzCzZANz55OPkilSnzFbXFv3vufRkltRfrzFarSwqST70bmnRF40oLtfrWOmImbdOlVqEQ-x5HdF6JnmTNynmJI1_LMVZCMbgw_H_WMktmbjLiWntzP421NMU7MmvUm7JxS1Tte1mm0qVs5cASJ9vMhwnGZE9WSvgooBE7wSpgKEJakYfZM6dAfZeoXhZBzJzM6D2nGh6wF2jSOsJMVYpkNHF4Y7aufqmYNAbKyWb20HxEkhnCOB-neBjwvcBpukHXcytWrArtE0E7CXcYBIRvWEgkyc4CIXCVbdzUG28qsO6AcVVrpBpiSZPIu1MU-qraZT8jIjgf7ZizVV6G89GfF2CT0tcDqX967pWSXvFrhDYhfDxy0NHmCPaQsM6Lp0ML9o4ToZLEQ1ORFRYJAJwJPFb5OUSGA_uDBgQkCP1iYggC0SinOQ0j3-6l1Jlmino3T5pVseLpUQ9tzcYFzr7Fzf9T3V3-K3Sy5AUPyKOEgUwOWxELVzzc1NHqeL3Y58COngy-qKn2XQ6jd0Ot5vutBlw2QsLDOE9gmGaUDdZNvxd_XAeoD8pjrJqtH-nDYNVMuDOtwubnDjjTW-ZV3jo4xM-gUAJF');

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
