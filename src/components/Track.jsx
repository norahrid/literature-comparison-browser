import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import GlobalView from "./GlobalView";
import ChunkView from "./ChunkView";
import SubregionView from "./SubregionView";
import { dataFileManager } from "../dataFileManager";

const Track = ({trackType, colourScale}) => {

    const state = useSelector(state => state);
    const tracks = state["dashboard"][1];
    const dataType = state["dashboard"]["dataType"];
    const data = dataFileManager[dataType];

    const constructElement = (trackType, trackData, id, colourScale) => {
      // global view
      if (trackType === 1) return constructTrack1(trackData, id, colourScale);
      // chunk view
      else if (trackType === 2) return constructTrack2(trackData, id, colourScale);
      // subregion view
      else if (trackType === 3) return constructTrack3(trackData, id, colourScale);
    }

    const constructTrack1 = (trackData, id, colourScale) => {
      return (
        <GlobalView data={trackData} id={id} colourScale={colourScale} />
      );
    }

    const constructTrack2 = (trackData, id, colourScale) => {
        return (
          <ChunkView data={trackData} id={id} colourScale={colourScale}  />
        );
    }

    const constructTrack3 = (trackData, id, colourScale) => {
        return (
          <SubregionView data={trackData} id={id} colourScale={colourScale} />
        );
    }

    // Generate list of components depending on which track type is selected
    const elements = tracks.map((t, i) => {
    
      return (
        <div key={"element-"+i} className="dashboard-container track-row-2">
          {/* <p className="side-label">{t}</p> */}
          {constructElement(trackType, data[t], t, colourScale)}
        </div>
      )
    });

    return (
      <div className="track">
        {elements}
      </div>
    )
}
export default Track;