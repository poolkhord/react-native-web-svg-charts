import * as shape from "d3-shape";

export function useLine({ mappedData, x, y, curve = shape.curveLinear }) {
  const line = shape
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y))
    .defined(item => typeof item.y === "number")
    .curve(curve)(mappedData);

  return {
    line,
  };
}
