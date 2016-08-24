import kendo from 'kendo-ui-web/scripts/kendo.data.min';

const businessAccountTypes = new kendo.data.DataSource({
    type: "odata",
    transport: {
        read: {
            url: "http://localhost:65027/odata/BusinessAccountTypes",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(
                'Authorization',
                'Bearer KiLT2XxE8zE8K3z61oXAkYoJh5Wa7_2ILqz3wuI51WhSwn82QmLaZ0JxkF_CQnFy8qbZW1hYjdWmT1g5B_k-ZeR5CeRqTQ8mLTDWu7gGi4Nq_O5COzXD2ZQYAehAOMN3RKokZITtfyT5D33NUjblI9dhmTz2gzLWlUFAWGNw1A1clV9kW7MK_UbyLOOG5NwlEdB7wnHO-yeYAhoPWdNPRDboy-amHRnfK-vcIbENSpT2CBE9sklIzRWhIYFRBw7_gOBAI-wYjN2LWeUhW5COJXk0ldQ0s8N800_BeRgLmK1xrChhoqLAdp3WU9Tl5pZGgAHL-Z0dIKu7204OXPkJZ0VcgU6gBl-yMH8bH9svVOGd4O1eWqIgqkOwOyGY2jbyCeGKNHbs7kDP5MDOZJVFXx5BobkcfgqEKGN2r4QdJxOQv_l71K61QENqGB0vl_tMncZrJO9emN5oaWwVyH9IFCPhREP4KwuiNpCDw0qKFa66_iFaBH8x_zNiQCtLve2WBl7xgL-QFJXCbLs7k4xsLWqCMaTYET8EoCSvIvWMs_XlRWqsLcN2g_g7v4wRH4LlHydB5RSpOAQMFtIppVdmSWx-xMfo94rDJjPHYmFVOXJhiZj8DIqdI8lhi4lx0mcR05fbUFZ3PA6J_0GzVM2RzMpiWFRwciDepLdEhCQx9qUcl5J-DZZC-p4-S1TAtqtP1qGeN3ww6RDYTvj0VAsoYGeB8LR6mtkBv7vlfzhMV4uykwUeVep9-JuQi9DEvW9Ag0QPjaQqHBdOWUVUpQfNEB4YB-RE__-2xmEZz6B1GeWtCGrwMl82SNkeiWCPihxNBuJ1xnz3BV8vIVvPZIAgaT6SWgvkEtw-82Ky2dxqW45AyuPh-ZqQNmiZh72NJzeKvWmd4FEoUKg5elgswWc8ss6X_NTyQk7mlqDPmJEYgzP6J0G6Fi17t5VeChBtaFv3qr7Dpsg_w03JF6-fRCLyPoeBrfBDDbm7py_4cgCw-1QkiHJixZmUcmVyb6R0EZHMmsVJnLHvIzgRQ-FicscowgW4eltXvypKwLEZjtgj1EOz6cye9bGDyF7CPKrHl5CAEtL_oor4HnIrhWV0iuq3sQm9q6LaRTDpb-nEx2lPheHD9SqcR12WyLG1bnTrj-NHf5eWYbmCe3BAmLAqKTyqKyJdGGilm6DxpBe27_HIM-jYZJ860d3iATTFjvkva4ff4ct1qAhA0fdH3uJmJQR708JoFWZ8lEK1o4MQHCEjHfxL0fCxHCFJkeSTqDxr9qp0myjz_e3aSgmkC0n3tLoNhFqa94PR_BRrXk_RAwdXJOUDcNKFWotfJ8NQNGmfjWC6E6-7TcDH0aTCngouwnIrdIyeiCQ6aim4Uyv68lhv-RAQQbEamvCsg2YtoJGSzGnTAxONNw-73rf7RhVZYsVELL8IiLKryx8afnVvUURkz_u1l0ba6ZZi1HzrVmUlQoQo5TzIT_YqQ4YMAiO0Ohm34c-krWmVDgIjBYJ3WG_II_j5eac3gei-87v8nSwsZvZUGbXoV2XIcmjs1yCIWdleGbx_j_pXdWEaHeB9bxWP-04rGo0WWKcmOo34sro-GP-h'
                )
            }
        },
        update: {
            url: function (data) {
                return "/odata/BusinessAccountTypes('" + data.Id + "')";
            },
            type: "PATCH"
        },
        destroy: {
            url: function (data) {
                return "/odata/BusinessAccountTypes('" + data.Id + "')";
            },
            dataType: "json",
            type: "DELETE"
        },
        create: {
            url: "/odata/BusinessAccountTypes",
            dataType: "json",
            type: "POST"
        },
        parameterMap: function (options, type) {
            if (type == "read") {
                var paramMap = kendo.data.transports.odata.parameterMap(options, type);
                //delete paramMap.$inlinecount; // <-- remove inlinecount parameter
                delete paramMap.$format; // <-- remove format parameter
                return paramMap;
            }
            else if (type == "create") {
                options.Id = "";
                return kendo.data.transports.odata.parameterMap(options, type);
            }
            else {
                return kendo.data.transports.odata.parameterMap(options, type);
            }
        }
    },
    schema: {
        model: {
            id: "Id",
            fields: {
                Id: {
                    type: "string",
                    editable: false,
                    nullable: false,
                    defaultValue: ""
                },
                Name: {
                    type: "string",
                    editable: true,
                    nullable: false,
                    validation: {
                        required: {
                            message: "Name is required."
                        }
                    }
                },
                DemoLengthDays: {
                    type: "number",
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
            return data["odata.count"]; // <-- The total items count is the data length, there is no .Count to unpack.
        }
    },
    serverFiltering: false,
    serverPaging: false,
    serverSorting: false
});

module.exports = businessAccountTypes;
