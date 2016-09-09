import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const clients = new kendo.data.DataSource({
    type: 'odata',
    transport: {
        read: {
            url: process.env.apiBaseUrl + '/odata/BsnsInfo',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
            }
        },
        update: {
            url: function (data) {
                return "/odata/BsnsInfo(" + data.BsnsInfoID + ")";
            },
            type: 'PATCH'
        },
        destroy: {
            url: function (data) {
                return "/odata/BsnsInfo(" + data.BsnsInfoID + ")";
            },
            dataType: 'json',
            type: 'DELETE'
        },
        create: {
            url: '/odata/BsnsInfo',
            dataType: 'json',
            type: 'POST'
        },
        parameterMap: function (options, type) {
            if (type == 'read') {
                var paramMap = kendo.data.transports.odata.parameterMap(options, type);
                paramMap.$expand = 'BusinessAccountType';
                //delete paramMap.$inlinecount; // <-- remove inlinecount parameter
                delete paramMap.$format; // <-- remove format parameter

                return paramMap;
            }
            else if (type == 'create') {
                options.BsnsInfoID = 0;
                delete options.BusinessAccountType
                return kendo.data.transports.odata.parameterMap(options, type);
            }
            else {
                delete options.BusinessAccountType
                return kendo.data.transports.odata.parameterMap(options, type);
            }
        }
    },
    batch: false,
    schema: {
        model: {
            id: 'BsnsInfoID',
            fields: {
                BsnsInfoID: {
                    type: 'number',
                    defaultValue: ''
                },
                BsnsName: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Client Name is required.'
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'BsnsName') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'BsnsName') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Alias: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Adrs1: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'Address is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Adrs1') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Adrs2: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Adrs2') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
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
                Stat: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'State is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Stat') return true; if (input.val().length > 3) { input.attr('data-maxLength-msg', 'Max length is 3'); return false; } return true; }
                    }
                },
                Ctry: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: 'Country is required'
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Ctry') return true; if (input.val().length > 30) { input.attr('data-maxLength-msg', 'Max length is 30'); return false; } return true; }
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
                Fax: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Fax') return true; if (input.val().length > 10) { input.attr('data-maxLength-msg', 'Max length is 10'); return false; } return true; }
                    }
                },
                Web: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Web') return true; if (input.val().length > 100) { input.attr('data-maxLength-msg', 'Max length is 100'); return false; } return true; }
                    }
                },
                TimeZone: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'TimeZone') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'TimeZone') return true; if (input.val().length > 5) { input.attr('data-maxLength-msg', 'Max length is 5'); return false; } return true; }
                    }
                },
                TripDataFTPRoot: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'TripDataFTPRoot') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'TripDataFTPRoot') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                KMLDataWebRoot: {
                    type: 'string',
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'KMLDataWebRoot') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'KMLDataWebRoot') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                StartDate: {
                    type: 'date',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Start Date is required'
                        }
                    }
                },
                EndDate: {
                    type: 'date',
                    editable: true,
                    nullable: true,
                },
                BusinessAccountTypeId: {
                    type: 'string',
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: 'Business Account Type is required'
                        }
                    }
                },
                BusinessAccountType: {
                    defaultValue: {
                        Id: '',
                        Name: '',
                        DemoLengthDays: 0
                    }
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
    serverFiltering: true,
    serverPaging: true,
    serverSorting: true,
    pageSize: 10
});

module.exports = clients;
