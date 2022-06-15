import { componentWidth, minSliderWidth } from "../constants";

export default class slider {
  constructor(left, top, width, height, p5) {
    this.p5 = p5;
    this.repeats = [];
    this.genes = [];
    this.methylation = [];

    // position indications
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
   
    // state indicators
    this.selected = false;
    this.isDragged = false;
    this.isReadyToResize = false;
    this.isResized = false;
    this.isLeftResize = false;
  }

  getSliderRepeats() {
    return this.repeats;
  }

  getSliderGenes() {
    return this.genes;
  }

  getMethylation() {
    return this.methylation;
  }

  getSliderParameters() {
    return {
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height
    }
  }

  getSliderStates() {
    return {
      selected: this.selected,
      isDragged: this.isDragged,
      isReadyToResize: this.isReadyToResize,
      isResized: this.isResized,
      isLeftResize: this.isLeftResize
    }
  }

  display() {
    // draw slider
    this.p5.fill(224, 224, 224, 15);

    this.p5.strokeWeight(1);
    this.p5.stroke(255);

    let l;
    // shift slider slightly to the left at the end of the track for the aesthetic
    if (this.left + this.width === componentWidth) l = this.left - 1;
    else l = this.left;
    this.p5.rect(l, this.top, this.width, this.height);
  }

  setSelected() {
    this.selected = true;
  }

  unsetSelected() {
    this.selected = false;
    this.isDragged = false;
  }

  setResized() {
    this.isReadyToResize = true;
  }

  unsetResized() {
    this.isReadyToResize = false;
    this.isResized = false;
  }

  setLeftResized() {
    this.isLeftResize = true;
  }

  unsetLeftResized() {
    this.isLeftResize = false;
    this.isReadyToResize = false;
    this.isResized = false;
  }

  move(x, fullScreenWidth) {
    var dx = x - this.left;
    this.isDragged = true;

    if (this.left + this.width + dx < fullScreenWidth && this.left + dx >= 0) {
      this.left += dx;
    }
    // prevent the slider from going off the right end
    else if (this.left + this.width + dx > fullScreenWidth) {
      this.left = fullScreenWidth - this.width;
    }
    // prevents slider from going off left end
    else if (this.left + dx < 0) {
      this.left = 0;
    }
  }

  rightResize(x, fullScreenWidth) {
    let dx;

    if (x > fullScreenWidth) dx = fullScreenWidth - (this.left + this.width);
    else dx = x - (this.left + this.width);

    this.width = Math.max(minSliderWidth, this.width + dx);
    this.isResized = true;
  }

  leftResize(x) {
    let dx;
    if (x < 0) {
      dx = this.left;
      this.left = 0;
    } else {
      dx = this.left - x;
      if (this.width > minSliderWidth) this.left = x;
    }
    this.width = Math.max(minSliderWidth, this.width + dx);
    this.isResized = true;
  }

  resetSelectedGenes() {
    this.repeats = [];
  }

  determineSelectedRepeats(repeat, start, end) {
    // small number add to handle rounding error that happens when the slider is at the end of line
    if (start >= this.left && end <= this.left + this.width + 0.000000001) {
      this.repeats.push({calculatedStart: start, calculatedEnd: end, ...repeat});
    }
  }

  determineSelectedGenes(gene, start, end) {
    // small number add to handle rounding error that happens when the slider is at the end of line
    if (start >= this.left && end <= this.left + this.width + 0.000000001) {
      this.genes.push({calculatedStart: start, calculatedEnd: end, ...gene});
    }
    // start of the gene is inside the slider
    else if (start <= this.left && end <= this.left + this.width + 0.000000001) {
      this.genes.push({calculatedStart: start, calculatedEnd: end, ...gene});
    }
    // end of gene is inside the slider
    else if (start >= this.left && end >= this.left + this.width + 0.000000001) {
      this.genes.push({calculatedStart: start, calculatedEnd: end, ...gene});
    }
  }

  determineSelectedMethylation(methylation, start, end) {
    // small number add to handle rounding error that happens when the slider is at the end of line
    if (start >= this.left && end <= this.left + this.width + 0.000000001) {
      this.methylation.push({calculatedStart: start, calculatedEnd: end, ...methylation});
    }
    // start of the gene is inside the slider
    else if (start <= this.left && end <= this.left + this.width + 0.000000001) {
      this.methylation.push({calculatedStart: start, calculatedEnd: end, ...methylation});
    }
    // end of gene is inside the slider
    else if (start >= this.left && end >= this.left + this.width + 0.000000001) {
      this.methylation.push({calculatedStart: start, calculatedEnd: end, ...methylation});
    }
  }
}
