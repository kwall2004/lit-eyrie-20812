import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/Site.less';
import '../public/css/visionfont.css';
import '../public/css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'cWCvUnbdHo8eb65lWxXK6uwroXdz4tUkJ5iT4i9JsDzrMfXsdN4LV4xDZNVbmRebqyCEg1h_OFRRIJF07l93RbXnDCDrJgi-haFrrgsE3tLkfU695a1tlfDvbxGnGKynBqw-MkaOTpUe3CgvhOqapHMosq8UiSJE-lbMJEeW3Zb1UzwOm2wH_eXgh6Mpc1yZqwkrO3PaAQi_TC0GgPAWoSs8CrH55w9_GhUnGvXIb3yrnoRPXfOJD-cwFwIUBcEkHxjNZ8H7dWGmWgS-Ahtr59efKLzUDfMR8MLWb7HH5FxMj-DYTxRELyKN0AK5jMRnvKpsi9l1pj3KeDn4oc5Esr7t4i1VK6Z2RzaC4PEHyeYex8bx0i0ad4SvMXwJZW2e4F3jdrXAgrgGugKqMt8H05l_l8eEVXYO0WsY9HC95zIMz1yoHj-byDOtwQP3k-Nw1n8KuQrTsdFHamHjX8Z_T3dZh608fMWxWVnDsXbJcSzWJ27FwjgxxbrfmYcYk5jM6Ke1YKzZJJUqVrKaTh_Fi6wZn8hsJuOrTsNmB5kNdysNFA3xJybN9JWpdsQV7BrRx85qEn4JtuKaVClqwVEs73jfTE83oJs4v70mt3eTd3u3OAbggEc3t3JEVoxoluZCpsRFYaVtfLa9Nj6RrDjxbBWE4am4z28ppBaWnntFnleEUZ31DTrdzM-u5iCdrW9q_o50LqCzvV1GTEhXVzs8CqE5eUOZ2fG7zTx36JDgUof7rYViwygfsEMxcd3g8tTXUOvBkSjW2dIvDswFrY0Vfp6U9RA3wsxMmU8VGpUk_k71ohEvCJ7-t0LtWu5zSEs7VGq2FEnJFfA7MQzo7DbX0OOZRHKmIeQbgLDjTDgLyn5ED7CH0Q3eQdicDjX2NLjI3dkUkSWsq5-yj9bSHkMvsnYskR0b0K_UhEMrRKQkV0dHYF-OJfNnbvtbHCTRugMb3v8Bs8hew00JOPWNNlO9tFh5U4MZq2vMpG85vkBwnkCO_WyqHVjPPT1M-fELA38XhZF78pTsvixj4n2gLbrXs8UqnTH7GOyjz6Y10eapNwRU1tbryoaL2lvBXwpTdASCIca3EmbWaqfDEQUL353zJI0ycAsCmYvOa3pGK8d9jf_4OisZRZr8cPSr1_0-JdCwcIzkeDkM4n1aadLUo_qtkvOo4Hy0ervi-0bmz8e9DeO5BsEvfvwzuFh-Al-KtZJvwIE_ZYroeqMFhxPB70Xh3_4d6zuKs4bacIh0uMblc1dRuhM-m1YZwnptSL0oD8ZC--0cqgqqLBRcq0j7IZnBAXE3gkBT-Z5TxuHMGRCznsWI3eH8O_kP6nhGDX6gMGIsHSmC9KUzEbWfYcxP6XPdKEFvj1zfkXdzP45MEn8exQu7zWU2VauuoiDSd245orrBdaM_5UUXCzU66AQHgYjNpMUvQzYxF6HAuY8pv59sdyQvdjivBoTYc0KeBih8_NblNHHsr57q8HFhP-fIpY7gRFnF83rs2ltyJe_Ca87wAUNkW0oAuQ-EaTsqOYjj7cDk1cM46vB5-hqKQkEjDn2KVWgFdd8eKDJu1siE2i89oaP7zkDHkQ1zwUBnZK3RpYLS');

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
