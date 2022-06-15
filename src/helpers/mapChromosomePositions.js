export const mapMaxChromosomePosition = (geneData) => {
  var chromoPos = {};
  let chromosomes = Object.keys(geneData);
  for (let i = 0; i < chromosomes.length; i++) {
    chromoPos[chromosomes[i]] = -Infinity;
  }

  for (var key in geneData) {
    for (let j = 0; j < geneData[key].length; j++) {
      if (geneData[key][j]["end"] > chromoPos[key])
        chromoPos[key] = geneData[key][j]["end"];
    }
  }
  return chromoPos;
};

export const mapMinChromosomePosition = (geneData) => {
  var chromoPos = {};
  let chromosomes = Object.keys(geneData);
  for (let i = 0; i < chromosomes.length; i++) {
    chromoPos[chromosomes[i]] = Infinity;
  }

  for (var key in geneData) {
    for (let j = 0; j < geneData[key].length; j++) {
      if (geneData[key][j]["start"] < chromoPos[key])
        chromoPos[key] = geneData[key][j]["start"];
    }
  }
  return chromoPos;
};
