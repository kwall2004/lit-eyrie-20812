export function getVehicles() {
    return function (dispatch, getState) {
        dispatch(loadingVehiclesChanged(true));
        fetch(
            "http://localhost:65027/api/Dashboard/GetVehicles",
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 5Ihfn-oXzYd65EGucjMAYchHmyEnAyrcavQtS_udSnDc6SE1urHC15BEgRujaeLykjeSFbdhvVg2r8XmCP1iC9A8jp-oml0TjaHF7m2obcr5fsliIgGuIdhgaB6b1vgAAhpgoUZ29vQWzkq_D1fJcA0q3bHhAkElRVQ7alJK_UEgi5hTpqvXISeR_kK_VqBCXBwx0RgX53P2ec5FONEaKFiChObmWb9z6a357XE-jK5lULMuj-Ye_ySIFZy6qCwjNOXYZ0l9x-seql1HLkuFSC4_Yv9aKTQnPR4L1Z0HTtli_Vnm3UEGwbVA7WXV8q9UEiR9WEQM-TqQTC6wQwIy2ONebAZKDaCVl-f0VGNlCKPKDwiJr_mBbUjQFLM-wYSO5NTX_CoMLD9vlxGM357OgbHOoCnoMbRsNsNzna4mwQ4GOriZu-lxeSfyi5FxjPKBqH1OvNV9xPIYZG7KSH-dWunCce1z4yVlWdXUVoKGtEzdNaN1q557GNvq6-ZoR-_us2jc3EuhrmoJ6-6gl1S8p5DfEqTvrP1cKhRWgKplq36sKwX2e7hyuPFm8SE9ULvKmBhinnrFL4Zhtq8Qi6tz_IWXz9jPzzSxKAzDHQYB5TCQP8PCMmcH15sZM8_UYNLIjb6Kdvx0Yz7IlIJrMR64XyUbdUN5hTUJJ6NDci0o8PRFkXF4ANaARI4fkSYQ8gdpkQw6JuoeEX8eeIYOl1yo2i7zmWtkww-VBPfYBaiuaAyx8BVIhGw8fI2LZ9AQsy4nYz6M1Rbk92-GbTU5hBgynlPG7mSUGMhVe_xpb4CblXLEvqhZwUzr_QCzajUOCJBdnzKWpwfezq7aYUjyZHX3KBMRsZGRAzvMMkJJL0usukW-iDtkklgZjDQWQkZTx1S7EkjiiTuobsa2xBJ3CdKo3hlzbB2YUEIzxWZxAFLJaTzedb3LGoLv983js1c3fVvUAodrjUgPU5-dVdgbi_74CZVxc3fjVQQzdcysjMgbD8RyNn2YMYq6o6hQada0iINHKai59jHi_rKvrS4H17kOadtgCGUr0KRm_cNrBlmDzI_Da-ZBwBhwcIvmy2jEgK-dVet_SOP0UEJ8zURAaHCFJ-4Nz8KYzVEWd5C_V5ouUs-Xgo74UH2_4ZQpww_F1VTf08ZJ_AjqSI-aVBvkIwKgOYMlaEgCbBxlczkn0THMyMFExl545Of4QhvTERgahCdhScu7zqa_v842ART-jD-WhB71TVfhM63I5VWUeG6bqkbD7mS6UXR0Z12ayDPyDH_Fm6A0n6w7YZciu7SnNGj63ZoJAzE0VM2negfgHm7zeRNJrDXyOULPeF7aFNgjvrWjYhxpLGl1uj9T14QWXMI2ROplGuiYMwpJwahFKe6Gnlye5Md5ybZC5WUd9SzStL4IdUXkPdVxc5OKG6ohQe6AtC02rTU2zwZU_8wEWZHXTCYao9SeKv8XojYEXIEmMxVrW7gdIsYHYAsIURcHGH5kyBcdFveQsdi2ZAmHiRpedqihYcbiINlLsdhJ9eZNL0m2qNb7Pmu2XONpcqqW2G8koN-m6xxlufTCpbxZDhbmU3kzQ22FLNljv3LAmWOMLDLy'
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

export function setSelectedVehicle(vehicleId) {
    return {
        type: 'SET_SELECTED_VEHICLE',
        vehicleId
    }
}
