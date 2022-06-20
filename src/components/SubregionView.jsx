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
import bookData from "../assets/Pride_and_Prejudice_data.json";

const SubregionView = (props) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const chunkSelection = state["global"]["chunkSelection"]["PRIDE_AND_PREJUDICE"];
  const { start, end, width } = state["chunk"]["PRIDE_AND_PREJUDICE"]
  //const [mouse, setMouse] = useState({x: null, y: null});
  const { low, high } = findBoundariesOfCharacteristic(bookData, "length");
  const data = bookData[chunkSelection];
  const headers = existingOptions["LITERATURE"]["headers"];

  console.log(data)

  const getSliderSelection = () => {
    let selection = [];
    for (let i=0; i<data.length; i++) {
        if (data[i].start >= start && data[i].end <= end) {
            selection.push(data[i]);
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

    draw(context, bookData)
  }, [draw]);
  
  return (
    <div>
        <h2>{headers[2]}</h2>
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