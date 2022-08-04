import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { cloneDeep } from 'lodash';
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
  const filters = state["dashboard"][2];
  const { low, high } = findBoundariesOfCharacteristic(props.data, "length");
  const data = props.data[chunkSelection];
  const headers = existingOptions[dataType]["headers"];
  const selection = getSliderSelection(data, dataType, start, end);
  const trackHeight = componentHeight / filters.length;
  let calculatedSelection = [];

  // console.log(state)

  const resetCalculatedSelection = (sel) => {
    sel = [];
  }

  const mouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;


      var pageWidth = document.body.getBoundingClientRect().width,
          canvasRect = event.currentTarget.getBoundingClientRect();
      const xPosition = event.clientX - canvasRect.left,
          yPosition = event.pageY - window.pageYOffset - canvasRect.top;

        //event.target.className

      const unit = componentWidth / selection.length;
      let selectionIndex = selection[Math.floor(xPosition/unit)];
     // let selectionIndex;
      
      //console.log(Math.floor(xPosition/unit), xPosition, unit)
      // console.log(selectionIndex)

     

      // for (let i=0; i<calculatedSelection.length; i++) {
      //   //console.log(calculatedSelection[i])
      //   if (xPosition >= calculatedSelection[i].calculatedStart && xPosition <= calculatedSelection[i].calculatedEnd) {
          
      //     selectionIndex = {...calculatedSelection[i]};
      //     //console.log(Math.floor(xPosition/unit), i)
      //   }
      // }

      //console.log(selectionIndex)
     
    
      // for (let i=0; i<selection.length; i++) {
      //   const start = i * unit;
      //   const end = start + unit;
      //   if (xPosition >= start && xPosition < end) {
      //     selectionIndex = selection[i];
      //     //console.log(Math.floor(xPosition/unit), i)
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

    //resetCalculatedSelection(calculatedSelection);

    // var colourScale = scaleLinear()
    // .domain([low, high])
    // .range([0, 1]);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, componentWidth, componentHeight);

    const unit = componentWidth / selection.length;

    // console.log(selection)

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


    // for (let i=0; i<selection.length; i++) {
    //     const colour = setColourScheme(props.colourScale, selection[i]["length"]);
    //     ctx.fillStyle = colour;

    //     //const elemStart = ((selection[i] - start) / width) * componentWidth;
    //     ctx.fillRect(i * unit, 0, unit, componentHeight);

    // }
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
        // {...props} 
        />
    </div>

  )
};
export default SubregionView;