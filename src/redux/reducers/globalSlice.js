import { existingOptions } from "../../constants";
import { initializeRecord } from "../../helpers/record";

const initialOptions = Object.values(existingOptions).reduce((data, k) => {
    const newData = data.concat(Object.keys(k["dashboard"][1]["options"]));
    return newData;
}, []);


const initialState = {
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
