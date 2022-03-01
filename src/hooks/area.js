import * as shape from "d3-shape";

/**
 * @typedef {object} Options
 * @property {number} x
 * @property {number} y
 * @property {any} mappedData
 * @property {(context: any) => any} [curve] Default is `shape.curveLinear`
 * @property {number} [start]
 */

/**
 * @param {Options} options
 * @returns {{
  area: number[];
}}
 */
export function useArea({
  mappedData,
  x,
  y,
  curve = shape.curveLinear,
  start = 0,
}) {
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
}
