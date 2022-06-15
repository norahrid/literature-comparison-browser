const findBoundaries = (data) => {
  let chromosomeBoundaries = {};

  // prep object for nesting
  for (var key in data) {
    chromosomeBoundaries[key] = { min: null, max: null };
  }

  for (var key in data) {
    chromosomeBoundaries[key]["min"] = data[key][0]["start"];
    chromosomeBoundaries[key]["max"] = data[key][data[key].length - 1]["end"];
  }
  return chromosomeBoundaries;
};

export const calculateChromosomeBoundaries = (repeatData, geneData) => {
  let min, max;
  let finalChromosomeBoundaries = {};

  let sortedRepeatData = findBoundaries(repeatData),
    sortedGeneData = findBoundaries(geneData);

  for (var key in sortedRepeatData) {
    if (sortedRepeatData[key]["min"] < sortedGeneData[key]["min"])
      min = sortedRepeatData[key]["min"];
    else min = sortedGeneData[key]["min"];

    if (sortedRepeatData[key]["max"] > sortedGeneData[key]["max"])
      max = sortedRepeatData[key]["max"];
    else max = sortedGeneData[key]["max"];

    finalChromosomeBoundaries[key] = { min: min, max: max };
  }
  return finalChromosomeBoundaries;
};
