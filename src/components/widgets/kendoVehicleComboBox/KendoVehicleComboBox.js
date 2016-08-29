import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';

const KendoVehicleComboBox = React.createClass({
    componentDidMount() {
        var self = this;

        var elementNode = ReactDOM.findDOMNode(this);

        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        this.widgetInstance = new kendo.ui.VehicleComboBox(elementNode, this.props.options);
        this.widgetInstance.bind('open', this.open);

        $(this.widgetInstance.wrapper).find('.k-select').on('click', function(e) {
            self.widgetInstance.dataSource.filter([]);
        });
    },

    componentWillReceiveProps(nextProps) {
        this.widgetInstance.value(nextProps.options.value);

        if (this.widgetInstance.setDataSource && nextProps.options.dataSource) {
            this.widgetInstance.setDataSource(nextProps.options.dataSource);
        }

        if (nextProps.vehicles.get('loading')) {
            $(this.widgetInstance.wrapper).find('.k-i-arrow-s').addClass('k-loading');
        }
        else {
            $(this.widgetInstance.wrapper).find('.k-i-arrow-s').removeClass('k-loading');
        }
    },

    //don't run render again, create widget once, then leave it alone
    shouldComponentUpdate() {
        return false;
    },

    componentWillUnmount() {
        if (this.widgetInstance) {
            $(this.widgetInstance.wrapper).find('.k-select').off('click');
            this.widgetInstance.destroy();
        }
    },

    render() {
        return <input />;
    },

    open() {
        $('.k-list-container').css('font-size', '14px');
    },
});

export default KendoVehicleComboBox;
