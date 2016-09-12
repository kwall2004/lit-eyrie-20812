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
                        field: 'Modl',
                        title: 'Model',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'ModlYear',
                        title: 'Model Year',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'Alas',
                        title: 'Alias',
                        width: '150px',
                        filterable: true,
                        sortable: true
                    }, {
                        field: 'InitOdo',
                        title: 'ODO Reading',
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
