import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getParams from './helpers/waterlineParameterMap';

const clients = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/clients',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl + '/clients/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl + '/clients/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl + '/clients',
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
  batch: false,
  schema: {
    model: {
      id: 'id',
      fields: {
        id: {
          type: 'string',
          defaultValue: ''
        },
        name: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Client Name is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'name') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'name') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        address1: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'Address is required'
            },
            maxLength: (input) => { if (!input[0] || input[0].name != 'address1') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        address2: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name != 'address2') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        city: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'City is required'
            },
            maxLength: (input) => { if (!input[0] || input[0].name != 'city') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
          }
        },
        state: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'State is required'
            },
            maxLength: (input) => { if (!input[0] || input[0].name != 'state') return true; if (input.val().length > 3) { input.attr('data-maxLength-msg', 'Max length is 3'); return false; } return true; }
          }
        },
        country: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'Country is required'
            },
            maxLength: (input) => { if (!input[0] || input[0].name != 'country') return true; if (input.val().length > 30) { input.attr('data-maxLength-msg', 'Max length is 30'); return false; } return true; }
          }
        },
        zip: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'Zip is required'
            },
            maxLength: (input) => { if (!input[0] || input[0].name != 'zip') return true; if (input.val().length > 10) { input.attr('data-maxLength-msg', 'Max length is 10'); return false; } return true; }
          }
        },
        phone: {
          type: 'string',
          editable: true,
          nullable: false,
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

module.exports = clients;
