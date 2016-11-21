import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getParams from './helpers/waterlineParameterMap';

const vehicles = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/vehicles',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl + '/vehicles/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl + '/vehicles/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl + '/vehicles',
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
        alias: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Alias is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'alias') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'alias') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        vin: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Alias is required.'
            }
          }
        },
        make: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Make is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'make') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'make') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        model: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Model is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'model') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'model') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        modelYear: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Model Year is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'modelYear') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'modelYear') return true; if (input.val().length > 4) { input.attr('data-maxLength-msg', 'Max length is 4'); return false; } return true; }
          }
        },
        odometer: {
          type: 'number',
          editable: true,
          nullable: true,
          defaultValue: 0,
          validation: {
            required: false
          }
        },
      }
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

module.exports = vehicles;
