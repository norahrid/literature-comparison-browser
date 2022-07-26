import React, { useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import GlobalView from "./GlobalView";
import ChunkView from "./ChunkView";
import SubregionView from "./SubregionView";
import { dataFileManager } from "../dataFileManager";

const Track = (props) => {

    const state = useSelector(state => state);
    const tracks = state["dashboard"][1];
    const dataType = state["dashboard"]["dataType"];
    const data = dataFileManager[dataType];

    const constructElement = (trackType, trackData, id) => {
      if (trackType === 1) return constructTrack1(trackData, id);
      // else if (trackType === 2) return constructTrack2(trackData, id);
      // else if (trackType === 3) return constructTrack3(trackData, id);
    }

    const constructTrack1 = (trackData, id) => {
      return (
        <GlobalView data={trackData} id={id} />
      );
    }

    const constructTrack2 = (trackData, id) => {
        return (
          <ChunkView data={trackData} id={id} />
        );
    }

    const constructTrack3 = (trackData, id) => {
        return (
          <SubregionView data={trackData} id={id} />
        );
    }

    // Generate list of components depending on which track type is selected
    const elements = tracks.map((t, i) => {
        return (
          <div key={"element-"+i} className="dashboard-container track-row-2">
            {/* <p className="side-label">{t}</p> */}
            {constructElement(props.trackType, data[t], t)}
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