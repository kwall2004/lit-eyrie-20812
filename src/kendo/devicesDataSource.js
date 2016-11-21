import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getParams from './helpers/mongoParameterMap';

const devices = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/devices',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl + '/devices/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl + '/devices/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl + '/devices',
      dataType: 'json',
      type: 'POST'
    },
    parameterMap: (kendoParams, type) => {
      switch (type) {
        case 'read':
          return getParams(kendoParams);
        case 'create':
          delete kendoParams.id;
        default:
          return kendoParams;
      }
    }
  },
  schema: {
    model: {
      id: 'id',
      fields: {
        id: {
          type: 'string',
          defaultValue: '',
        },
        clientId: {
          type: 'string',
          editable: true,
          nullable: false,
          defaultValue: '',
          validation: {
            required: {
              message: 'Client Id is required.'
            }
          }
        },
        clientName: {
          type: 'string'
        },
        imei: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'IMEI is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name !== 'imei') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name !== 'imei') return true; if (input.val().length > 18) { input.attr('data-maxLength-msg', 'Max length is 18'); return false; } return true; }
          }
        },
        serialNumber: {
          type: 'string',
          editable: true,
          nullable: true,
        },
        firmwareVersion: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name !== 'firmwareVersion') return true; if (input.val().length > 20) { input.attr('data-maxLength-msg', 'Max length is 20'); return false; } return true; }
          }
        },
        configVersion: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name !== 'configVersion') return true; if (input.val().length > 20) { input.attr('data-maxLength-msg', 'Max length is 20'); return false; } return true; }
          }
        },
        groupId: {
          type: 'number',
          editable: true,
          nullable: false,
          defaultValue: 1,
          validation: {
            required: {
              message: 'Group Id is required.'
            }
          }
        },
        vehicleAlias: {
          type: 'string',
          editable: true
        }
      }
    },
    parse: (data) => {
      if (data.data) {
        data.data = data.data.map((d) => {
          var device = Object.assign({}, d);
          device.vehicleAlias = d.vehicleAlias || '';
          return device;
        });
      }
      
      return data;
    },
    data: (data) => {
      if (data.data) {
        return data.data;
      }

      return data;
    },
    total: (data) => {
      return data.count;
    }
  },
  serverFiltering: true,
  serverPaging: true,
  serverSorting: true,
  pageSize: 10
});

module.exports = devices;
