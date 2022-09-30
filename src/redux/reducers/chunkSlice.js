import { existingOptions } from "../../constants";
import { initializeRecord } from "../../helpers/record";

const initialOptions = Object.values(existingOptions).reduce((data, k) => {
    const newData = data.concat(Object.keys(k["dashboard"][1]["options"]));
    return newData;
}, []);

const initialState = initializeRecord(initialOptions, {"start": 0, "end": 50, "width": 50, "data":{}});

export const changeSliderBoundaries = (newSliderBoundaries) => {
    return {
        type: "chunk/sliderBoundariesChanged",
        payload: newSliderBoundaries
    };
}

export const changeSliderWidth = (newSliderWidth) => {
    return {
        type: "chunk/sliderWidthChanged",
        payload: newSliderWidth
    };
}

export const changeSliderSelection = (newSliderSelection) => {
    return {
        type: "chunk/sliderSelectionChanged",
        payload: newSliderSelection
    }
}


export const chunkReducer = (state = initialState, action) => {
    switch(action.type) {
        case "chunk/sliderBoundariesChanged":
            const { id, boundaries } = action.payload;
            return {
                ...state,
                [id]: Object.assign({}, state[id], boundaries)
            };
        case "chunk/sliderSelectionChanged":
            return {
                ...state,

            }
        default:
            return state;
    };
}
