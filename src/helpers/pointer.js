import { subregionGeneHeight, backgroundTextColour } from "../constants";

export const drawPointer = (p5, xPos, yPos) => {
  // draw pointer to indicate the spot that was last clicked
  p5.strokeWeight(0);
  p5.fill(backgroundTextColour);
  p5.triangle(
    xPos,
    yPos + 10,
    xPos - 5,
    yPos + 25,
    xPos + 5,
    yPos + 25
  );
} 