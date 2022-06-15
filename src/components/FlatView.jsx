import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { drawScaleLineV2 } from "./ScaleLine";
import {
  componentHeight,
  componentWidth,
  backgroundColour,
  baseline,
  subregionGeneHeight,
} from "../constants";
import { setCladeColouring } from "../helpers/setCladeColouring";
import {
  drawTrack,
  drawPrompt,
  drawTooltip,
  drawPositionIndicator,
} from "../helpers/drawSubregionSelectionElements";

const FlatView = (props) => {
  const containerRef = useRef();

  const Sketch = (p) => {
    var minPos;
    var pg3;
    var selectedNodes;
    var minPos;
    var chunkHeight;

    p.setup = () => {
      // find the smallest start position of the selected genes
      var pos = [];
      for (let i = 0; i < props.clickedGenes.length; i++) {
        pos.push(props.clickedGenes[i]["calculatedStart"]);
      }
      minPos = p.min(pos);

      p.createCanvas(componentWidth, subregionGeneHeight + (baseline+15));
      chunkHeight = componentHeight - 25;
      pg3 = p.createGraphics(componentWidth, subregionGeneHeight);

      p.noLoop();
    };

    p.draw = () => {
      p.background(backgroundColour);
      selectedNodes = [];
      drawFourthView();
    };

    p.mouseMoved = () => {
      p.background(backgroundColour);
      p.image(pg3, 0, 0);
      drawScaleLineV2(p, [], subregionGeneHeight + baseline);

      for (let i = 0; i < selectedNodes.length; i++) {
        if (
          p.mouseX >= selectedNodes[i].left - 5 &&
          p.mouseX <= selectedNodes[i].left + 5 + selectedNodes[i].width
        ) {
          if (
            p.mouseY >= selectedNodes[i].top &&
            p.mouseY <= selectedNodes[i].top + selectedNodes[i].height
          ) {
            // handle case where tooltip goes off screen on right and bottom
            var xpos, ypos;
            if (p.mouseX >= componentWidth - 150) xpos = p.mouseX - 165;
            else xpos = p.mouseX + 15;

            if (p.mouseY >= subregionGeneHeight) ypos = 0;
            else ypos = p.mouseY;

            drawPositionIndicator(
              p,
              selectedNodes[i],
              subregionGeneHeight + baseline + 10,
              chunkHeight,
              false
            );
            p.image(pg3, 0, 0);
            drawScaleLineV2(p, [], subregionGeneHeight + baseline);
            // display repeat info tooltip
            drawTooltip(p, xpos, ypos, selectedNodes[i]);
          }
        }
      }
    };

    const drawFourthView = () => {
      pg3.background(backgroundColour);
      p.background(backgroundColour);

      // No genes selected -- prompt for a click
      if (
        typeof props.clickedGenes === "undefined" ||
        props.clickedGenes.length === 0
      ) {
        drawPrompt(pg3, componentWidth, componentHeight);
      } else {
        for (let i = 0; i < props.clickedGenes.length; i++) {
          setCladeColouring(props.clickedGenes[i].clade, props.clade, pg3);
          let positions = drawTrack(
            pg3,
            props.clickedGenes[i],
            props.zoom,
            props.pan,
            minPos,
            0,
            chunkHeight
          );

          let info = {
            left: positions[0] - props.pan,
            top: 0,
            width: positions[1],
            height: chunkHeight,
            clade: props.clickedGenes[i]["clade"],
            ogStart: props.clickedGenes[i]["start"],
            ogEnd: props.clickedGenes[i]["end"],
            unitig: props.clickedGenes[i]["unitig"],
          };
          selectedNodes.push(info);
        }
        props.submitCalculatedPositions(selectedNodes, props.genome);
        pg3.strokeWeight(1);
      }
      p.image(pg3, 0, 0);
      drawScaleLineV2(p, [], subregionGeneHeight + baseline);
    };
  };

  useEffect(() => {
    let inst = new p5(Sketch, containerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => inst.remove();
  }, [props.clickedGenes, props.clade, props.zoom, props.pan, props.viewStyle]);

  return <div ref={containerRef}></div>;
};

export default FlatView;
