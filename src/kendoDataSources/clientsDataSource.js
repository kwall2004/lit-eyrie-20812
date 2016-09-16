import kendo from 'kendo-ui-web/scripts/kendo.data.min';
import getSailsParams from './helpers/sailsParameterMap';

const clients = new kendo.data.DataSource({
    transport: {
        read: {
            url: '//localhost:1337/client',
            dataType: 'json',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            // }
        },
        update: {
            url: function (data) {
                return '/odata/BsnsInfo(' + data.BsnsInfoID + ')';
            },
            type: 'PATCH'
        },
        destroy: {
            url: function (data) {
                return '/odata/BsnsInfo(' + data.BsnsInfoID + ')';
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: '/odata/BsnsInfo',
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
    batch: false,
    schema: {
        model: {
            id: 'id',
            fields: {
                id: {
                    type: 'string',
                    defaultValue: ''
                },
                Name: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Client Name is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'Name') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Name') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Address1: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'Address is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Address1') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Address2: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Address2') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                City: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'City is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'City') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                State: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'State is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'State') return true; if (input.val().length > 3) { input.attr('data-maxLength-msg', 'Max length is 3'); return false; } return true; }
                    }
                },
                Country: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'Country is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Country') return true; if (input.val().length > 30) { input.attr('data-maxLength-msg', 'Max length is 30'); return false; } return true; }
                    }
                },
                Zip: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'Zip is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Zip') return true; if (input.val().length > 10) { input.attr('data-maxLength-msg', 'Max length is 10'); return false; } return true; }
                    }
                },
                Phone: {
                    type: 'string',
                    editable: true,
                    nullable: false,
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

module.exports = clients;
