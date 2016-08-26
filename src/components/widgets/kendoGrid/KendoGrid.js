import kendoGrid from 'kendo-ui-web/scripts/kendo.grid.min';
import kendoComboBox from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import businessAccountTypes from '../../../kendoDataSources/businessAccountTypes';

const KendoGrid = React.createClass({
    resizer() {
        var gridElement = this.widgetInstance.element;
        var dataArea = gridElement.find('.k-grid-content');
        var gridHeight = $(window).height() - 230 + 43;
        var otherElements = gridElement.children().not('.k-grid-content');
        var otherElementsHeight = 0;

        if ($(window).width() < 768) {
            gridHeight = gridHeight - 51;
        }

        otherElements.each(function() {
            otherElementsHeight += $(this).outerHeight();
        });

        var dataAreaHeight = gridHeight - otherElementsHeight;
        if (dataAreaHeight <= 300) {
            dataAreaHeight = 300;
        }
        dataArea.height(dataAreaHeight);
    },

    componentDidMount: function() {
        var self = this;

        var elementNode = ReactDOM.findDOMNode(this);

        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        this.widgetInstance = new kendoGrid.ui.Grid(elementNode, this.props.options);

        this.resizer();

        $(window).resize(this.resizer);
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
        $(window).off('resize', this.resizer);
        this.widgetInstance.destroy();
    },

    render: function() {
        return <div />;
    }
});

export default KendoGrid;

export const accountTypeEditor = function(container, options) {
    var element = $('<input name="' + options.field + '" required />')
        .appendTo(container);

    new kendoComboBox.ui.ComboBox(
        element,
        {
            dataTextField: "Name",
            dataValueField: "Id",
            filter: "contains",
            autoBind: false,
            minLength: 3,
            dataSource: businessAccountTypes,
            template: '<span class="k-state-default">#: data.Name #</span>',
            dataBound: function (e) {
                e.preventDefault();
                if (!options.model.isNew() && !businessAccountTypes.get(options.model.BusinessAccountType.Id)) {
                    businessAccountTypes.add(options.model.BusinessAccountType);
                }
            },
            change: function (e) {
                if (this.selectedIndex != null && this.selectedIndex != undefined && this.selectedIndex >= 0) {
                    var selectedValue = this.value();
                    options.model.BusinessAccountTypeId = selectedValue;
                }
            }
        });
}

export const filterMenuInit = function(e) {
    var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
    firstValueDropDown.value("contains");
    firstValueDropDown.trigger("change");

    var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
    logicDropDown.value("or");
    logicDropDown.trigger("change");

    var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
    secondValueDropDown.value("contains");
    secondValueDropDown.trigger("change");
}
