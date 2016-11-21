import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import diff from 'deep-diff';

const VehicleComboBox = React.createClass({
  open() {
    $('.k-list-container').css('font-size', '14px');
  },

  componentWillMount() {
    kendo.ui.plugin(kendo.ui.ComboBox.extend({
      options: {
        name: 'VehicleComboBox'
      },
      _filterSource: function () {
        this.dataSource.filter({
          logic: 'or',
          filters: [
            { field: 'vehicleAlias', operator: 'contains', value: this.text() },
            { field: 'imei', operator: 'contains', value: this.text() }
          ]
        });
      }
    }));
  },

  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);

    if (this.props.selector) {
      element = element.querySelector(this.props.selector);
    }

    this.comboBox = new kendo.ui.VehicleComboBox(element, this.props.options);
    this.comboBox.bind('open', this.open);

    $(this.comboBox.wrapper).find('.k-select').on('click', (e) => {
      this.comboBox.dataSource.filter([]);
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.value !== this.props.options.value) {
      this.comboBox.value(nextProps.options.value);
    }

    if (this.comboBox.setDataSource && nextProps.options.dataSource && diff(nextProps.options.dataSource.data, this.props.options.dataSource.data)) {
      this.comboBox.setDataSource(nextProps.options.dataSource);
    }

    if (nextProps.devices.get('loading')) {
      $(this.comboBox.wrapper).find('.k-i-arrow-s').addClass('k-loading');
    }
    else {
      $(this.comboBox.wrapper).find('.k-i-arrow-s').removeClass('k-loading');
    }
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    if (this.comboBox) {
      $(this.comboBox.wrapper).find('.k-select').off('click');
      this.comboBox.destroy();
    }
  },

  render() {
    return <input />;
  },
});

export default VehicleComboBox;
