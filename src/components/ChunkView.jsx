import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu, filter } from "d3";
import interact from "interactjs";
import { changeSliderBoundaries } from "../redux/reducers/chunkSlice";
import { componentHeight, componentWidth, sliderWidth, existingOptions } from "../constants";
import { findBoundariesOfCharacteristic } from "../helpers/boundaries";
import { setColourScheme } from "../helpers/colours";

const ChunkView = (props) => {
  const canvasRef = useRef(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const chunkSelection = state["global"]["chunkSelection"][props.id];
  const dataType = state["dashboard"]["dataType"];
  const filters = state["dashboard"][2];
  const { low, high } = findBoundariesOfCharacteristic(props.data, "length");
  const data = props.data[chunkSelection];
  //bookData[chunkSelection];
  const headers = existingOptions[dataType]["headers"];
  const trackHeight = componentHeight / filters.length;

  let identifier = props.id;
  if (dataType === "LITERATURE") identifier = data[0]["title"].toUpperCase().replaceAll(" ", "_").replaceAll("\u2019", "");
  
  const getStartAndEnd = (target) => {
    let xPosition = (parseFloat(target.getAttribute('data-x')) || 0),
        width = target.style.width;
    if (width.indexOf('px') > -1) {
        width = +width.slice(0, -2);
    }
    else {
        width = sliderWidth;
    }
    const start = Math.abs(xPosition), end = start + width;
    return {
        'start': start,
        'end': end,
        'width': width
    };
}

  const attachDraggableSlider = () => {
    interact(`#${identifier}`)
      .draggable({
        inertia: true,
        listeners: {
          move(event) {
            var target = event.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0);
            x += event.dx;
            if (x >= 0 && x <= componentWidth - event.rect.width) {
                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + '0px)'
                target.setAttribute('data-x', x);
            }
          },
          end(event) {
            let temp = {"id": identifier, "boundaries": getStartAndEnd(event.target)};
            dispatch(changeSliderBoundaries(temp));
          }
        },
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: false, top: false },
        listeners: {
            move(event) {
              var target = event.target;
              var x = (parseFloat(target.getAttribute('data-x')) || 0);
              // update the element's style
              target.style.width = event.rect.width + 'px';
              // translate when resizing from left edges
              x += event.deltaRect.left;
              target.style.webkitTransform = target.style.transform =
                  'translate(' + x + 'px,' + '0px)'
              target.setAttribute('data-x', x);
            },
            end(event) {
              let temp = {"id": identifier, "boundaries": getStartAndEnd(event.target)};
              dispatch(changeSliderBoundaries(temp));
            }
        },
        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            }),
            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 30 }
            })
        ],
        inertia: true
      })

  }

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // var colourScale = scaleLinear()
    // .domain([low, high])
    // .range([0, 1]);
    let processedData = []


    const unit = componentWidth / data.length;
    let yStart = 0;
    for (let f=0; f<filters.length; f++) {
      for (let i=0; i<data.length; i++) {
        if (filters[f] === "ALL_WORDS" || filters[f].toLowerCase() === data[i]["word"]) {
          const colour = setColourScheme(props.colourScale, data[i]["length"]);
          ctx.fillStyle = colour;
          ctx.fillRect(i*unit, f*trackHeight, unit, trackHeight);
          processedData.push({...data[i], "calculatedStart": i*unit, "unitWidth": unit});

        }

      }
      // yStart += trackHeight;
    }

   
    //dispatch
    attachDraggableSlider();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, data)
  }, [draw]);
  
  return (
    <div className={`chunk-outer-wrapper ${identifier}`}>
      <div className={`chunk-inner-wrapper ${identifier}`} style={{'width': componentWidth}}>
        <div className={`chunk-window-wrapper ${identifier}`} style={{'width': componentWidth}}>
          <div className={`chunk-slider`} id={identifier}
            style={{ 'height': componentHeight + 10, 'width': sliderWidth }}>
          </div>
        </div>
      </div>
      <canvas 
        className={`chunk-view ${identifier}`} 
        width={componentWidth} 
        height={componentHeight}
        ref={canvasRef} 
        {...props} 
      />
    </div>
  )
};
export default ChunkView;