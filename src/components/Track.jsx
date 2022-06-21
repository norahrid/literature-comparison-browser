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

    const constructElement = (trackType) => {
        if (trackType === 1) return constructTrack1();
        else if (trackType === 2) return constructTrack2();
        else if (trackType === 3) return constructTrack3();
    }

    const constructTrack1 = () => {
      return (
        <GlobalView />
      );
    }

    const constructTrack2 = () => {
        return (
          <ChunkView />
        );
    }

    const constructTrack3 = () => {
        return (
          <SubregionView />
        );
    }


    // Generate list of components depending on which track type is selected
    const elements = tracks.map((t, i) => {
        return (
          <div key={"element-"+i} className="dashboard-container track-row-2">
            {/* <p className="side-label">{t}</p> */}
            {constructElement(props.trackType)}
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