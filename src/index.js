import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/Site.less';
import '../public/css/visionfont.css';
import '../public/css/visionsprite.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'DOzzzbaj7mv6IKXvnTmOgV3RinAf_udMJjomCt2FkxnbwVdZ2hCc1xJyFH6ia8RcpcZn1hQQJvgktaB9jSdxb6oK3bbrwaHPIW9Wh4F13Xt_I0o7vONgUI1ZGBlnKtUsaTPAEZaJAmZUcQe9Hevcb2zWMc-w1Y2p-uoxc20ZAGm-JlmK5CDi9re8f6Mz8aIlC0rEUztxqN2vzKRO7K8W7kU62bBuQ61ibJvorWNxnEf0hCKYZ0ATrBQGk5zDAZaoYmwD0snybKWiTuOFD31ClM0kpLQEMK_R7uMuWv3B4DHOwEf13aJAEw22ZKIW5I2gPxA2zUx3E3GRcgPe6oel4Xx9EqorCAI1vy3iV95a8Pnv3_7kdtQIUoQl9CgTLFJg8Y6Syi2CnccUByBJOM-eMQDB5uJgMUJ8Fg09QOWNhI99v5cvPeQ7qDzqjtlPgWjm9WmS_qvnc890SOmh41wHgFo3WW5tDagnIupE-AahqyVpMwkR6y-wHYxJIW7gsi85KOt_9KQ9rI11Q1bByXmnamoFqmBi7Av0K5G53uH95MGih0zrKiG_uCWTwymPgwGUB2zCcv9rn3jHCunMvJzswG8Wy3WOCmiYKCMwA2H43U8gKLq3h2qYjNtW6zZIYj5nqWAowjF0DOZAVk6hUACGtePQjBJQ34vwz8AgbJnqHiSFi0veCq2RWV0VhVBBz8YZTKPEW99t2vd2tsoxl1FL9Z0d2Bw7mI4h6N0xggUQUkkbrdlHZKb8_p3PVx6lRIcXQ8fjy2jxysKMfmG6Uf3xYxRU7lW4UWjHAbp-0E8odSIWHzdSIQ-xy-YZ-O2wXOkMDR-SoMZc7KCuUUX4rNZjzhd3nhuSMO7r4H_uZezhkjl2RULD0oJKvj29J-ZTnSWw1dTAJwUCvWINYiSk1Eo_gUeUIrgq1t2R7rfU96c8K_OZQ802MqaeL9PloTD7sop__SOpoCubLOt7_GA1QyNSTNq4AzNpqaKVwG22qFbbJAly_dnvg7OV0bCkGLa7RCH3cMd2FsRrbskdK-H6ONW4jf4B9VqM9Xto83V3gP30MfGFuiazit8tQ0o0jLY0YVk-sRCTVf7creLVIVHnB36VdrFFkUWTooiN5bLMLMGBNJo1f5Py7xk9xx7Gv9EVgQePwxoIYL4PoyWyUQyETmfwIv26SGLeUtKaDVc9FilpVpDGZ60qs7vNYkGOHJijQasExCqyDa0Sd_oVb4Z29ToRmTJPoCOIKu6graOAD7BR16bA9bKMQBuivdq1cQP2TW-qJroAqw8iza2n1HYzU4yfwnjH_M5ujbusoQ1DcYiTmy8ELqh4D6r4aZW1T_6ezfwzcpLvghl8UlDi3X76lkY6nQh6Mf77Py1ET0aNrAIGBYEYV_wPqlwASXz109-YQYSY1jB3GIs62XpLylykptbNny9wvJAaDyI70xw6G1NPrlfEY-j86WKPtS3y9eoWhsGV42SViit9GSLax56rGfjziZexJggT4RWqyOVzPRmaWvi03ClyYnPZEhw3orzZdKWHLirSd_mXQ4R17nwVXp6ugeWwCRuY9P8_YdrhzdD3tWt6Q-RUQTpvexbfGio_lwKt');
localStorage.setItem('clientId', '58222883a394486528493ff6');
localStorage.setItem('userId', '582b37d72dcaab515cab60b4');

const routes = {
  path: '/',
  component: require('./components/shell'),
  indexRoute: {
    onEnter: (nextState, replace) => replace('/home/dashboard')
  },
  childRoutes: [
    require('./components/routes/home'),
    require('./components/routes/admin'),
    require('./components/routes/settings'),
    require('./components/routes/profile')
  ]
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
