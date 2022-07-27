import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { changeChunkSelection } from "../redux/reducers/globalSlice";
import { componentHeight, componentWidth, margin, existingOptions } from "../constants";
import { findBoundariesOfCharacteristic, getSliderSelection } from "../helpers/boundaries";
import formatActionPayload from "../redux/formatActionPayload";
import { changeTooltipVisibility } from "../redux/reducers/subregionSlice";

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
  const selection = getSliderSelection(data, dataType, start, end);

  // const calculateXCoordinates = (selection) => {
  //   let calculatedSelection = {};
  //   const unit = componentWidth / selection.length;
  //   for (let i=0; i<selection.length; i++) {
  //     const boundaries = [i * unit, (i * unit) + unit];
  //     calculatedSelection[boundaries.join("-")] = selection[i];
  //   }
  //   return calculatedSelection;
  // }

  // const getSliderSelection = () => {
  //   let sel = [];
  //   const unit = componentWidth / data.length;
  //   const lowest = data[0].start;
  //   for (let i=0; i<data.length; i++) {
  //       if (dataType === "GENE_DENSITY") {
  //         const elemStart = unit * i;
  //         const elemEnd = unit + (unit * i);
  //         if (elemStart >= start && elemEnd <= end) {
  //             sel.push(data[i]);
  //         }
  //       }
  //       else {
  //         if (data[i].start - lowest >= start && data[i].end - lowest <= end) {
  //           sel.push(data[i]);
  //         }
  //       }       
  //   }
  //   return sel;
  // }

  const mouseMove = (event) => {
    const x = event.pageX;
    const unit = componentWidth / selection.length;
    for (let i=0; i<selection.length; i++) {
      const start = i * unit;
      const end = start + unit;
      if (x >= start && x < end) {
        dispatch(changeTooltipVisibility(formatActionPayload(props.id, true)));
      }
    }

  }

  const mouseLeave = () => {
    dispatch(changeTooltipVisibility(formatActionPayload(props.id, false)));
  }

  const draw = (ctx, selection) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, componentWidth, componentHeight);

    const unit = componentWidth / selection.length;

    for (let i=0; i<selection.length; i++) {
        const colour = interpolateReds(colourScale(selection[i]["length"]));
        ctx.fillStyle = colour;

        //const elemStart = ((selection[i] - start) / width) * componentWidth;
        ctx.fillRect(i * unit, 0, unit, componentHeight);

    }
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, selection)
  }, [draw]);
  
  return (
    <div>
        <canvas 
        className="subregion-view" 
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        width={componentWidth} 
        height={componentHeight + 10}
        ref={canvasRef} 
        {...props} 
        />
    </div>

  )
};
export default SubregionView;