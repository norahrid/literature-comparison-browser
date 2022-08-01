import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import interact from "interactjs";
import { changeSliderBoundaries } from "../redux/reducers/chunkSlice";
import { componentHeight, componentWidth, sliderWidth, existingOptions } from "../constants";
import { findBoundariesOfCharacteristic } from "../helpers/boundaries";
// import data from "../assets/Pride_and_Prejudice_data.json";
import data from "../assets/gdm_lcu.json";
import mdata from "../assets/methylDensityLC.json";
import { setColourScheme } from "../helpers/colours";

const Legend = (props) => {
  const canvasRef = useRef(null);

  // const { low, high } = findBoundariesOfCharacteristic(data, "length");
  // const { low1, high1 } = findBoundariesOfCharacteristic(mdata, "length");

  let startX, legendWidth;

  // const low = 1;
  // const high = 100;



  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    legendWidth = componentWidth * 0.6;
    startX = 0;
    const startY = 10;

    // var colourScale = scaleLinear()
    // .domain([low, high])
    // .range([0, 1]);

    const unit = legendWidth / (props.high - props.low);

    for (let i=props.low; i<=props.high; i++) {
        const colour = setColourScheme(props.colourScale, i);
        ctx.fillStyle = colour;
        ctx.fillRect(startX + unit * i, startY, unit, 25);

        if (i === props.low || i === props.high || i % 5 === 0) {
            ctx.beginPath();
            ctx.font = "10px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText(i, startX + i * unit + unit/2 - 5, startY + 40);
        }
    }
    // ctx.beginPath();
    // ctx.font = "bold 10px Arial";
    // ctx.fillStyle = 'white';
    // ctx.fillText("Word length (# of characters)", 0, startY);

  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context)
  }, [draw]);
  
  return (
    <div>
      <p>{props.label}</p>
        <canvas 
            className="legend" 
            width={componentWidth * 0.6} 
            height={55}
            ref={canvasRef} 
            {...props} 
        />
    </div>

  )
};
export default Legend;