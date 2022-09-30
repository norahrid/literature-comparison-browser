import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeChunkSelection } from "../redux/reducers/globalSlice";
import { componentHeight, componentWidth, margin, existingOptions } from "../constants";
import { 
  calculateGroupBoundaries, 
  findBoundariesOfCharacteristic, 
  computeProportions,
  identifySelectedChunk } from "../helpers/boundaries";
import { setColourScheme } from "../helpers/colours";

const GlobalView = (props) => {
  const canvasRef = useRef(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const dataType = state["dashboard"]["dataType"];
  const data = props.data;
  const chunkSelection = state["global"]["chunkSelection"][props.id];
  const { low, high } = findBoundariesOfCharacteristic(data, "length");
  const width = componentWidth - (margin * (Object.keys(data).length + 1))
  const proportions = computeProportions(data);
  const filters = state["dashboard"][2];
  const trackHeight = componentHeight / filters.length;

  const headers = existingOptions[dataType]["headers"];
  
  let identifier = props.id;
  if (dataType === "LITERATURE") identifier = data[1][0]["title"].toUpperCase().replaceAll(" ", "_").replaceAll("\u2019", "");

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let newStart = 0;
    for (let key in data) {

      const rectWidth = width * proportions[key];
      const unit = rectWidth / data[key].length;
      // chunk starts at 1 but we need to start at 0
      const chunkStart = ((key - 1) * margin) + newStart;

      // label chunk with its number
      ctx.beginPath();
      ctx.font = "8px Arial";
      ctx.fillStyle = 'grey';
      ctx.fillText(key, chunkStart + ((data[key].length*unit)/4), componentHeight + 13);

      // indicate selected chunk
      if (chunkSelection == key) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(chunkStart, componentHeight + 3);
        ctx.lineTo(chunkStart + (unit * data[key].length), componentHeight + 3);
        ctx.stroke();
      }

      // if word filter is applied, then only draw specific words
      for (let f=0; f<filters.length; f++) {
        for (let i=0; i < data[key].length; i++) {
          if (filters[f] === "ALL_WORDS" || filters[f].toLowerCase() === data[key][i]["word"]) {
            const colour = setColourScheme(props.colourScale, data[key][i]["length"]);
            ctx.fillStyle = colour;
            ctx.fillRect(chunkStart + (i*unit), trackHeight*f, unit-0.5, trackHeight);
          }
        } 
      }
      newStart += rectWidth;
    }
  }

  // update chunk selection when the user clicks on a chunk
  const selectChunk = (event) => {
    let rect = canvasRef.current.getBoundingClientRect();
    const boundaries = calculateGroupBoundaries(data, proportions, width, rect);

    const canvasRect = event.currentTarget.getBoundingClientRect();
    const xPos = event.pageX - canvasRect.left;
    
    const actualX = event.clientX - rect.x;
    // No need to check for y position since the canvas = track height
    const selectedChunk = identifySelectedChunk(actualX, data, boundaries)
    if (selectedChunk !== null) {
      dispatch(changeChunkSelection({"id": identifier, "chunk": selectedChunk}));
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, data)
  }, [draw]);
  
  return (
    <div>
      <canvas 
        className="global-view" 
        width={componentWidth} 
        height={componentHeight+20}
        onClick={selectChunk} 
        ref={canvasRef} 
        // {...props} 
      />
    </div>

  )
};
export default GlobalView;