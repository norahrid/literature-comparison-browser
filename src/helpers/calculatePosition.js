export const getStartCoord = (gene, w, max) => {
  return (gene["start"] / max) * w;
};

export const getWidth = (gene, w, max) => {
  return ((gene["end"] - gene["start"]) / max) * w;
};
