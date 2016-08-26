import kendo from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';

const KendoComboBox = React.createClass({
    componentDidMount: function() {
        var self = this;

        var elementNode = ReactDOM.findDOMNode(this);

        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        this.widgetInstance = new kendo.ui.VehicleDeviceFilteredComboBox(elementNode, this.props.options);

        $(this.widgetInstance.wrapper).find('.k-select').on('click', function(e) {
            self.widgetInstance.dataSource.filter([]);
        });
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.widgetInstance.setDataSource && nextProps.options.dataSource) {
            this.widgetInstance.setDataSource(nextProps.options.dataSource);
        }
    },

    //don't run render again, create widget once, then leave it alone
    shouldComponentUpdate: function() {
        return false;
    },

    componentWillUnmount: function() {
        $(this.widgetInstance.wrapper).find('.k-select').off('click');
        this.widgetInstance.destroy();
    },

    render: function() {
        return <div />;
    }
});

export default KendoComboBox
