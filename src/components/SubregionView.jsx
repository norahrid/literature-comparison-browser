import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { changeChunkSelection } from "../reducers/globalSlice";
import { componentHeight, componentWidth, margin, existingOptions } from "../constants";
import { 
  calculateGroupBoundaries, 
  findBoundariesOfCharacteristic, 
  computeProportions,
  identifySelectedChunk } from "../helpers/boundaries";

const SubregionView = (props) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const dataType = state["dashboard"]["dataType"];
  const chunkSelection = state["global"]["chunkSelection"][props.id];
  const { start, end, width } = state["chunk"][props.id]
  const { low, high } = findBoundariesOfCharacteristic(props.data, "length");
  const data = props.data[chunkSelection];
  const headers = existingOptions[dataType]["headers"];

  const getSliderSelection = () => {
    let selection = [];
    const unit = componentWidth / data.length;
    for (let i=0; i<data.length; i++) {

        if (dataType === "GENE_DENSITY") {
          const elemStart = unit * i;
          const elemEnd = unit + (unit * i);
          console.log(elemStart, elemEnd)
          if (elemStart >= start && elemEnd <= end) {
              selection.push(data[i]);
          }
        }
        else {
          if (data[i].start >= start && data[i].end <= end) {
            selection.push(data[i]);
        }
        }       
    }
    return selection;
  }

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const selection = getSliderSelection();

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, componentWidth, componentHeight);


    const unit = componentWidth / selection.length;

    for (let i=0; i<selection.length; i++) {
        const colour = interpolateRdBu(colourScale(selection[i]["length"]));
        ctx.fillStyle = colour;

        //const elemStart = ((selection[i] - start) / width) * componentWidth;
        ctx.fillRect(i * unit, 0, unit, componentHeight);

    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, props.data)
  }, [draw]);
  
  return (
    <div>
        <canvas 
        className="subregion-view" 
        width={componentWidth} 
        height={componentHeight}
        ref={canvasRef} 
        {...props} 
        />
    </div>

  )
};
export default SubregionView;