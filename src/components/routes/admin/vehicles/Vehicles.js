import React from 'react';
import DataGrid, { clientEditor, filterMenuInit } from '../../../widgets/dataGrid';
import vehicles from '../../../../kendoDataSources/vehiclesDataSource';

const Vehicles = React.createClass({
    render() {
        return (
            <section>
                <DataGrid options={{
                    dataSource: vehicles,
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
                    // {
                    //     field: 'bsnsinfo.BsnsName',
                    //     editor: clientEditor,
                    //     title: 'Client Name',
                    //     width: '200px',
                    //     filterable: true,
                    //     sortable: true
                    // },
                    {
                        field: 'Make',
                        title: 'Make',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'Model',
                        title: 'Model',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'ModelYear',
                        title: 'Model Year',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'Alias',
                        title: 'Alias',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'OdoReading',
                        title: 'Odo Reading',
                        width: '100px',
                        filterable: true,
                        sortable: true
                    }, {
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

module.exports = Vehicles;
