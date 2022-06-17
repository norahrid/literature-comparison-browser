import { existingOptions, DEFAULT_DATA_TYPE } from "../constants";
import { initializeRecord } from "../helpers/record";


const initialState = {
    chunkSelection: initializeRecord(Object.keys(existingOptions[DEFAULT_DATA_TYPE]["dashboard"][1]["options"]), 1),
}

export const changeChunkSelection = (newChunkSelection) => {
    return {
        type: "dashboard/chunkSelectionChanged",
        payload: newChunkSelection
    };
}

export const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case "dashboard/chunkSelectionChanged":
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
