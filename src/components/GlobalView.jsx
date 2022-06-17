import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { componentHeight, componentWidth, margin } from "../constants";
import { 
  calculateGroupBoundaries, 
  findBoundariesOfCharacteristic, 
  computeProportions,
  identifySelectedChunk } from "../helpers/boundaries";
import bookData from "../assets/Pride_and_Prejudice_data.json";

const GlobalView = (props) => {
  const canvasRef = useRef(null);
  //const [mouse, setMouse] = useState({x: null, y: null});
  const { low, high } = findBoundariesOfCharacteristic(bookData, "length");
  const width = componentWidth - (margin * (Object.keys(bookData).length + 1))
  const proportions = computeProportions(bookData);
  const boundaries = calculateGroupBoundaries(bookData, proportions, width);

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);

    let newStart = 0;
    for (let key in data) {

      const rectWidth = width * proportions[key];
      const unit = rectWidth / data[key].length;
      // chunk starts at 1 but we need to start at 0
      const chunkStart = ((key - 1) * margin) + newStart;
      
      for (let i=0; i < data[key].length; i++) {
        const colour = interpolateRdBu(colourScale(data[key][i]["length"]));
        ctx.fillStyle = colour;
        ctx.fillRect(chunkStart + (i*unit), 0, unit, 75);
      }
      newStart += rectWidth;
    }
  }

  const selectChunk = (event) => {
    let rect = canvasRef.current.getBoundingClientRect();
    const actualX = event.pageX - rect.x;
    // No need to check for y position since the canvas = track height
    const selectedChunk = identifySelectedChunk(actualX, bookData, boundaries)
    if (selectedChunk !== null) {
      //dispatch
    }
  }




  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, bookData)
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
export default GlobalView;