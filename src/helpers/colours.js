import { interpolateRdBu, interpolateReds, interpolateOrRd } from "d3";

export const setColourScheme = (colourscale, value) => {
    return interpolateOrRd(colourscale(value));
}