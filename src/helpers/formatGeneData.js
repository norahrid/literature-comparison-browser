export const formatGeneData = (data) => {
  const genes = [];

  for (var key in data) {
    // make an array of all of the genes
    var gene = {
      id: key,
      group: data[key]["id"],
      geneStart: data[key]["start"],
      geneEnd: data[key]["end"],
      geneValue: data[key]["geneValue"],
      clade: data[key]["clade"],
      globalStart: data[key]["globalStart"],
      globalEnd: data[key]["globalEnd"],
    };
    genes.push(gene);
  }

  return genes;
};
