import React from 'react';
import KendoGrid, { accountTypeEditor, filterMenuInit } from '../../../widgets/kendoGrid';
import clients from '../../../../kendoDataSources/clients'

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
                    filterMenuInit: filterMenuInit,
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
                        editor: accountTypeEditor,
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
});

module.exports = Clients;
