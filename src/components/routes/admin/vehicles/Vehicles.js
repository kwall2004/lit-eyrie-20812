import React from 'react';
import DataGrid, { clientEditor, filterMenuInit } from '../../../widgets/dataGrid';
import vehicles from '../../../../kendo/vehiclesDataSource';

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
          columns: [{
            field: 'clientName',
            editor: clientEditor,
            title: 'Client Name',
            width: '200px',
            filterable: true,
            sortable: true
          },
          {
            field: 'alias',
            title: 'Alias',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'vin',
            title: 'VIN',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'make',
            title: 'Make',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'model',
            title: 'Model',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'modelYear',
            title: 'Model Year',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'odometer',
            title: 'Odometer',
            width: '100px',
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

module.exports = Vehicles;
