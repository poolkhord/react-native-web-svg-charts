import * as shape from "d3-shape";

export const useArea = ({
  mappedData,
  x,
  y,
  curve = shape.curveLinear,
  start = 0,
}) => {
  const area = shape
    .area()
    .x(d => x(d.x))
    .y0(y(start))
    .y1(d => y(d.y))
    .defined(item => typeof item.y === "number")
    .curve(curve)(mappedData);

  return {
    area,
  };
};
