import {
  backgroundTextColour,
  componentWidth,
  baseline,
  backgroundColour,
} from "../constants";

export const drawTrack = (
  buffer,
  repeat,
  zoomLevel,
  pan,
  minPos,
  top,
  chunkHeight,
  completeFilter
) => {
  // shift genes back to nearly the beginning so they don't disappear off screen
  var start = repeat["calculatedStart"] * zoomLevel - minPos * zoomLevel;
  var width = (repeat["calculatedEnd"] - repeat["calculatedStart"]) * zoomLevel;

  // draw gene
  buffer.strokeWeight(0);
  buffer.drawingContext.setLineDash([]);

  buffer.rect(start - pan, top, width, chunkHeight);

  // // complete repeats only
  // if (repeat["complete"] === "yes" && completeFilter === "complete") {
   
  // }
  // // incomplete repeats only
  // else if (repeat["complete"] === "no" && completeFilter === "fragment"){
  //   buffer.rect(start - pan, top, width, chunkHeight);
  // }
  // // all repeats
  // else if (completeFilter === "all") {
  //   buffer.rect(start - pan, top, width, chunkHeight);
  // } 

  return [start, width];
};

export const drawTooltip = (buffer, xpos, ypos, repeat) => {
  buffer.fill(255);
  buffer.rect(xpos, ypos, 160, 55, 10);
  buffer.fill(backgroundTextColour);
  buffer.textSize(12);
  buffer.strokeWeight(0.5);
  // p.text("Start: " + repeat["ogStart"], xpos + 15, ypos + 15);
  // p.text("End: " + repeat["ogEnd"], xpos + 15, ypos + 30);
  buffer.text("Clade: " + repeat["clade"], xpos + 15, ypos + 15);
  buffer.text("Unitig: " + repeat["unitig"], xpos + 15, ypos + 30);
  buffer.text("Complete: " + repeat["complete"], xpos + 15, ypos + 45)
};

export const drawPrompt = (buffer, componentWidth, componentHeight) => {
  buffer.fill(backgroundTextColour);
  buffer.textAlign(buffer.CENTER);
  buffer.text(
    "Click on a subregion to select repeats",
    componentWidth / 2,
    componentHeight / 3
  );
};

export const drawPositionIndicator = (
  buffer,
  repeat,
  bottomPos,
  chunkHeight,
  isCascade
) => {
  //if (!isCascade) buffer.background(backgroundColour);

  buffer.stroke(backgroundTextColour);
  buffer.strokeWeight(0.5);

  // draw dashed line from repeat to number line
  if (isCascade) {
    buffer.drawingContext.setLineDash([5, 5]);
    buffer.line(
      repeat["left"],
      repeat["top"] + chunkHeight,
      repeat["left"],
      bottomPos - baseline
    );
    buffer.line(
      repeat["left"] + repeat["width"],
      repeat["top"] + chunkHeight,
      repeat["left"] + repeat["width"],
      bottomPos - baseline
    );
  }

  // add position ticks for the hovered-over repeat
  buffer.drawingContext.setLineDash([]);
  buffer.line(repeat["left"], bottomPos - 30, repeat["left"], bottomPos - 20);
  buffer.line(
    repeat["left"] + repeat["width"],
    bottomPos - 30,
    repeat["left"] + repeat["width"],
    bottomPos - 20
  );
  buffer.textSize(10);
  buffer.text(
    repeat["ogStart"],
    buffer.max(repeat["left"] - baseline * 2, 0),
    bottomPos - 10
  );
  buffer.text(
    repeat["ogEnd"],
    buffer.min(
      repeat["left"] + repeat["width"] + 5,
      componentWidth - baseline * 2
    ),
    bottomPos
  );
};
