export const calculateIntervals = (start, end, intervalNum) => {
  var intervalSize = (end - start) / intervalNum;

  var intervals = [];

  for (let i = start; i <= end; i += intervalSize) {
    intervals.push(i);
  }

  if (intervals.length < intervalNum + 1) intervals.push(end);
  return intervals;
};
