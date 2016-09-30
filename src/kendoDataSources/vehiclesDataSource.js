import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getSailsParams from './helpers/sailsParameterMap';

const vehicles = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl2 + '/vehicles',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl2 + '/vehicles/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl2 + '/vehicles/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl2 + '/vehicles',
      dataType: 'json',
      type: 'POST'
    },
    parameterMap: (kendoParams, type) => {
      switch (type) {
        case 'read':
        return getSailsParams(kendoParams);
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
        ClientId: {
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
        Make: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Make is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'Make') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'Make') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        Model: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Model is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'Model') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'Model') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        ModelYear: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Model Year is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'ModelYear') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'ModelYear') return true; if (input.val().length > 4) { input.attr('data-maxLength-msg', 'Max length is 4'); return false; } return true; }
          }
        },
        Alias: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Alias is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        Odometer: {
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
      return data.data; // <-- The result is just the data, it doesn't need to be unpacked.
    },
    total: (data) => {
      return data.count; // <-- The total items count is the data length, there is no .Count to unpack.
    }
  },
  serverFiltering: true,
  serverPaging: true,
  serverSorting: true,
  pageSize: 10
});

module.exports = vehicles;
