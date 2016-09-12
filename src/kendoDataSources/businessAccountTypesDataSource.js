import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const businessAccountTypes = new kendo.data.DataSource({
    type: 'odata',
    transport: {
        read: {
            url: process.env.apiBaseUrl + '/odata/BusinessAccountTypes',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            }
        },
        update: {
            url: function (data) {
                return '/odata/BusinessAccountTypes(' + data.Id + ')';
            },
            type: 'PATCH'
        },
        destroy: {
            url: function (data) {
                return '/odata/BusinessAccountTypes(' + data.Id + ')';
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: '/odata/BusinessAccountTypes',
            dataType: 'json',
            type: 'POST'
        },
        parameterMap: function (options, type) {
            if (type == 'read') {
                var paramMap = kendo.data.transports.odata.parameterMap(options, type);
                //delete paramMap.$inlinecount; // <-- remove inlinecount parameter
                delete paramMap.$format; // <-- remove format parameter
                return paramMap;
            }
            else if (type == 'create') {
                options.Id = '';
                return kendo.data.transports.odata.parameterMap(options, type);
            }
            else {
                return kendo.data.transports.odata.parameterMap(options, type);
            }
        }
    },
    schema: {
        model: {
            id: 'Id',
            fields: {
                Id: {
                    type: 'string',
                    editable: false,
                    nullable: false,
                    defaultValue: ''
                },
                Name: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Name is required.'
                        }
                    }
                },
                DemoLengthDays: {
                    type: 'number',
                    editable: true,
                    nullable: true,
                    defaultValue: 0,
                    validation: {
                        required: true
                    }
                },
                Businesses: {
                    defaultValue: []
                }
            }
        },
        data: function (data) {
            return data.value; // <-- The result is just the data, it doesn't need to be unpacked.
        },
        total: function (data) {
            return data['odata.count']; // <-- The total items count is the data length, there is no .Count to unpack.
        }
    },
    serverFiltering: false,
    serverPaging: false,
    serverSorting: false
});

module.exports = businessAccountTypes;
