const initialState = {
    dataType: "LITERATURE",
    clades: ["DEFAULT", "TEKAY", "OGRE"],
    genomes: ["LENS_CULINARIS"],
    completeFilters: ["all"],
    secondaryTrack: ["GDM"]
}

export const changeCladeSelection = (newClades) => {
    return {
        type: "dashboard/cladesSelectionChanged",
        payload: newClades
    };
}

export const changeGenomeSelection = (newGenomes) => {
    return {
        type: "dashboard/genomesSelectionChanged",
        payload: newGenomes
    };
}

export const changeCompleteFilterSelection = (newFilters) => {
    return {
        type: "dashboard/completeFiltersChanged",
        payload: newFilters
    };
}

export const changeSecondaryTrackSelection = (newFilters) => {
    return {
        type: "dashboard/secondaryTrackSelectionChanged",
        payload: newFilters
    }
}

export const dashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case "dashboard/cladesSelectionChanged":
            return {
                ...state,
                clades: action.payload
            };
        case "dashboard/genomesSelectionChanged":
            return {
                ...state,
                genomes: action.payload
            };
        case "dashboard/completeFiltersChanged":
            return {
                ...state, 
                completeFilters: action.payload
            };
        case "dashboard/secondaryTrackSelectionChanged":
            return {
                ...state,
                secondaryTrack: action.payload
            };
        default:
            return state;
    };
}
