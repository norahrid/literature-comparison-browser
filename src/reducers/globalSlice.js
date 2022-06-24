import { existingOptions, DEFAULT_DATA_TYPE } from "../constants";
import { initializeRecord } from "../helpers/record";

const initialOptions = Object.values(existingOptions).reduce((data, k) => {
    data.push(Object.keys(k["dashboard"][1]["options"])[0]);
    return data;
}, []);


const initialState = {
    // chunkSelection: initializeRecord(Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][1]["options"]), 1),
    chunkSelection: initializeRecord(initialOptions, 1),
}

export const changeChunkSelection = (newChunkSelection) => {
    return {
        type: "global/chunkSelectionChanged",
        payload: newChunkSelection
    };
}

export const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case "global/chunkSelectionChanged":
            const { id, chunk } = action.payload;
            return {
                ...state,
                chunkSelection: {
                    ...state["chunkSelection"],
                    [id]: chunk
                }
            };
        default:
            return state;
    };
}
