import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getSailsParams from './helpers/sailsParameterMap';
import { minLength, maxLength } from './helpers/validation';

const users = new kendo.data.DataSource({
    transport: {
        read: {
            url: '//localhost:1337/user',
            dataType: 'json',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            // }
        },
        update: {
            url: function (data) {
                return '//localhost:1337/user/' + data.id;
            },
            type: 'PUT'
        },
        destroy: {
            url: function (data) {
                return '//localhost:1337/user/' + data.id;
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: '//localhost:1337/user',
            dataType: 'json',
            type: 'POST'
        },
        parameterMap: function (kendoParams, type) {
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
                UserName: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Full name is required."
                        },
                        minLength1: minLength("UserName", 1, "minLength1"),
                        maxLength1: maxLength("UserName", 50, "maxLength1")
                    }
                },
                Email: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "Email is required."
                        },
                        minLength14: minLength("Email", 5, "minLength14"),
                        maxLength14: maxLength("Email", 50, "maxLength14")
                    }
                },
                LoginId: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Login Id is required."
                        },
                        minLength14_2: minLength("LoginId", 5, "minLength14_2"),
                        maxLength14_2: maxLength("LoginId", 50, "maxLength14_2")
                    }
                },
            }
        },
        data: function (data) {
            return data.records; // <-- The result is just the data, it doesn't need to be unpacked.
        },
        total: function (data) {
            return data.total; // <-- The total items count is the data length, there is no .Count to unpack.
        }
    },
    serverFiltering: true,
    serverPaging: true,
    serverSorting: true,
    pageSize: 10
});

module.exports = users;
