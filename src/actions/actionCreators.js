export function getVehicles() {
    return function (dispatch, getState) {
        dispatch(loadingVehiclesChanged(true));
        fetch(
            "http://localhost:65027/api/Dashboard/GetVehicles",
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer QshLaiDQ4qnvXHLpxQE9KzZ0ZhSlBZDWeXIpHG59SXjDHiRGWLp5dXbdpxHXtM4VUG3QnlMkqyIhdyerpKsm-RJqWOsQ-iM1-CLIaLIWnUn5uApYnQ7bvjjalN2xgeIw5qkwQWnDsaIswG4JC-3XNwE_k0sL3AXKWvo1CHqOk9c2B2eI5ea6JpsWuIv5MDzcvp-Rdt7DNz2hBtLoz70A-htrDFxkKVLkPcziiT0tvp2-HPeWP2EoGv5SOuT6zJMYmGSLm3qxJIEpRAXjnVyFnnnsR6GJYubTEfAwZFhEk41tkDjec2R0jzspDTdOte_MLN0xFmEPz6S9uUJn1Z4PApzbSfVpC2CxgydxYvGMbBSPHTvhF00jLef0U63D820crPs746d3FrOAhAUWejvfEp189fvcSPnscqoa2r51RCJTRKPwBX2UiFdhiXE-bTKkstXIg7U8KSO6xO5S4WIeaOh7lu5XfIZZ__CafFF3t_Zo4nSab6Ryctj04atGhFSXhR6FXxTfka44IlhmrMb8tH-cRuibzmNql9DcLJuTpTL02xGeh-lKARpjg3HJIo3J1khz7jb4eevkWmXIsIR6K7rE6fConF3DrwBU2VuO-DpxSrxJ034izBhPnCzh6j58hksScCsRH3Wex6kUpedpbAL35hudXcAwkMmw-Jmhw-NNIQGrslc7Rn4qD7xO7bl92YVD2dCYP3N3j3JoSCsIM6pbHqvZTBBcjCn3-rjq8geM8gMQmn30lIOwhyTSzXxRx5DSRuEIfFFo-40EnRyoWLy4BD02LQmO4PzcARVrE6OO6L4-idP9d7mreEFDd4JUzMa_0SxuwFTIz0yKOh_BIpOEX07PHGOGJIh-0lkuNZpCAEz2IbyhWtC3J-zKNenEFDI7FyepwMQN7HUykkkwmv__8uM01RWwljhFM_cYLWZOfGIcv3tFgmzZWeWYjq496-Qu7MUd9y4sVu6O5ayET37TTRyDG5gdShp67TaGDRhrjNGeSr0rbtM7ILsiBD3vfmO68so49bjwR0mYapJDCkf6yyHlQfougO0V1OD2TXlXc4UnqMetSrN2BvElZQI0gcTFe-u6zwGqYdKqD7U04iG9Yojk511FPMhGZGIY4IobowpcAFPSUvktLoEOrxABY2gpObx55_YUGglvjVhGj_XL0FJ4d6KC9st90Mc20LPzamNRCxwbKJhNYKQtHroDa6LIJMJo-2F_RNoGmqVaWlJy4u37Tb-U2tKWMuZFbr_wRD6t61JNu8waOfiTs0-fbPqX20OLUACNqB4HAXR55b-MqjJlexlc54ovT_OhORuhDC0_38egfqbkDzErJpitB4PaTloQwDTgxVXahPGng0P1ei_gQ7jo9rhaZvqv8Uhe0NShmAiiKsK6tFHLg4pcIodN36iThKhoGQKihK31pzCOt3fBNnpi0rjrL5y3rUf0YDlnPExKlhldGFr1MpC7wfKkfWz5lgNOsIDcUy6sA_hIbU_gavu1IqWFIrT9-9DdtJ6Teznc6OyyRoY6nFzn1s78zCVpzWzGkb2bz8-49c6Zv3GWwARFe6jWy7scmCJeedd6F_phQNhPC0IWSfyD'
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
