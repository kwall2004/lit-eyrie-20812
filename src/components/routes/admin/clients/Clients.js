import React from 'react';
import DataGrid, { filterMenuInit } from '../../../widgets/dataGrid';
import clients from '../../../../kendoDataSources/clientsDataSource';

const Clients = React.createClass({
  render() {
    return (
      <section>
        <DataGrid options={{
          dataSource: clients,
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
            field: 'Name',
            title: 'Client Name',
            filterable: true,
            sortable: true,
            width: 180
          },
          {
            field: 'Address1',
            title: 'Address 1',
            filterable: true,
            sortable: true,
            width: 171
          },
          {
            field: 'Address2',
            title: 'Address 2',
            filterable: true,
            sortable: true,
            width: 85
          },
          {
            field: 'City',
            title: 'City',
            filterable: true,
            sortable: true,
            width: 160
          },
          {
            field: 'State',
            title: 'State',
            filterable: true,
            sortable: true,
            width: 80
          },
          {
            field: 'Country',
            title: 'Country',
            filterable: true,
            sortable: true,
            width: 95
          },
          {
            field: 'Zip',
            title: 'Zip',
            filterable: true,
            sortable: true,
            width: 65
          },
          {
            field: 'Phone',
            title: 'Phone',
            filterable: true,
            sortable: true,
            width: 110
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

module.exports = Clients;
