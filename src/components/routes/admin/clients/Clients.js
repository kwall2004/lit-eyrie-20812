import React from 'react';
import DataGrid, { filterMenuInit } from '../../../widgets/dataGrid';
import clients from '../../../../kendo/clientsDataSource';

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
            field: 'name',
            title: 'Client Name',
            filterable: true,
            sortable: true,
            width: 180
          },
          {
            field: 'address1',
            title: 'Address 1',
            filterable: true,
            sortable: true,
            width: 171
          },
          {
            field: 'address2',
            title: 'Address 2',
            filterable: true,
            sortable: true,
            width: 85
          },
          {
            field: 'city',
            title: 'City',
            filterable: true,
            sortable: true,
            width: 160
          },
          {
            field: 'state',
            title: 'State',
            filterable: true,
            sortable: true,
            width: 80
          },
          {
            field: 'country',
            title: 'Country',
            filterable: true,
            sortable: true,
            width: 95
          },
          {
            field: 'zip',
            title: 'Zip',
            filterable: true,
            sortable: true,
            width: 65
          },
          {
            field: 'phone',
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
