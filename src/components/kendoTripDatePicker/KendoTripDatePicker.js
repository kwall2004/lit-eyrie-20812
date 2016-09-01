import kendoDatePicker from 'kendo-ui-web/scripts/kendo.datepicker.min';
import kendoTooltip from 'kendo-ui-web/scripts/kendo.tooltip.min';
import React from 'react';
import ReactDOM from 'react-dom';

const KendoDatePicker = React.createClass({
    componentDidMount() {
        var self = this;

        var elementNode = ReactDOM.findDOMNode(this);

        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        this.widgetInstance = new kendoDatePicker.ui.DatePicker(elementNode, this.props.options);
        this.widgetInstance.bind('open', this.open);

        var select = $(this.widgetInstance.wrapper).find('.k-select');
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

        openButton.on('click', function() {
            self.widgetInstance._click();
        });

        select.append('<span unselectable="on" class="lastTripDateButton"><span class="k-icon k-i-arrow-w">select</span></span>');
        var lastTripDateButton = select.find('.lastTripDateButton');
        this.lastTripDateButtonToolTip = new kendoTooltip.ui.Tooltip(lastTripDateButton, {
            width: 120,
            content: 'go to last trip date',
        });
        lastTripDateButton.on('click', function() {
            var lastTripDate = self.props.trips.getIn(['lastTripDate', 'timeStamp']);
            if (lastTripDate) {
                self.widgetInstance.value(new Date(lastTripDate));
                self.props.selectTripDate(self.widgetInstance.value());
            }
        })
    },

    componentWillReceiveProps(nextProps) {
        if (this.widgetInstance.setOptions && nextProps.options) {
            this.widgetInstance.setOptions(nextProps.options);
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

        if (this.widgetInstance) {
            var select = $(this.widgetInstance.wrapper).find('.k-select');
            select.children().first().unbind('click');
            select.find('.lastTripDateButton').unbind('click');
            this.widgetInstance.destroy();
        }
    },

    render() {
        return <input />;
    },

    open() {
        $('.k-calendar-container').css('font-size', '14px');
    }
});

export default KendoDatePicker;
