import { existingOptions, DEFAULT_DATA_TYPE } from "../../constants";
import { initializeRecord } from "../../helpers/record";

const initialOptions = Object.values(existingOptions).reduce((data, k) => {
    data.push(Object.keys(k["dashboard"][1]["options"])[0]);
    return data;
}, []);


const initialState = initializeRecord(initialOptions, {"tooltipVisibility": false});
// const initialState = initializeRecord(Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][1]["options"]), {"start": 0, "end": 50, "width": 50});


export const changeTooltipVisibility = (vis) => {
    return {
        type: "subregion/tooltipVisibilityChanged",
        payload: vis
    };
}



export const subregionReducer = (state = initialState, action) => {
    switch(action.type) {
        case "subregion/tooltipVisibilityChanged":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        default:
            return state;
    };
}
