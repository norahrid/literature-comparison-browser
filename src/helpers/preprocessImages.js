import { clades, componentWidth, geneHeight, backgroundColour, backgroundTextColour, completeOptions } from "../constants";
import { getStartCoord, getWidth } from "./calculatePosition";
import { drawPositionPlot } from "./positionPlot";

const GENE_HEIGHT = 75;

export const processAllImages = (p, chromosomes, genomeData) => {

  let completeFilters = ["complete", "fragment"]

  for (let i=0; i<genomeData.length; i++) {
    for (let j=0; j<completeFilters.length; j++) {
      generateCladeImages(p, chromosomes[genomeData[i].genome], completeFilters[j], genomeData[i]);
      generateDefaultImages(p, chromosomes[genomeData[i].genome], completeFilters[j], genomeData[i]);
  }
  generateGDMImages(p, chromosomes[genomeData[i].genome], genomeData[i]);
  }
}

export const generateCladeImages = (p, chromosomes, completeFilter, genomeData) => {
    for (var c in clades) {
      
        var clade = clades[c];
        for (let i = 0; i < chromosomes.length; i++) {
          let max = genomeData.chromosomeBoundaries[chromosomes[i]]["max"];
          let repeatData = genomeData.repeatData[chromosomes[i]];

          var rg = p.createGraphics(componentWidth, GENE_HEIGHT);
          rg.background(backgroundColour);
  
          for (let j = 0; j < repeatData.length; j++) {
            if (repeatData[j]["complete"] === "yes" && completeFilter === "complete") {
              drawRepeats(rg, repeatData[j], clade, max)
            }
            else if (repeatData[j]["complete"] === "no" && completeFilter === "fragment"){
              drawRepeats(rg, repeatData[j], clade, max)
            }
            else if (completeFilter === "all") {
              drawRepeats(rg, repeatData[j], clade, max)
            }
          }
          p.save(rg, `${genomeData.genome}_${clade["value"]}_${completeFilter}_${i+1}.jpg`);
        }
    }
}

const drawRepeats = (buffer, repeat, currentClade, max) => {
  if (repeat["clade"].toUpperCase() === currentClade["value"]) {
    var startPos = getStartCoord(repeat, componentWidth, max);
    var geneWidth = getWidth(repeat, componentWidth, max);

    buffer.strokeWeight(0.05);
    buffer.fill(currentClade["color"]);
    buffer.stroke(currentClade["color"]);
    buffer.rect(startPos, 0, geneWidth, GENE_HEIGHT);
  }
}

export const generateDefaultImages = (p, chromosomes, completeFilter, genomeData) => {
    for (let i = 0; i < chromosomes.length; i++) {
        let max = genomeData.chromosomeBoundaries[chromosomes[i]]["max"];
        let repeatData = genomeData.repeatData[chromosomes[i]];

        var rg = p.createGraphics(componentWidth, GENE_HEIGHT);
        rg.background(backgroundColour);

        for (let j = 0; j < repeatData.length; j++) {
          var startPos = getStartCoord(repeatData[j], componentWidth, max);
          var geneWidth = getWidth(repeatData[j], componentWidth, max);
          if (repeatData[j]["complete"] === "yes" && completeFilter === "complete") {
            rg.strokeWeight(0.05);
            rg.fill(backgroundTextColour);
            rg.stroke(backgroundTextColour);
            rg.rect(startPos, 0, geneWidth, GENE_HEIGHT);
          }
          else if (repeatData[j]["complete"] === "no" && completeFilter === "fragment"){
            rg.strokeWeight(0.05);
            rg.fill(backgroundTextColour);
            rg.stroke(backgroundTextColour);
            rg.rect(startPos, 0, geneWidth, GENE_HEIGHT);
          }
          else if (completeFilter === "all") {
            rg.strokeWeight(0.05);
            rg.fill(backgroundTextColour);
            rg.stroke(backgroundTextColour);
            rg.rect(startPos, 0, geneWidth, GENE_HEIGHT);
          }
        }
        p.save(rg, `${genomeData.genome}_DEFAULT_${completeFilter}_${i+1}.jpg`);
      }
}

export const generateGDMImages = (p, chromosomes, genomeData, trackType) => {
    for (let i = 0; i < chromosomes.length; i++) {
        let max = genomeData.chromosomeBoundaries[chromosomes[i]]["max"];
        let geneData = genomeData.geneData[chromosomes[i]];
        let methylationData = genomeData.methylationData[chromosomes[i]];

        for (let j=0; j<trackType.length; j++) {
          var gg = p.createGraphics(componentWidth, 50);
          gg.background(backgroundColour);
          drawPositionPlot(gg, methylationData, componentWidth, genomeData, max, trackType[j].toLowerCase());
          p.save(gg, `${genomeData.genome}_${trackType[j]}_${i+1}.jpg`);
        }
        
      }
}