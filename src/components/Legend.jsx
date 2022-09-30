import React, { useEffect, useRef } from "react";
import { componentWidth } from "../constants";
import { setColourScheme } from "../helpers/colours";

const Legend = (props) => {
  const canvasRef = useRef(null);
  let startX, legendWidth;

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    legendWidth = componentWidth * 0.6;
    startX = 0;
    const startY = 10;

    const unit = legendWidth / (props.high - props.low);

    // using data's colour scheme fill in the legend
    for (let i=props.low; i<=props.high; i++) {
        const colour = setColourScheme(props.colourScale, i);
        ctx.fillStyle = colour;
        ctx.fillRect(startX + unit * i, startY, unit, 25);

        // label start, end and every 5th chunk
        if (i === props.low || i === props.high || i % 5 === 0) {
            ctx.beginPath();
            ctx.font = "10px Arial";
            ctx.fillStyle = 'white';
            ctx.fillText(i, startX + i * unit + unit/2 - 5, startY + 40);
        }
    }
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
            height={75}
            ref={canvasRef} 
            {...props} 
        />
    </div>
  );
};
export default Legend;