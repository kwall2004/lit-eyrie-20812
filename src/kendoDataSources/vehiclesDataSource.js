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
        parameterMap: function (data, type) {
            if (type == 'read') {
                var newData = {};
                newData.limit = data.take;
                newData.skip = data.skip;
                if (data.filter) {
                    var filter = data.filter.filters[0];
                    newData.where = {};
                    newData.where[filter.field] = {}
                    newData.where[filter.field][filter.operator] = filter.value;
                }

                return newData;
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
            id: 'VhclID',
            fields: {
                VhclID: {
                    type: 'number',
                    editable: false,
                    nullable: false,
                    defaultValue: 0,
                    validation: {
                        required: {
                            message: 'VhclID is required.'
                        }
                    }
                },
                BsnsInfoID: {
                    type: 'number',
                    editable: true,
                    nullable: false,
                    defaultValue: '',
                    validation: {
                        required: {
                            message: 'BsnsInfoID is required.'
                        }
                    }
                },
                bsnsinfo: {
                    defaultValue: {
                        BsnsInfoID: '',
                        BsnsName: ''
                    }
                },
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
                Modl: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Model is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'Modl') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Modl') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                ModlYear: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Model Year is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'ModlYear') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'ModlYear') return true; if (input.val().length > 4) { input.attr('data-maxLength-msg', 'Max length is 4'); return false; } return true; }
                    }
                },
                Img: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Img') return true; if (input.val().length > 100) { input.attr('data-maxLength-msg', 'Max length is 100'); return false; } return true; }
                    }
                },
                Alas: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Alas is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'Alas') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Alas') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Regs: {
                    type: 'string',
                    editable: true,
                    nullable: true
                },
                VhclStts: {
                    type: 'boolean',
                    editable: true,
                    nullable: false,
                    defaultValue: false,
                    validation: {
                        required: {
                            message: 'VhclStts is required.'
                        }
                    }
                },
                InitOdo: {
                    type: 'number',
                    editable: true,
                    nullable: true,
                    defaultValue: 0,
                    validation: {
                        required: false
                    }
                },
                SpedThrs: {
                    type: 'number',
                    editable: true,
                    nullable: false,
                    defaultValue: 0,
                    validation: {
                        required: {
                            message: 'SpedThrs is required.'
                        }
                    }
                },
                RPMThrs: {
                    type: 'number',
                    editable: true,
                    nullable: false,
                    defaultValue: 0,
                    validation: {
                        required: {
                            message: 'RPMThrs is required.'
                        }
                    }
                }
            }
        },
        data: function (data) {
            return data; // <-- The result is just the data, it doesn't need to be unpacked.
        },
        total: function (data) {
            return 1000; // <-- The total items count is the data length, there is no .Count to unpack.
        }
    },
    serverFiltering: true,
    serverPaging: true,
    serverSorting: true,
    pageSize: 10
});

module.exports = vehicles;
