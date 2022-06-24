import { existingOptions, DEFAULT_DATA_TYPE } from "../constants";

const initialState = {
    dataType: DEFAULT_DATA_TYPE,
    ...Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"]).reduce((data, k) => {
        data[k] = [Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][k]["options"])[0]];
        return data;
    }, {})
}

export const changeDataTypeSelection = (newDataType) => {
    return {
        type: "dashboard/dataTypeSelectionChanged",
        payload: newDataType
    };
}

export const changeMenu1Selection = (newSelection) => {
    return {
        type: "dashboard/menu1SelectionChanged",
        payload: newSelection
    };
}

export const changeMenu2Selection = (newSelection) => {
    return {
        type: "dashboard/menu2SelectionChanged",
        payload: newSelection
    };
}

export const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case "dashboard/dataTypeSelectionChanged":
            return action.payload;
        case "dashboard/menu1SelectionChanged":
            return {
                ...state,
                1: action.payload
            };
        case "dashboard/menu2SelectionChanged":
            return {
                ...state,
                2: action.payload
            };
        default:
            return state;
    };
}
