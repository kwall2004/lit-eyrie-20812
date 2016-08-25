import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Site.less';
import '../css/visionfont.css';
import '../css/visionsprite.css';
import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

localStorage.setItem('token', '1q_8uk4Q9WAcPyBGEMPWXipl3Zj9MjNIuQXevMLUG2Pts3YrIrBeGjKXk7dqljulz98mNTY-fk4gtSYmHQo6uF_AU823GneDRVhIQ6q6Ux6S0NmuSE8m7wSwEM7vYlm0FWQfmcTGkAPzaTENVEDwfegBG7ROylmIdicS6vAlVPRsQUTB3TGP97upXK5MqmArVKOIaWtzryqc9bFisMhXkGm-QhPGWCjY3AZSFf-KRi288xUmJibVme2T9lyYUqSCzBiFTBNb1OzwimGpPj5S0dHpCyZvKTIsuWw9hhmLCHorEkzvPT6dXzwGH9yQcDgighSk4WF5MZ2YR3TMFTuE6suiLFlwDcXnNmNfsPCDpsNoAM4tOTp7TEmUtYRKyGdgC8oLunycJ7Kpg3XGGr9jjfcym2vxPn_OWrfTma3D6vgm7sQqcac571IosJmM1AsEO77Q62GGnbQG7nBWrU7UZJ2Wxc2D_zg_rVv9WPbA7DTUI1wsPurLcC6tO-ibuHoggN4WB2OI_yKpA6eFy7EUfGtqybzuiuSC5zNbuUzE1RfxQKEdWyDO0qfVFHubxn0gqmQ4t0EWpXa6mee433ihRfCwjkcNsdkBzuvb1tAica6eaafLT4Q1myT6qE5pGEe3Ch8vJlcifrVrFL9uoLbyJ8XrAPn_JM277tDboWUJa_CKQ9IA6WvgkmJpmI23yMyJpQ5JSo8oQn8NMMHR7lnPR1ls06NmLxHOvY9vk2UNTUTdiXZ88phRVIzFRg2LBA8mElQdQ8punrCkJzqh6nUsnDIHiODz7JcxtyEG2jVISIi6IM0uCbs-dwyoDucGpbQPJ8jwtGg7V9SneX1PBBwC9EKP6695l6aqqVSPjf6k59pEWtcS8tddoyDG_OflXPS09_o2zg6p5pSybwPgKPZa9lHtAM8OGq5N48EMHMA64hHFztkiLm9YSjwHKaFr7RyHQwFupiyd6QHelO87zkP6LOoxpScco_h-rhO7u9qLWSmOC-FR7xO7_UG0305-jcOlX2YMuo5CcJMar4-n2OPDX4-TZ4KI3Amxr-jECo8gT7wW3E1fBnXNfZMtclnKr7_TKZphJ72TjIoVXrgZCJ986-UtNyHp8-6st_S5oebCiV_Lj2OwuaJdzcBoWYiuQnipPWwehTW-vOikVP-uFQ4WYpji7mNbvtd0EKTqLT7HuH1LCrF6FXbGBakQ8gqkcRJQjZ_9yIsXRt2A9gC2GSjx7dmnyYhqKaoC7rsDQgW7eydHDCc9BjaresdFmZP5XiGKn2_FbwwB8IXw-lj0VZeh3CNkvAEoDu9ZELMv2AyQNXAqhh-tLWzYqvCNAgqxSCj2ZM6BYE0MosSYWgX7IE9se-mGk0pmdr1QSwrU9SYRwuk1mJyuukrau2pxyDiRpghfL-1U7RJhDNdBxkl1R2i-yUgUcheQJ2qs_rWy4inVkwMd8Uz1ZBWJf8W6Rrq3M6Miva3sVxFdGXqucQvOM4UtghEQWDL1IUgN6f--UIwlBMz6Ri__TDmLntFr9BS5ku9wMvbiXJ8fZyIBxMjfMSMRDDGch_rQng2ugoRMT9ZetlpEjUDUOsJrQX-uEvgNiRAi');

kendo.ui.plugin(kendo.ui.ComboBox.extend({
    options: {
        name: 'VehicleDeviceFilteredComboBox'
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
    component: require('./components/root'),
    indexRoute: {
        onEnter: (nextState, replace) => replace('/home/dashboard')
    },
    childRoutes: [
        require('./routes/home'),
        require('./routes/admin'),
        require('./routes/settings')
    ]
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
