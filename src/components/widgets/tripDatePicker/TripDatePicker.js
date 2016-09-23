import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import kendoDatePicker from 'kendo-ui-web/scripts/kendo.datepicker.min';
import kendoTooltip from 'kendo-ui-web/scripts/kendo.tooltip.min';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

const TripDatePicker = React.createClass({
  componentDidMount() {
    var elementNode = ReactDOM.findDOMNode(this);

    if (this.props.selector) {
      elementNode = elementNode.querySelector(this.props.selector);
    }

    this.datePicker = new kendoDatePicker.ui.DatePicker(elementNode, this.props.options);
    this.datePicker.bind('open', this.open);

    var select = $(this.datePicker.wrapper).find('.k-select');
    select.unbind('click');
    select.removeAttr('role');

    var openButton = select.children().first();
    openButton.wrap('<span unselectable="on" class="openCalendarButton"></span>');
    openButton = openButton.parent();
    openButton.attr('role', 'button');
    this.openCalendarToolTip = new kendoTooltip.ui.Tooltip(openButton, {
      width: 120,
      content: 'open calendar',
    });

    openButton.on('click', () => {
      this.datePicker._click();
    });

    select.append('<span unselectable="on" class="lastTripDateButton"><span class="k-icon k-i-arrow-w">select</span></span>');
    var lastTripDateButton = select.find('.lastTripDateButton');
    this.lastTripDateButtonToolTip = new kendoTooltip.ui.Tooltip(lastTripDateButton, {
      width: 120,
      content: 'go to last trip date',
    });
    lastTripDateButton.on('click', () => {
      var lastTripDate = this.props.trips.getIn(['lastTripDate', 'timeStamp']);
      if (lastTripDate) {
        this.datePicker.value(new Date(lastTripDate));
        this.props.selectTripDate(this.datePicker.value());
      }
    })
  },

  componentWillReceiveProps(nextProps) {
    if (this.datePicker.setOptions && nextProps.options) {
      this.datePicker.setOptions(nextProps.options);
    }
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    if (this.lastTripDateButtonToolTip) {
      this.lastTripDateButtonToolTip.destroy();
    }

    if (this.openCalendarToolTip) {
      this.openCalendarToolTip.destroy();
    }

    if (this.datePicker) {
      var select = $(this.datePicker.wrapper).find('.k-select');
      select.children().first().unbind('click');
      select.find('.lastTripDateButton').unbind('click');
      this.datePicker.destroy();
    }
  },

  render() {
    return <input />;
  },

  open() {
    $('.k-calendar-container').css('font-size', '14px');
  }
});

export default TripDatePicker;
