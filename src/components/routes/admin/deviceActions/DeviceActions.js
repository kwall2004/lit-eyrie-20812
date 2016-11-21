import React from 'react';
import DataGrid, { filterMenuInit } from '../../../widgets/dataGrid';
import deviceActions from '../../../../kendo/deviceActionsDataSource';

const DeviceActions = React.createClass({
  render() {
    return (
      <section>
        <DataGrid options={{
          dataSource: deviceActions,
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
            field: 'groupId',
            title: 'Group Id',
            format: '{0:n0}',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'logEvent',
            title: 'Log Event',
            format: '{0:n0}',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'index',
            title: 'Index',
            format: '{0:n0}',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'action',
            title: 'Action',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'arg1',
            title: 'Arg1',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'arg2',
            title: 'Arg2',
            width: '150px',
            filterable: true,
            sortable: true
          },
          {
            field: 'arg3',
            title: 'Arg3',
            width: 150,
            filterable: true,
            sortable: true
          },
          {
            command: ['edit', 'destroy'],
            title: ' ',
            width: 177,
            resizable: false
          }]
        }} />
      </section>
    )
  },
});

module.exports = DeviceActions;
