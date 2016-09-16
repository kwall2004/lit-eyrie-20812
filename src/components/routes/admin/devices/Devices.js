import React from 'react';
import DataGrid, { clientEditor, filterMenuInit } from '../../../widgets/dataGrid';
import devices from '../../../../kendoDataSources/devicesDataSource';

const Devices = React.createClass({
    render() {
        return (
            <section>
                <DataGrid options={{
                    dataSource: devices,
                    toolbar: ['create'],
                    editable: 'popup',
                    resizable: true,
                    filterable: true,
                    filterMenuInit: filterMenuInit,
                    sortable: {
                        mode: 'multiple',
                    },
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        buttonCount: 5
                    },
                    columns: [
                    {
                        field: 'ClientName',
                        editor: clientEditor,
                        title: 'Client Name',
                        width: '200px',
                        filterable: true,
                        sortable: true
                    },
                    {
                        field: "IMEI",
                        title: "IMEI",
                        width: "160px",
                        filterable: true,
                        sortable: true
                    },
                    {
                        field: "FirmwareVersion",
                        title: "FW Version",
                        width: "160px",
                        filterable: true,
                        sortable: true
                    },
                    {
                        field: "ConfigVersion",
                        title: "Config Version",
                        width: "160px",
                        filterable: true,
                        sortable: true
                    },
                    {
                        field: "GroupId",
                        title: "Group ID",
                        format: "{0:n0}",
                        width: "85px",
                        filterable: true,
                        sortable: true
                    },
                    {
                        field: "SerialNumber",
                        title: "Serial Number",
                        width: "160px",
                        filterable: true,
                        sortable: true
                    },
                    {
                        command: ['edit'],
                        title: ' ',
                        width: 90,
                        resizable: false
                    }]
                }} />
            </section>
        )
    },
});

module.exports = Devices;
