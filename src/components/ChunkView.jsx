import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import interact from "interactjs";
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

  const attachDraggableSlider = () => {

    interact('#chunk-slider')
      .draggable({
        inertia: true,
        listeners: {
          move(event) {
            var target = event.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0);
            x += event.dx;
            if (x >= 0 && x <= componentWidth) {
                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + '0px)'
                target.setAttribute('data-x', x);
            }
          },
          end(event) {console.log(event)}
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
            end(event) { console.log(event) }
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

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);


    const unit = componentWidth / data.length;

    for (let i=0; i<data.length; i++) {
        const colour = interpolateRdBu(colourScale(data[i]["length"]));
        ctx.fillStyle = colour;
        ctx.fillRect(i*unit, 0, unit, componentHeight);
    }

    attachDraggableSlider();
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
    <div className="chunk-outer-wrapper">
      <div className="chunk-inner-wrapper" style={{'width': componentWidth}}>
        <div className="chunk-window-wrapper" style={{'width': componentWidth}}>
          <div id="chunk-slider"
            style={{ height: componentHeight + 'px' }}>
          </div>
        </div>
      </div>
      <canvas 
        className="chunk-view" 
        width={componentWidth} 
        height={componentHeight}
        onClick={selectChunk} 
        ref={canvasRef} 
        {...props} 
      />
    </div>


  )
};
export default ChunkView;