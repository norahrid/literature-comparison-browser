import { existingOptions, DEFAULT_DATA_TYPE } from "../constants";
import { initializeRecord } from "../helpers/record";

const initialState = {
    dataType: DEFAULT_DATA_TYPE,
    ...initializeRecord(Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"]), [])
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
            return {
                ...state,
                dataType: action.payload
            };
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
