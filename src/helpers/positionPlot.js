import { scaleLinear, interpolateReds, interpolateMagma } from "d3";
import { geneHeight, baseline, componentWidth } from "../constants";
import { getStartCoord, getWidth } from "./calculatePosition";
import { setCladeColouring } from "./setCladeColouring";
import { setHeight } from "./setHeight";

export const drawPositionPlot = (buffer, data, width, genomeData, maxPosition, mode, clade=null) => {

  var geneColorScale = scaleLinear()
    .domain([genomeData.geneDensityMin, genomeData.geneDensityMax])
    .range([0, 1]);

  var methylationColorScale = scaleLinear()
    .domain([genomeData.methylationDensityMin, genomeData.methylationDensityMax])
    .range([0, 1]);

  var h, cw, top;
  for (let i = 0; i < data.length; i++) {
    let color;
    if (mode === "repeat") {
      setCladeColouring(data[i]["clade"], clade, buffer);
      h = setHeight(data[i]["clade"], clade);
      cw = componentWidth;
      top = baseline;
    } 
    else if (mode === "gdm") color = interpolateReds(geneColorScale(data[i]["density"]));
    else if (mode === "methylation") color = interpolateReds(methylationColorScale(data[i]["density"]));
    buffer.fill(color);
    buffer.stroke(color);
    h = 50;
    top = 0;
    cw = width;

    buffer.strokeWeight(0.05);

    var startPos = getStartCoord(data[i], cw, maxPosition);
    var geneWidth = getWidth(data[i], cw, maxPosition);

    //console.log(startPos)
    console.log(data[i], cw, maxPosition)
    //console.log("max ", maxPosition)

    buffer.rect(startPos, 0, geneWidth, h);
  }
};
