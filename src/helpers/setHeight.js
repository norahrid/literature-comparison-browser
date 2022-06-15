import { subregionGeneHeight } from "../constants";

export const setHeight = (repeatClade, dropdownClade) => {
  let h;
  if (dropdownClade.length > 0) {
    h = dropdownClade.includes(repeatClade.toUpperCase())
      ? subregionGeneHeight
      : subregionGeneHeight / 2;
  } else h = subregionGeneHeight;
  return h;
};
