import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { componentWidth } from "../constants";
import bookData from "../assets/Pride_and_Prejudice_data.json";


const GlobalView = (props) => {
  const canvasRef = useRef(null);

  const margin = 3;

  const findBoundariesOfCharacteristic = (data, characteristic) => {
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

  const findGroupBoundaries = (data) => {
    for (let key in data) {
      for (let i=0; i < data[key]; i++) {

      }
    }
  }

  const computeProportions = (data) => {
    const totalElements = Object.values(data).reduce((accumulator, elem) => {
      return accumulator + elem.length;
    }, 0);

    let proportions = {};
    for (let key in data) {
      proportions[key] = data[key].length / totalElements;
    }

    return proportions;
  }

  const { low, high } = findBoundariesOfCharacteristic(bookData, "length")

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.fillStyle = '#ff5733';

    const width = componentWidth - (margin * (Object.keys(bookData).length + 1))
    //const rectWidth = width / (Object.keys(bookData).length + 1);
    const proportions = computeProportions(bookData);

    const magnifier = 1;

    var colourScale = scaleLinear()
    .domain([low*magnifier, high*magnifier])
    .range([0, 1]);

    let newStart = 0;
    for (let key in bookData) {

      const rectWidth = width * proportions[key];
      const unit = rectWidth / bookData[key].length;
      const chunkStart = (key * margin) + newStart;
      
      for (let i=0; i < bookData[key].length; i++) {
        const colour = interpolateRdBu(colourScale(bookData[key][i]["length"] * magnifier));
        ctx.fillStyle = colour;
        ctx.fillRect(chunkStart + (i*unit), 0, unit, 75);
      }

      newStart += rectWidth;
    }



    //ctx.fillRect(0, 0, componentWidth, 75);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context)
  }, [draw]);
  
  return (
    <canvas width={componentWidth} ref={canvasRef} {...props} />
  )
};
export default GlobalView;