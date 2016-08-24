import React from 'react';
import businessAccountTypes from '../../kendoData/businessAccountTypes';
import clients from '../../kendoData/clients'
import KendoGrid from '../kendoGrid';

const Clients = React.createClass({
    render() {
        return (
            <section>
                <KendoGrid options={{
                    dataSource: clients,
                    toolbar: ["create"],
                    editable: "popup",
                    resizable: true,
                    filterable: true,
                    filterMenuInit: function(e) {
                        var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
                        firstValueDropDown.value("contains");
                        firstValueDropDown.trigger("change");

                        var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
                        logicDropDown.value("or");
                        logicDropDown.trigger("change");

                        var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
                        secondValueDropDown.value("contains");
                        secondValueDropDown.trigger("change");
                    },
                    sortable: {
                        mode: "multiple",
                    },
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        buttonCount: 5
                    },
                    columns: [{
                        field: "BsnsName",
                        title: "Client Name",
                        filterable: true,
                        sortable: true,
                        width: 180
                    },
                    {
                        field: "Adrs1",
                        title: "Address 1",
                        filterable: true,
                        sortable: true,
                        width: 171
                    }, {
                        field: "Adrs2",
                        title: "Address 2",
                        filterable: true,
                        sortable: true,
                        width: 85
                    }, {
                        field: "City",
                        title: "City",
                        filterable: true,
                        sortable: true,
                        width: 160
                    }, {
                        field: "Stat",
                        title: "State",
                        filterable: true,
                        sortable: true,
                        width: 80
                    }, {
                        field: "Ctry",
                        title: "Country",
                        filterable: true,
                        sortable: true,
                        width: 95
                    }, {
                        field: "Zip",
                        title: "Zip",
                        filterable: true,
                        sortable: true,
                        width: 65
                    }, {
                        field: "Phone",
                        title: "Phone",
                        filterable: true,
                        sortable: true,
                        width: 110
                    }, {
                        field: "BusinessAccountTypeId",
                        template: "#: BusinessAccountType.Name #",
                        title: "Act. Type",
                        editor: this.accountTypeIDDropDownEditor,
                        filterable: true,
                        sortable: true,
                        width: 110
                    }, {
                        field: "StartDate",
                        title: "Start Date",
                        filterable: true,
                        sortable: true,
                        format: "{0: yyyy-MM-dd}",
                        width: 90
                    }, {
                        field: "EndDate",
                        title: "End Date",
                        filterable: true,
                        sortable: true,
                        format: "{0: yyyy-MM-dd}",
                        width: 90
                    }, {
                        command: ["edit"],
                        title: " ",
                        width: 90,
                        resizable: false
                    }]
                }} />
            </section>
        )
    },

    accountTypeIDDropDownEditor(container, options) {
        $('<input name="' + options.field + '" required />')
            .appendTo(container)
            .kendoComboBox({
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
            }).data('kendoComboBox');
    }
});

module.exports = Clients;
