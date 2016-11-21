import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getParams from './helpers/waterlineParameterMap';

const deviceActions = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/deviceactions',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl + '/deviceactions/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl + '/deviceactions/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl + '/deviceactions',
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
        groupId: {
          type: 'number',
          editable: true,
          nullable: false,
          defaultValue: 0,
          validation: {
            required: {
              message: 'Group id is required.'
            }
          }
        },
        logEvent: {
          type: 'number',
          editable: true,
          nullable: false,
          defaultValue: 0,
          validation: {
            required: {
              message: 'Log event is required.'
            }
          }
        },
        index: {
          type: 'number',
          editable: true,
          nullable: false,
          defaultValue: 0,
          validation: {
            required: {
              message: 'Index is required.'
            }
          }
        },
        action: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Action is required.'
            },
            minLength: (input) => { if (!input[0] || input[0].name != 'actn') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
            maxLength: (input) => { if (!input[0] || input[0].name != 'actn') return true; if (input.val().length > 45) { input.attr('data-maxLength-msg', 'Max length is 45'); return false; } return true; }
          }
        },
        arg1: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name != 'arg1') return true; if (input.val().length > 45) { input.attr('data-maxLength-msg', 'Max length is 45'); return false; } return true; }
          }
        },
        arg2: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name != 'arg2') return true; if (input.val().length > 45) { input.attr('data-maxLength-msg', 'Max length is 45'); return false; } return true; }
          }
        },
        arg3: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: false,
            maxLength: (input) => { if (!input[0] || input[0].name != 'arg3') return true; if (input.val().length > 45) { input.attr('data-maxLength-msg', 'Max length is 45'); return false; } return true; }
          }
        }
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

module.exports = deviceActions;
