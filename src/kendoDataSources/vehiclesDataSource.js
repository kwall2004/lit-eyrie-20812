import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getSailsParams from './helpers/sailsParameterMap';

const vehicles = new kendo.data.DataSource({
    transport: {
        read: {
            url: process.env.apiBaseUrl2 + '/vehicle',
            dataType: 'json',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            // }
        },
        update: {
            url: function (data) {
                return process.env.apiBaseUrl2 + '/vehicle/' + data.id;
            },
            type: 'PUT'
        },
        destroy: {
            url: function (data) {
                return process.env.apiBaseUrl2 + '/vehicle/' + data.id;
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: process.env.apiBaseUrl2 + '/vehicle',
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
                Make: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Make is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'Make') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Make') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
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
                        minLength: function (input) { if (!input[0] || input[0].name != 'Model') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Model') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
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
                        minLength: function (input) { if (!input[0] || input[0].name != 'ModelYear') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'ModelYear') return true; if (input.val().length > 4) { input.attr('data-maxLength-msg', 'Max length is 4'); return false; } return true; }
                    }
                },
                Alias: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Alas is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                OdometerReading: {
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

module.exports = vehicles;
