import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { componentHeight, componentWidth, margin, existingOptions } from "../constants";
import { findBoundariesOfCharacteristic, getSliderSelection } from "../helpers/boundaries";
import { changeTooltipVisibility, changeTooltipData } from "../redux/reducers/dashboardSlice";
import { setColourScheme } from "../helpers/colours";

const SubregionView = (props) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const dataType = state["dashboard"]["dataType"];
  const chunkSelection = state["global"]["chunkSelection"][props.id];
  const { start, end, width } = state["chunk"][props.id]
  const filters = state["dashboard"][2];
  const { low, high } = findBoundariesOfCharacteristic(props.data, "length");
  const data = props.data[chunkSelection];
  const headers = existingOptions[dataType]["headers"];
  const selection = getSliderSelection(data, dataType, start, end);
  const trackHeight = componentHeight / filters.length;
  let calculatedSelection = [];

  const mouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;

    var pageWidth = document.body.getBoundingClientRect().width,
        canvasRect = event.currentTarget.getBoundingClientRect();
    const xPosition = event.clientX - canvasRect.left,
        yPosition = event.pageY - window.pageYOffset - canvasRect.top;

      const unit = componentWidth / selection.length;
      let selectionIndex = selection[Math.floor(xPosition/unit)];

      const temp = {
        'x': event.pageX + 100 > pageWidth ? event.pageX - 100 : event.pageX + 25,
        'y': event.pageY + 25,
        "selection": selectionIndex
      }

      dispatch(changeTooltipData(temp));
      dispatch(changeTooltipVisibility(true));
  }

  const mouseLeave = () => {
    dispatch(changeTooltipVisibility(false));
  }

  const draw = (ctx, selection) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const unit = componentWidth / selection.length;

    // draws the words selected in the dropdown
    // TODO: generalize
    for (let f=0; f<filters.length; f++) {
      for (let i=0; i<selection.length; i++) {
        const start = i * unit;
        const end = start + unit;
        calculatedSelection.push({...selection[i], "calculatedStart": start, "calculatedEnd": end});
        if (filters[f] === "ALL_WORDS" || filters[f].toLowerCase() === selection[i]["word"]) {
          const colour = setColourScheme(props.colourScale, selection[i]["length"]);
          ctx.fillStyle = colour;
          ctx.fillRect(start, f*trackHeight, unit, trackHeight);
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, selection)
  }, [draw]);
  
  return (
    <div className="subregion-wrapper">
        <canvas 
        className="subregion-view" 
        id="subregion"
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        width={componentWidth} 
        height={componentHeight + 10}
        ref={canvasRef}  
        />
    </div>

  )
};
export default SubregionView;