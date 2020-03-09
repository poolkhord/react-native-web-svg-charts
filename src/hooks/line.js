import * as shape from "d3-shape";

export function useLine({ mappedData, x, y, curve = shape.curveLinear }) {
  let lines;
  let line;

  if (Array.isArray(mappedData[0]))
    lines = mappedData.map(l =>
      shape
        .line()
        .x(d => x(d.x))
        .y(d => y(d.y))
        .defined(item => typeof item.y === "number")
        .curve(curve)(l),
    );
  else
    line = shape
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .defined(item => typeof item.y === "number")
      .curve(curve)(mappedData);

  return {
    line,
    lines,
  };
}
