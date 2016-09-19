import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getSailsParams from './helpers/sailsParameterMap';

const devices = new kendo.data.DataSource({
    transport: {
        read: {
            url: process.env.apiBaseUrl + '/device',
            dataType: 'json',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            // }
        },
        update: {
            url: function (data) {
                return process.env.apiBaseUrl + '/device/' + data.id;
            },
            type: 'PUT'
        },
        destroy: {
            url: function (data) {
                return process.env.apiBaseUrl + '/device/' + data.id;
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: process.env.apiBaseUrl + '/device',
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
                IMEI: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "IMEI is required."
                        },
                        minLength: function (input) { if (!input[0] || input[0].name !== 'IMEI') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name !== 'IMEI') return true; if (input.val().length > 18) { input.attr('data-maxLength-msg', 'Max length is 18'); return false; } return true; }
                    }
                },
                GroupId: {
                    type: "number",
                    editable: true,
                    nullable: false,
                    defaultValue: 1,
                    validation: {
                        required: {
                            message: "Group Id is required."
                        }
                    }
                },
                FirmwareVersion: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name !== 'FirmwareVersion') return true; if (input.val().length > 20) { input.attr('data-maxLength-msg', 'Max length is 20'); return false; } return true; }
                    }
                },
                ConfigVersion: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name !== 'ConfigVersion') return true; if (input.val().length > 20) { input.attr('data-maxLength-msg', 'Max length is 20'); return false; } return true; }
                    }
                },
                SerialNumber: {
                    type: "string",
                    editable: true,
                    nullable: true,
                }
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

module.exports = devices;
