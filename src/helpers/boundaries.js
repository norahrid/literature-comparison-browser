import { margin, componentWidth } from "../constants";

export const computeProportions = (data) => {
    const totalElements = Object.values(data).reduce((accumulator, elem) => {
      return accumulator + elem.length;
    }, 0);

    let proportions = {};
    for (let key in data) {
      proportions[key] = data[key].length / totalElements;
    }

    return proportions;
}

export const findBoundariesOfCharacteristic = (data, characteristic) => {
    let low = Infinity;
    let high = -Infinity;
    for (let key in data) {
      for (let i=0; i < data[key].length; i++) {
        const val = data[key][i][characteristic];
        if (val < low) low = val;
        else if (val > high) high = val;
      }
    }
    return {"low": low, "high": high}
}

export const calculateGroupBoundaries = (data, proportions, width) => {
    let boundaries = {};
    let newStart = 0;
    for (let key in data) {
      const rectWidth = width * proportions[key];
      const chunkStart = ((key - 1) * margin) + newStart;
      boundaries[key] = {"start": chunkStart, "end": chunkStart + rectWidth};

      newStart = newStart + rectWidth;
    }
    return boundaries;
}

export const identifySelectedChunk = (mouseX, data, boundaries) => {
    for (let key in data) {
      // Determine if click is on a chunk
      const { start, end } = boundaries[key];
      if (mouseX >= start && mouseX <= end) {
        return key;
      }
    }
    return null;
  }

export const getSliderSelection = (data, dataType, start, end) => {
  let sel = [];
  const unit = componentWidth / data.length;
  const lowest = data[0].start;
  for (let i=0; i<data.length; i++) {
    const elemStart = unit * i;
    const elemEnd = unit + (unit * i);
    if (elemStart >= start && elemEnd <= end) {
      sel.push(data[i]);
      // if (dataType === "GENE_DENSITY") {
      //   const elemStart = unit * i;
      //   const elemEnd = unit + (unit * i);
        
      //   if (elemStart >= start && elemEnd <= end) {
      //       sel.push(data[i]);
      //   }
      // }
      // else {
      //   console.log(lowest, elemStart, elemEnd, componentWidth, start, end)
      //   //console.log(data[i], lowest, start, end)
      //   if (data[i].start - lowest >= start && data[i].end - lowest <= end) {
      //     sel.push(data[i]);
      //   }
      }       
  }
  return sel;
}