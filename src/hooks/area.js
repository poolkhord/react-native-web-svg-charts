import * as shape from "d3-shape";

export const useArea = ({
  mappedData,
  x,
  y,
  curve = shape.curveLinear,
  start = 0,
}) => {
  const path = shape
    .area()
    .x(d => x(d.x))
    .y0(y(start))
    .y1(d => y(d.y))
    .defined(item => typeof item.y === "number")
    .curve(curve)(mappedData);

  const line = shape
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .defined(item => typeof item.y === "number")
    .curve(curve)(mappedData);

  return {
    path,
    line,
  };
};
