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

export const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case "dashboard/dataTypeSelectionChanged":
            return {
                ...state,
                clades: action.payload
            };
        default:
            return state;
    };
}
