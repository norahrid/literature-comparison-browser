import { interpolateRdBu } from "d3";

export const setColourScheme = (colourscale, value) => {
    return interpolateRdBu(colourscale(value));
}