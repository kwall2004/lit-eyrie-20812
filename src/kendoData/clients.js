import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const clients = new kendo.data.DataSource({
    type: 'odata',
    transport: {
        read: {
            url: 'http://localhost:65027/odata/BsnsInfo',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(
                'Authorization',
                'Bearer KiLT2XxE8zE8K3z61oXAkYoJh5Wa7_2ILqz3wuI51WhSwn82QmLaZ0JxkF_CQnFy8qbZW1hYjdWmT1g5B_k-ZeR5CeRqTQ8mLTDWu7gGi4Nq_O5COzXD2ZQYAehAOMN3RKokZITtfyT5D33NUjblI9dhmTz2gzLWlUFAWGNw1A1clV9kW7MK_UbyLOOG5NwlEdB7wnHO-yeYAhoPWdNPRDboy-amHRnfK-vcIbENSpT2CBE9sklIzRWhIYFRBw7_gOBAI-wYjN2LWeUhW5COJXk0ldQ0s8N800_BeRgLmK1xrChhoqLAdp3WU9Tl5pZGgAHL-Z0dIKu7204OXPkJZ0VcgU6gBl-yMH8bH9svVOGd4O1eWqIgqkOwOyGY2jbyCeGKNHbs7kDP5MDOZJVFXx5BobkcfgqEKGN2r4QdJxOQv_l71K61QENqGB0vl_tMncZrJO9emN5oaWwVyH9IFCPhREP4KwuiNpCDw0qKFa66_iFaBH8x_zNiQCtLve2WBl7xgL-QFJXCbLs7k4xsLWqCMaTYET8EoCSvIvWMs_XlRWqsLcN2g_g7v4wRH4LlHydB5RSpOAQMFtIppVdmSWx-xMfo94rDJjPHYmFVOXJhiZj8DIqdI8lhi4lx0mcR05fbUFZ3PA6J_0GzVM2RzMpiWFRwciDepLdEhCQx9qUcl5J-DZZC-p4-S1TAtqtP1qGeN3ww6RDYTvj0VAsoYGeB8LR6mtkBv7vlfzhMV4uykwUeVep9-JuQi9DEvW9Ag0QPjaQqHBdOWUVUpQfNEB4YB-RE__-2xmEZz6B1GeWtCGrwMl82SNkeiWCPihxNBuJ1xnz3BV8vIVvPZIAgaT6SWgvkEtw-82Ky2dxqW45AyuPh-ZqQNmiZh72NJzeKvWmd4FEoUKg5elgswWc8ss6X_NTyQk7mlqDPmJEYgzP6J0G6Fi17t5VeChBtaFv3qr7Dpsg_w03JF6-fRCLyPoeBrfBDDbm7py_4cgCw-1QkiHJixZmUcmVyb6R0EZHMmsVJnLHvIzgRQ-FicscowgW4eltXvypKwLEZjtgj1EOz6cye9bGDyF7CPKrHl5CAEtL_oor4HnIrhWV0iuq3sQm9q6LaRTDpb-nEx2lPheHD9SqcR12WyLG1bnTrj-NHf5eWYbmCe3BAmLAqKTyqKyJdGGilm6DxpBe27_HIM-jYZJ860d3iATTFjvkva4ff4ct1qAhA0fdH3uJmJQR708JoFWZ8lEK1o4MQHCEjHfxL0fCxHCFJkeSTqDxr9qp0myjz_e3aSgmkC0n3tLoNhFqa94PR_BRrXk_RAwdXJOUDcNKFWotfJ8NQNGmfjWC6E6-7TcDH0aTCngouwnIrdIyeiCQ6aim4Uyv68lhv-RAQQbEamvCsg2YtoJGSzGnTAxONNw-73rf7RhVZYsVELL8IiLKryx8afnVvUURkz_u1l0ba6ZZi1HzrVmUlQoQo5TzIT_YqQ4YMAiO0Ohm34c-krWmVDgIjBYJ3WG_II_j5eac3gei-87v8nSwsZvZUGbXoV2XIcmjs1yCIWdleGbx_j_pXdWEaHeB9bxWP-04rGo0WWKcmOo34sro-GP-h'
                )
            }
        },
        update: {
            url: function (data) {
                return "/odata/BsnsInfo(" + data.BsnsInfoID + ")";
            },
            type: "PATCH"
        },
        destroy: {
            url: function (data) {
                return "/odata/BsnsInfo(" + data.BsnsInfoID + ")";
            },
            dataType: "json",
            type: "DELETE"
        },
        create: {
            url: "/odata/BsnsInfo",
            dataType: "json",
            type: "POST"
        },
        parameterMap: function (options, type) {
            if (type == "read") {
                var paramMap = kendo.data.transports.odata.parameterMap(options, type);
                paramMap.$expand = "BusinessAccountType";
                //delete paramMap.$inlinecount; // <-- remove inlinecount parameter
                delete paramMap.$format; // <-- remove format parameter

                return paramMap;
            }
            else if (type == "create") {
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
            id: "BsnsInfoID",
            fields: {
                BsnsInfoID: {
                    type: "number",
                    defaultValue: ""
                },
                BsnsName: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Client Name is required."
                        },
                        minLength: function (input) { if (!input[0] || input[0].name != 'BsnsName') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'BsnsName') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Alias: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Alias') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Adrs1: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "Address is required"
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Adrs1') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Adrs2: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Adrs2') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                City: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "City is required"
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'City') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                Stat: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "State is required"
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Stat') return true; if (input.val().length > 3) { input.attr('data-maxLength-msg', 'Max length is 3'); return false; } return true; }
                    }
                },
                Ctry: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "Country is required"
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Ctry') return true; if (input.val().length > 30) { input.attr('data-maxLength-msg', 'Max length is 30'); return false; } return true; }
                    }
                },
                Zip: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: {
                            message: "Zip is required"
                        },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Zip') return true; if (input.val().length > 10) { input.attr('data-maxLength-msg', 'Max length is 10'); return false; } return true; }
                    }
                },
                Phone: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: false
                    }
                },
                Fax: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Fax') return true; if (input.val().length > 10) { input.attr('data-maxLength-msg', 'Max length is 10'); return false; } return true; }
                    }
                },
                Web: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        maxLength: function (input) { if (!input[0] || input[0].name != 'Web') return true; if (input.val().length > 100) { input.attr('data-maxLength-msg', 'Max length is 100'); return false; } return true; }
                    }
                },
                TimeZone: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'TimeZone') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'TimeZone') return true; if (input.val().length > 5) { input.attr('data-maxLength-msg', 'Max length is 5'); return false; } return true; }
                    }
                },
                TripDataFTPRoot: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'TripDataFTPRoot') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'TripDataFTPRoot') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                KMLDataWebRoot: {
                    type: "string",
                    editable: true,
                    nullable: true,
                    validation: {
                        required: false,
                        minLength: function (input) { if (!input[0] || input[0].name != 'KMLDataWebRoot') return true; if (input.val().length < 1) { input.attr('data-minLength-msg', 'Min length is 1'); return false; } return true; },
                        maxLength: function (input) { if (!input[0] || input[0].name != 'KMLDataWebRoot') return true; if (input.val().length > 50) { input.attr('data-maxLength-msg', 'Max length is 50'); return false; } return true; }
                    }
                },
                StartDate: {
                    type: "date",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Start Date is required"
                        }
                    }
                },
                EndDate: {
                    type: "date",
                    editable: true,
                    nullable: true,
                },
                BusinessAccountTypeId: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Business Account Type is required"
                        }
                    }
                },
                BusinessAccountType: {
                    defaultValue: {
                        Id: "",
                        Name: "",
                        DemoLengthDays: 0
                    }
                }
            }
        },
        data: function (data) {
            return data.value; // <-- The result is just the data, it doesn't need to be unpacked.
        },
        total: function (data) {
            return data["odata.count"]; // <-- The total items count is the data length, there is no .Count to unpack.
        }
    },
    serverFiltering: true,
    serverPaging: true,
    serverSorting: true,
    pageSize: 10
});

module.exports = clients;
