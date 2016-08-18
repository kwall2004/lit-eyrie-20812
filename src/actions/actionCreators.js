export function getVehicles() {
    return function (dispatch, getState) {
        dispatch(loadingVehiclesChanged(true));
        fetch(
            "http://localhost:65027/api/Dashboard/GetVehicles",
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer _amlXen613fe7FxQfYrpC3ov488rO-eq23xskYRXmjXLw4zhzs_3WZ9cBwW-gwmdTL3bmMAiE28oPs5M5I71m9g1rXYO5mriVZ9S9bj-wUgLIOEzI6meHpM6qwfTRH0T8y9eBHIIpH_PHX5Hr794BKph5q3ZgWnXdTEEeOz917_uSkqprfAiOpZa6Ka-XWJA3b1RY-HQRBrBMtzMKcWM0-j8yPYklsXwf6UufuiaGjaCaRXQnvBDKS1AaonOu2Zy6mry27osdAvg1nj5Drb1bAW2kVriY6qukpygLaKmWjuBfWG_Wslf4FlBQBAJ0UB9JZus-ckxa4SCGptjV0CnSqT98M6o1NiQZxI9jBt-HvBgC3TwGoFkFNVHxKtIQHsZIyHvO1HMiLfAd6pjLh2qIyFg8v3GtONTxGjS9bdTN0sEqo5pbYGzrxfMfYj5UEVZRuMLf_Rq3FcyHseQVscneYLSTZiaa_fWtHzOxKAeb6qr3MposNy_tK9cUpUdxqk67W5pbLLnh_i1LnhmJgDLvZ8A4hAqAKrmg9bFH4iecEPf0VQJm5-ZK6RPPsWgVopQVNpuwVn-VR56s9C0cBl6OQGCHJZODto6U8fTz-KmxVjUyEyDOndnw8ccciRY-kJBva2xEOwT1GcMyBAJKKpS9eJLXiqUPSuPGICzLj0FH8ymkRwJ3VCtPlnqP_bDeFgSFo_0t4YtBaJdKTB516eL1tNgX-5A9SzPTL67-dzY-znHmQPFuMzK77dAlb9uDfTSaZyH6mR4eWGQeo9Wnc_w0wTSEz3bChjmSsd486P8WTu4B9DkTVHVpwh8bZn5TJ5iKknB9dQVjvGdC1VDLZBnX5GzmxClmE5gaIq4fjD0vfbXD2kQfoaZrIfBgngFQSI_fug50YvqoiMHXu9Bm4eLEX5WvPdmeCeocCf0cNV9XfKMcmRBDlo2UjdknrrMq3r-ubT5arxwFcdw7hF1nJijgRzCYtU9eZhghH2xJrPmoCMsDXRGyVWPZqrnEwx2Eq7TUgwJgo2NatnV_3Hf-z79Vus_otMsl00QLwDCiW6bw2lS5HiJRTdM19Fkv9GSau8_3uPJYVw-_FY7AOiSvJ8GBTslDZied78SuvGi_JdTHcGIwZRmmnORJPS-RqyLchcs14pRrQwNhTWcsCNmXXnKqnsnwPc-Rjn5PWWl9qHYKo2wqPjD-0VPTF3JFsUupMhgP_3dA5gyMmOURen8Uhs4iS5om59QT8aB3ZpigqTmhUWEkFbDzXZH-8xvT5vHxb5bNU1WE5kJz4o_CVoZ1hT9x2V4yyd7mJVfR9rwDsOwC6C2biMAoGM63qe3FssnqNHHfcWB2eCLtmFuQH8UQhPxUNrcJdii0IgEwHJeponFMZb3sjrLECBmUYwPvHAfufUIuQSkds7Y1WeTeLm2Ldap4z4eNGfhbPIQMhj3aVJRCmvd7mXdaAUBeTDReHOuzZKT6t1osblIMKVzV5v8nppTJUmEfp0xp6Il3E5tt5lH6k1GYAEvTFd-T07zf-HRiHRi5Wve7U0IxbTTa1lMjLICYKUWw-mwxgcVlLusz0MmSfM3miN8cIhBhAnFVPp4YQNC'
                }
            }
        ).then(response => {
            response.json().then(json => {
                dispatch(loadingVehiclesChanged(false));
                dispatch(storeVehicles(json));
            });
        });
    }
}

function loadingVehiclesChanged(loading) {
    return {
        type: 'VEHICLES_LOADING',
        loading
    }
}

function storeVehicles(json) {
    return {
        type: 'STORE_VEHICLES',
        json
    }
}
