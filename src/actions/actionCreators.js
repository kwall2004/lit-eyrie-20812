export function getVehicles() {
    return function (dispatch, getState) {
        dispatch(loadingVehiclesChanged(true));
        fetch(
            "http://localhost:65027/api/Dashboard/GetVehicles",
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer HM3xkr9CtFNjk4RYLZ_iqu8KaFjsL_cPSncnsq2HqZvVvr-OBjw60V8V6q7Xt23aizWFz8hBXQue3M3XcZZC0zJ8Js8Q3uqP3iujZoWZkwbZjHg5rpOG7dzCHeIAeg475_CeI87furahv9goiQlSlQK9L25VsvCeo_ayXj5HQFEVG9FrK1DRnYhEd67EevhtIVHne6sMcQE5JDbDh-0lSSdfDjgoFQauPRXnezt7aD2fFh0s2KdXV3eb96CjenkKzNNZL9LIXfPUw96l7yS2CumXbPQpHMddQK6KijqV-uyv19OdL5Bldem7mpAEKWBVYJp5vruPTu2bkbA_v7P8XdNoo6M0pqgoDyEdWeKr3XLbtNA21BQ_LbeQH0_Kf2ACM6dk4qeBMMpOJKYF2xSnB7NdlJlP3MqpQBqwk7VcnltdL8vTjIJAr3OyEymdhIUxn0XgKEs8zwF7ccO8Jyd_AmAIWgL42ohBMfg6FoP_iIa7hbqWbyN5YXVgvWE1RlEKFF2VJK5D0FzcmQpbcTMLtUecRyfLlWfIO0c5BBiNEQYsupnzNMlR6qED7obML9LvSsmMw_28q6pqPK8a77ZJM0VmovEzBvNDIVoHRoXTSgNRkxLvuc-fD4Q6Nytv1JSpethIziC7NRn9RXn1MRwRtNsGvij9hy3brh_qkVu7QfzZzkPd1tVZfF1_T6ujllDWSd8Wb1TF7fClaAHWq_NKoVTaf2v9vVJJmMlT_EdKucRcdCoI9zLdQ4HFVb3wzteGBnmtpVa1-PYdY-_X9GNyxasd19E4hV2ErYVLWWKlXB7H2Ts9BxrNeXByUo2vbtc3bqE6SJEMluXpfFgYyDPP9_tBk74Mc4n_k3yMTpXd0cMom_O8ehproGApb8RKjo2pWuf1-FFjfBXKcaa2qH6pkbD8oDgwKJFGAaxfyNwtPzQYNoaYprqmbTXLTutvo0EN6lFAUZYnv9KksCeUQcHo2hgnsB3nGXL199ExjID-CMFVkVWXSwAR1SQj-WhN0iOp1FOvceNkGjxAZIIXa7QrIwA2DnX1OiiWFW1FOMKEJJzjhonueh6LtO0ulkVo9hbFgChuFn-bzXOZIaX5DJIOud_es0M7FK0f5nGwkQJaG_FOxAMTSaI1MvXImNLh2PkhSNNMOROqwE6co2PdGgoHz1t3W4gyLxmRvsxm0HPXTlh1YUCDBArJx8uC9mU0Om1WmlsL1Cd0YYUi_sz28kf1LSBG1GWqeTalHj7yWAA4tTI9ltCcOF9CjeuPmqMKt7XMJr5ZpYe0PrQa6jzsuybFl-W0MgfSyryptaEFBtYdhFoURpVr_EHkgtSS-CyHt-T5VphG7AALKzynmZOIEqpyikKdHOI_i5GUEFSSqChfdRqf6Kz8omcTFFjOwD5lyIdN-jifVU3wNlioF8oEq21ygS2_SiSCVQH7Ppt1U_n4QSQ86His0cokFjL9f_F54aOCH0DIpJU8QUF-DRk18F25fhfuFOe4--gpnawlOtzKmQSNHG4yy8p8LCWeKC9E3QvqqQyxvkX5IsxIFapU3mxubVEYAbZ4HGUFdoZm8sSPGb_hpcNLE-OSpYDDr_C-IdNw'
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
