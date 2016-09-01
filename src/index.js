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

localStorage.setItem('token', 'no5JzHh67oy9-HNj-bZFSvr5Vy340HqAXl-KsVfaoD0-1pmb7HUWpAZU7o-7AzreuLZTbhGllr_w1RH6rfBIiUYdDratPxfOnA9wbg8q-nXWH86UzluhyY6eUnLJWnsdUSJRrsf57TmMmqRfO6G1kUGh5cuvTecraShb3hF9AVNePx-S30qsvPSiBHgkGRTo9YozKYgbeQL-d1wDSaqhoyrn4V-o8wll0u_KgNpGYO1QTjxeY-WltgNuAIp3hs_l4u7Z6ERMPC8GrETFKht1HC2HojLT5caPZgTspVV2mkeIiftXepH_8rhg5DYOgS5aBnKITE9cgYjOzXs2KkYZ5JsAwgpgGHqDWWSF6vu9qQD9RDrdhTipP0mAaAdtPjEhYrfCkD0OlIzKykMcgEUamR8Q8ebzcBqPoXIIkJAHx6vx3yDf7kI-e7SNXQiRsj0LntudPmdNiKFguxXp5vFtNR0S88s5YA7W4UOTs3vYOvqYXlNIjy95xT95hqiRZ8LMPdFC7YqRgZkk9Rc8ceOEi0YVztqc7v5xX0nNUo3r2tCCLjdBMu6bxOtPNvAuSqTtVm72tiC-ZoXaVhAT-D4SeMunJxvAuojfvAvrod09EDhC60nhfPj3vgIQGbeaNRcaLLsYybZWUSAZt98QaZISUuqPCs18m5FtOUJiksIj47tk1AUHyLX6zupKrbvwBSqHc1OBdprNCV2Qvmn4wF_n9JDLCA6xxfqhtoiqaYIL-c0u-bMoucN9M-sbQu10Q6hgchLLSCRoAdErl3N7boT_BoozLF9SgOJbZi7Th46tkkpBgunc8yMxrMjXEhOF2RUpksl1n-2snd4jU7Y51VPm99Dxsd6EsESSvdfdstqfhXtMkFL6s_gGtghcfUcAHguqsfxCPCbzxE9Mn9Dc04-bwLMYAmi60RPnIe819xYrBicSW-kI8jsfD-Iz07WIVOHgtqyl1d6VVjSm70tiabANkzLf0tTSF0SacDKHBU-AsV1faRpbjLAKPNwXD-mzw7bebpNw7cUYODjEeEd193HPNQCmqPYyMxY09qHl7tO_RlhRit1LK27AI8jHtw0VuTb14Hpo3teWhWh-f-lxhur9-zqG1Q3DzlPHb0rK-YXmpLLd5l_EuGNB5bzQhzHZozdAZx8FD4NR0maekfPFA7BzL6_0F6iG4AcOFU0r_fE4mMzT7PnpdCGph80_MtBnJ9tSwfvsJczriGiwE2NiBDpdz2bi1ckQG1FiVcl9DJ6aZaadyYwBsiLmysGXYcjSuBidiw4jorDAy9DEZn6TfNoeQ5tMaC8MpyI_f9uQBsVpq1Mkq8sX7UkSK62P1HjUePRUUZUZNoRr_0rkRUnlkHyQzXjnpIOZyCH9S6XWVLC-PAFxLb2UHLuHXOau3AzlQGsaLwjjQYUSVC3yUHldrpQ0oHbj9zf_83Sz3nxbDB9rjEArL839qLkcwnafswokH1GA9KBJna2RfFSPzNNGVzaIzgEeN36LcvMPFkNkpgignTB8Z5GzHFwuULhjLySVYu3S8cXC86aevY93XQKeTTtd1CDKSODLQOvJE7hCuV2JJXFvCEAg1bG63Z68G_hWz28N');

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
