import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { changeChunkSelection } from "../redux/reducers/globalSlice";
import { componentHeight, componentWidth, margin, existingOptions } from "../constants";
import { findBoundariesOfCharacteristic, getSliderSelection } from "../helpers/boundaries";
import formatActionPayload from "../redux/formatActionPayload";
import { changeTooltipVisibility, changeTooltipData } from "../redux/reducers/dashboardSlice";
import { setColourScheme } from "../helpers/colours";

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

  console.log(state)

  const mouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;


      var pageWidth = document.body.getBoundingClientRect().width,
          canvasRect = event.currentTarget.getBoundingClientRect();
      const xPosition = event.pageX - canvasRect.left,
          yPosition = event.pageY - window.pageYOffset - canvasRect.top;

        //event.target.className

      const unit = componentWidth / selection.length;
      let selectionIndex = selection[Math.floor(xPosition/unit)];
      
    
      // for (let i=0; i<selection.length; i++) {
      //   const start = i * unit;
      //   const end = start + unit;
      //   if (xPosition >= start && xPosition < end) {
      //     selectionIndex = selection[i];
      //     console.log(Math.floor(xPosition/unit), i)
      //   }

      // }

      //console.log(selectionIndex)

     

      const temp = {
        'x': event.pageX + 100 > pageWidth ? event.pageX - 100 : event.pageX + 25,
        'y': event.pageY + 25,
        "selection": selectionIndex

      }

      //console.log(temp)

      dispatch(changeTooltipData(temp))
        
      //   showTooltip(true, {
      //     'x': event.pageX + 200 > pageWidth ? event.pageX - 200 : event.pageX + 25,
      //     'y': event.pageY - 50,
      //     lineName,
      //     'SNP': dataPoint.locusName,
      //     'allele': dataPoint.allele
      // });

      dispatch(changeTooltipVisibility(true));


  }

  const mouseLeave = () => {
    dispatch(changeTooltipVisibility(false));
  }

  const draw = (ctx, selection) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // var colourScale = scaleLinear()
    // .domain([low, high])
    // .range([0, 1]);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, componentWidth, componentHeight);

    const unit = componentWidth / selection.length;

    for (let i=0; i<selection.length; i++) {
        const colour = setColourScheme(props.colourScale, selection[i]["length"]);
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