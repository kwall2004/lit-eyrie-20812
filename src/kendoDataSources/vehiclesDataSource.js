import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const vehicles = new kendo.data.DataSource({
    transport: {
        read: {
            url: '//localhost:1337/vehicle',
            dataType: 'json',
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            // }
        },
        update: {
            url: function (data) {
                return '/odata/Vehicle(' + data.VhclID + ')';
            },
            type: 'PATCH'
        },
        destroy: {
            url: function (data) {
                return '/odata/Vehicle(' + data.VhclID + ')';
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: '/odata/Vehicle',
            dataType: 'json',
            type: 'POST'
        },
        parameterMap: function (kendoParams, type) {
            if (type == 'read') {
                var waterlineParams = {};
                waterlineParams.limit = kendoParams.take;
                waterlineParams.skip = kendoParams.skip;
                if (kendoParams.filter) {
                    waterlineParams.where = {};
                    var logic = kendoParams.filter.logic;
                    if (logic === 'and') {
                        logic = '$and';
                    }
                    waterlineParams.where[logic] = [];
                    kendoParams.filter.filters.forEach(function (element, index, array) {
                        var pair = {};
                        switch (element.operator) {
                            case 'eq':
                                pair[element.field] = element.value;
                                break;
                            case 'neq':
                                pair[element.field] = {};
                                pair[element.field]['!'] = element.value;
                                break;
                            case 'startswith':
                                pair[element.field] = {};
                                pair[element.field]['startsWith'] = element.value;
                                break;
                            case 'endswith':
                                pair[element.field] = {};
                                pair[element.field]['endsWith'] = element.value;
                                break;
                            default:
                                pair[element.field] = {};
                                pair[element.field][element.operator] = element.value;
                        }
                        waterlineParams.where[logic].push(pair);
                    });
                }
                if (kendoParams.sort) {
                    waterlineParams.sort = {};
                    kendoParams.sort.forEach(function (element, index, array) {
                        waterlineParams.sort[element.field] = element.dir;
                    });
                }

                return waterlineParams;
            }
            else if (type == 'create') {
                options.VhclID = 0;
                delete options.bsnsinfo;
                delete options.UserInfoID_input;
                delete options.BsnsInfoID_input;
                return kendo.data.transports.odata.parameterMap(options, type);
            }
            else {
                delete options.bsnsinfo;
                delete options.UserInfoID_input;
                delete options.BsnsInfoID_input;
                return kendo.data.transports.odata.parameterMap(options, type);
            }
        }
    },
    schema: {
        model: {
            id: 'id',
            fields: {
                id: {
                    type: 'number',
                    editable: false,
                    nullable: false,
                    defaultValue: 0,
                    validation: {
                        required: {
                            message: 'id is required.'
                        }
                    }
                },
                // BsnsInfoID: {
                //     type: 'number',
                //     editable: true,
                //     nullable: false,
                //     defaultValue: '',
                //     validation: {
                //         required: {
                //             message: 'BsnsInfoID is required.'
                //         }
                //     }
                // },
                // bsnsinfo: {
                //     defaultValue: {
                //         BsnsInfoID: '',
                //         BsnsName: ''
                //     }
                // },
                VIN: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'VIN is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'VIN') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'VIN') return true; if (input.val().length > 25) { input.attr('data-maxLength-msg', 'Max length is 25'); return false; } return true; }
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
                OdoReading: {
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
