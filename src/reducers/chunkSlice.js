import { existingOptions, DEFAULT_DATA_TYPE } from "../constants";
import { initializeRecord } from "../helpers/record";


const initialState = initializeRecord(Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][1]["options"]), {"start": 0, "end": 50, "width": 50});

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


export const chunkReducer = (state = initialState, action) => {
    switch(action.type) {
        case "chunk/sliderBoundariesChanged":
            const { id, boundaries } = action.payload;
            return {
                ...state,
                [id]: Object.assign({}, state[id], boundaries)
            };
        default:
            return state;
    };
}
