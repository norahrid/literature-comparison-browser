import {
  sliderWidth,
  backgroundTextColour,
  baseline,
  geneHeight,
  subregionGeneHeight,
  componentWidth,
  backgroundColour,
} from "../constants";

export const drawScaleLineV3 = (
  buffer,
  labelIntervals,
  positionIntervals,
  sliderPos,
  sliderWidth,
  yPos
) => {
  buffer.background(backgroundColour);
  setStyling(buffer);

  let shiftAmt, lineShift, actualPos, label;
  //let yPos = subregionGeneHeight + baseline;

  for (let i = 0; i < labelIntervals.length; i++) {
    actualPos =
      ((positionIntervals[i] - sliderPos) / sliderWidth) * componentWidth;
    label = parseInt(labelIntervals[i]);

    // determine amount have to shift text labels so they're visible
    shiftAmt = determineShiftAmt(labelIntervals, i);
    lineShift = determineLineShift(labelIntervals, i);
    drawTicks(buffer, lineShift, shiftAmt, actualPos, yPos+10, label);
  }
  buffer.line(0, yPos-5, componentWidth, yPos-5);
};

export const drawScaleLineV2 = (buffer, intervals, yPos) => {
  //buffer.background(backgroundColour);
  setStyling(buffer);

  let shiftAmt, lineShift, actualPos, label;
  let maxEnd = intervals[intervals.length - 1];
  // let yPos = geneHeight+(2*baseline);

  for (let i = 0; i < intervals.length; i++) {
    actualPos = (intervals[i] / maxEnd) * componentWidth;
    label = parseInt(intervals[i]);

    // determine amount have to shift text labels so they're visible
    shiftAmt = determineShiftAmt(intervals, i);
    lineShift = determineLineShift(intervals, i);
    drawTicks(buffer, lineShift, shiftAmt, actualPos, yPos, label);
  }
  buffer.line(0, yPos - 15, componentWidth, yPos - 15);
};

const setStyling = (buffer) => {
  buffer.stroke(backgroundTextColour);
  buffer.strokeWeight(1);
  buffer.textSize(10);
  buffer.fill(backgroundTextColour);
};

const determineShiftAmt = (intervals, index) => {
  let shiftAmt;
  if (index === intervals.length - 1) shiftAmt = -55;
  else shiftAmt = 0;

  return shiftAmt;
};

const determineLineShift = (intervals, index) => {
  let lineShift;
  if (index === intervals.length - 1) lineShift = -2;
  else lineShift = 0;

  return lineShift;
};

const drawTicks = (buffer, lineShift, shiftAmt, actualPos, yPos, label) => {
  buffer.line(
    actualPos + lineShift,
    yPos - 20,
    actualPos + lineShift,
    yPos - 10
  );
  buffer.strokeWeight(0.5);
  buffer.text(label, actualPos + shiftAmt, yPos);
};
