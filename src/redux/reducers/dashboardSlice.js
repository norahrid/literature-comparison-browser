import { existingOptions, DEFAULT_DATA_TYPE } from "../../constants";

let initialState = {
    dataType: DEFAULT_DATA_TYPE,
    ...Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"]).reduce((data, k) => {
        data[k] = [Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][k]["options"])[0]];
        return data;
    }, {})
}

initialState = {...initialState, "colourscale": null, "isTooltipVisible": false, "tooltipData": null};

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

export const changeColourScale = (newScale) => {
    return {
        type: "dashboard/colourScaleChanged",
        payload: newScale
    }
}

export const changeTooltipVisibility = (vis) => {
    return {
        type: "dashboard/tooltipVisibilityChanged",
        payload: vis
    }
}

export const changeTooltipData = (data) => {
    return {
        type: "dashboard/tooltipDataChanged",
        payload: data
    }
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
        case "dashboard/colourScaleChanged":
            return {
                ...state,
                "colourscale": action.payload
            };
        case "dashboard/tooltipVisibilityChanged":
            return Object.assign({}, state, { "isTooltipVisible": action.payload })
        case "dashboard/tooltipDataChanged":
            return Object.assign({}, state, { "tooltipData": action.payload})
        default:
            return state;
    };
}
