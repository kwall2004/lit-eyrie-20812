import 'bootstrap/dist/css/bootstrap.min.css';
import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', 'Diqoy0ALnyQPWVxN5iQ0GMJcegbLFLLr9Oc42EsdyNTwHY3hFLkaXtujw2FljxEdlXRKkC3h6LabiHTbbpCw9SIXiWU_JvUYjmUZJD12wYnqoP7UBcxkIzVYlEbm5Me7Wz3jvO9fyt49R0woLmoxvkRGmeW7sKAqK-Os2Xoz44yG6GxH7vPBa82vbfINcOqIf6Jll07-mkAFIKjvfa6v9vstDBuurJn9Fc8V7JR_ncZGvs5Mb1YsWXO-Kf-GMR6FAvAAy6xPdU-ZzsTw3JUPTGUUEfmAV5EXJy372N8wamxQQWzLrAyJhc9y5JEmK-QsXzBDUx67d6olL0-C-rw6RLOl5OiviKoYOPrWy1_InK9NmKJlgH15OuBLut7H0YazNJO1OAy1w1Pk1p-FlzcLnyPMFWdc0BvoagTi6ImeZ0I0daztv9lR3BVyvMLe_9DW4lRDmrEpg24sJx3BrPBlscGc5HluP9IRypXb__Jd5xnzeXVnFM3hAbrMK3RkBWF-ENFgxu_hTwWQDfN694jS9L0TzxOstzKhJhQ089LXBqSCfIW8CDf6FTEsdf68yJ2QRi2hw9J6tKD-o7F-uwkamA3N9XrqMrLD0Fw1fzq97dPPieEFlzkpZvFbv6vorzuDuoBlp7dIVC2SK8fySS0ZZ_6Wd1zH5i6-JzrZ-AnQH9f651bPfg4Yw4QiKGEdpPqGCJ0pqwysIU1vfpII__cni1K0L3zYtlfjHQbdAFo6V4s1_w4hkQDVEMgz54XVYkbswgH_YseH6H3rRVYb_tFcK754NHhBtoWG2Et0t0uqnFZ6L5muofrJTZ2sSiQDh84mInXCijDf_h1nDHbjzedd446eR2xBmkqdcnX8cInF5AnwJ0By9d6zD1x6ChlvIPPTA6psGxODHBDUfNl4H7X4ky6f2hpLPn9OETXlO3Iz8ySMftjbR-eF1tkQn6aOgbZmTO5Y0mgqtkRNCzhTG1T6cZ7dgdExTpdXW0o7ZOvjGcRhzFZnIZFk9R2to5Uunk36PGfZHhp1T8JqVVTFiiSHUOLN7P7ggwTbDJ3pd6bB3E3LTLJzYgjUStAlwI0k4zOwqQmjpo5LPwYKVdavH3YIReOrga1kX54cO1Vgp8GrzngJGn3WxEqrgkC9i1ffZQEzvHwcmuvj4PsnJexrE7O-7XXNQ6rQvk1ZrCtlgUD3ejmcTI8oDjmYpl2CntaYsyr_eVsu3HhtmVIMy2kfBWwzaOOThZqdymUjToOJEWMM_jk7j8i_MFd1vsIvAUFqD-rY8_hA3hhPdKXloSkKUx6W9Mv_77rJWBMsVyV2jV7Wm3eEV5zJIeD7ZYjGnnYyrpNFL4hm5cobuaiZkD-Bl2aEUruQ2hcujCij96n2-M0D3OlmfAfuxjA86dQ8iUkbnxQsIXv_wtCZ0T7x1pDdDweL2JveIMV00vQ4STAzryrO31uRXe56jIXmzixRdTSbzaPdfOdz63944tuRZe_pPynsKja_Sow8G8hPOs-pdBOT8SEPPsztcv1QoUMoLoJ8y70wPWlog06-zCFsbmWlL8E6QrGHnQRLascs8HEz9-2tz6YTmjmLJ3IzQksVyV-lPrW6');

kendo.ui.plugin(kendo.ui.ComboBox.extend({
    options: {
        name: 'VehicleComboBox'
    },
    _filterSource: function() {
        this.dataSource.filter({
            logic: "or",
            filters: [
              { field: "name", operator: "contains", value: this.text() },
              { field: "imei", operator: "contains", value: this.text() },
              { field: "userId", operator: "contains", value: this.text() },
              { field: "userName", operator: "contains", value: this.text() }
            ]
        });
    }
}));

const routes = {
    path: '/',
    component: require('./components/Shell'),
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
