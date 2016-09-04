import 'kendo-ui-web/content/kendo.common-bootstrap.min.css';
import 'kendo-ui-web/content/kendo.bootstrap.min.css';
import kendoGrid from 'kendo-ui-web/scripts/kendo.grid.min';
import kendoComboBox from 'kendo-ui-web/scripts/kendo.combobox.min';
import React from 'react';
import ReactDOM from 'react-dom';
import businessAccountTypes from './businessAccountTypesDataSource';

const DataGrid = React.createClass({
    resizer() {
        var gridElement = this.grid.element;
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

    componentDidMount() {
        var element = ReactDOM.findDOMNode(this);

        if (this.props.selector) {
            element = element.querySelector(this.props.selector);
        }

        this.grid = new kendoGrid.ui.Grid(element, this.props.options);

        this.resizer();

        $(window).resize(this.resizer);
    },

    componentWillReceiveProps(nextProps) {
        if (this.grid.setDataSource && nextProps.options.dataSource) {
            this.grid.setDataSource(nextProps.options.dataSource);
        }
    },

    //don't run render again, create widget once, then leave it alone
    shouldComponentUpdate() {
        return false;
    },

    componentWillUnmount() {
        $(window).off('resize', this.resizer);
        this.grid.destroy();
    },

    render() {
        return <div />;
    }
});

export default DataGrid;

export const accountTypeEditor = function(container, options) {
    var element = $('<input name="' + options.field + '" required />')
        .appendTo(container);

    new kendoComboBox.ui.ComboBox(
        element,
        {
            dataTextField: 'Name',
            dataValueField: 'Id',
            filter: 'contains',
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
    var firstValueDropDown = e.container.find('select:eq(0)').data('kendoDropDownList');
    firstValueDropDown.value('contains');
    firstValueDropDown.trigger('change');

    var logicDropDown = e.container.find('select:eq(1)').data('kendoDropDownList');
    logicDropDown.value('or');
    logicDropDown.trigger('change');

    var secondValueDropDown = e.container.find('select:eq(2)').data('kendoDropDownList');
    secondValueDropDown.value('contains');
    secondValueDropDown.trigger('change');
}
