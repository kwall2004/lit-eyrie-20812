import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getParams from './helpers/waterlineParameterMap';
import { minLength, maxLength } from './helpers/validation';

const users = new kendo.data.DataSource({
  transport: {
    read: {
      url: process.env.apiBaseUrl + '/users',
      dataType: 'json',
      // beforeSend: (xhr) => {
      //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      // }
    },
    update: {
      url: (data) => {
        return process.env.apiBaseUrl + '/users/' + data.id;
      },
      type: 'PUT'
    },
    destroy: {
      url: (data) => {
        return process.env.apiBaseUrl + '/users/' + data.id;
      },
      dataType: 'json',
      type: 'DELETE'
    },
    create: {
      url: process.env.apiBaseUrl + '/users',
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
        userName: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Full name is required.'
            },
            minLength1: minLength('UserName', 1, 'minLength1'),
            maxLength1: maxLength('UserName', 50, 'maxLength1')
          }
        },
        email: {
          type: 'string',
          editable: true,
          nullable: true,
          validation: {
            required: {
              message: 'Email is required.'
            },
            minLength14: minLength('Email', 5, 'minLength14'),
            maxLength14: maxLength('Email', 50, 'maxLength14')
          }
        },
        loginId: {
          type: 'string',
          editable: true,
          nullable: false,
          validation: {
            required: {
              message: 'Login Id is required.'
            },
            minLength14_2: minLength('LoginId', 5, 'minLength14_2'),
            maxLength14_2: maxLength('LoginId', 50, 'maxLength14_2')
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

module.exports = users;
