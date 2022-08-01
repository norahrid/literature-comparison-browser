import { interpolateRdBu, interpolateReds } from "d3";

export const setColourScheme = (colourscale, value) => {
    return interpolateReds(colourscale(value));
}