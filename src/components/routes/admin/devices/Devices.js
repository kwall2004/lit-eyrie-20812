import React from 'react';
import DataGrid, { clientEditor, filterMenuInit } from '../../../widgets/dataGrid';
import devices from '../../../../kendo/devicesDataSource';

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
              field: 'clientNameSort',
              template: '#: clientName #',
              editor: clientEditor,
              title: 'Client Name',
              width: '200px',
              filterable: true,
              sortable: true
            },
            {
              field: 'imei',
              title: 'IMEI',
              width: '160px',
              filterable: true,
              sortable: true
            },
            {
              field: 'serialNumber',
              title: 'Serial Number',
              width: '160px',
              filterable: true,
              sortable: true
            },
            {
              field: 'vehicleAliasSort',
              template: '#: vehicleAlias #',
              title: 'Vehicle Alias',
              width: '160px',
              filterable: true,
              sortable: true
            },
            {
              field: 'vehicleAlias',
              title: 'Vehicle Alias',
              hidden: true
            },
            {
              field: 'firmwareVersion',
              title: 'FW Version',
              width: '160px',
              filterable: true,
              sortable: true
            },
            {
              field: 'configVersion',
              title: 'Config Version',
              width: '160px',
              filterable: true,
              sortable: true
            },
            {
              field: 'groupId',
              title: 'Group ID',
              format: '{0:n0}',
              width: '85px',
              filterable: true,
              sortable: true
            },
            {
              command: ['edit'],
              title: ' ',
              width: 90,
              resizable: false
            }
          ],
          edit: function (e) {
            e.container.find("label[for=vehicleAliasSort]").parent("div .k-edit-label").hide();
            e.container.find("label[for=vehicleAliasSort]").parent().next("div .k-edit-field").hide();
          }
        }} />
      </section>
    )
  },
});

module.exports = Devices;
