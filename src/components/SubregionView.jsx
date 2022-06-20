import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scaleLinear, interpolateReds, interpolateMagma, interpolateRdBu } from "d3";
import { changeChunkSelection } from "../reducers/globalSlice";
import { componentHeight, componentWidth, margin } from "../constants";
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
  //const [mouse, setMouse] = useState({x: null, y: null});
  const { low, high } = findBoundariesOfCharacteristic(bookData, "length");

  console.log(state)

  const draw = (ctx, data) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    var colourScale = scaleLinear()
    .domain([low, high])
    .range([0, 1]);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, componentWidth, componentHeight);

    for (let key in data) {

    }
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, bookData)
  }, [draw]);
  
  return (
    <canvas 
      className="subregion-view" 
      width={componentWidth} 
      height={componentHeight}
      ref={canvasRef} 
      {...props} 
    />
  )
};
export default SubregionView;