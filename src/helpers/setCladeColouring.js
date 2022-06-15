import { clades, backgroundTextColour } from "../constants";

export const setCladeColouring = (geneClade, selectClade, buffer) => {
  if (selectClade.includes(geneClade.toUpperCase())) {
    buffer.fill(clades[geneClade.toUpperCase()].color);
    buffer.stroke(clades[geneClade.toUpperCase()].color);
  } else {
    buffer.fill(backgroundTextColour);
    buffer.stroke(backgroundTextColour);
  }
};
