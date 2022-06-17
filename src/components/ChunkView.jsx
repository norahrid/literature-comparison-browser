import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { changeChunkSelection } from "../reducers/globalSlice";
import { componentHeight, componentWidth, margin } from "../constants";
import { 
  calculateGroupBoundaries, 
  findBoundariesOfCharacteristic, 
  computeProportions,
  identifySelectedChunk } from "../helpers/boundaries";
import bookData from "../assets/Pride_and_Prejudice_data.json";

const ChunkView = (props) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const chunkSelection = useSelector(state => state["global"]["chunkSelection"]["PRIDE_AND_PREJUDICE"]);
  const { low, high } = findBoundariesOfCharacteristic(bookData, "length");
  const data = bookData[chunkSelection];

  

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);


    const unit = componentWidth / data.length;

    for (let i=0; i<data.length; i++) {
        const colour = interpolateRdBu(colourScale(data[i]["length"]));
        ctx.fillStyle = colour;
        ctx.fillRect(i*unit, 0, unit, componentHeight);
    }
  }

  const selectChunk = (event) => {
    let rect = canvasRef.current.getBoundingClientRect();
    const actualX = event.pageX - rect.x;
  }




  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, data)
  }, [draw]);
  
  return (
    <canvas 
      className="global-view" 
      width={componentWidth} 
      height={componentHeight}
      onClick={selectChunk} 
      ref={canvasRef} 
      {...props} 
    />
  )
};
export default ChunkView;