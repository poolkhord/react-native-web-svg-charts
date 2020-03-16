import * as shape from "d3-shape";
import * as array from "d3-array";
import * as scale from "d3-scale";

export function useStackArea({
  width,
  height,
  data,
  keys,
  gridMin,
  gridMax,
  clampY,
  clampX,
  yMin,
  yMax,
  xMin,
  xMax,
  curve = shape.curveLinear,
  offset = shape.stackOffsetNone,
  order = shape.stackOrderNone,
  contentInset: { top = 0, bottom = 0, left = 0, right = 0 } = {},
  numberOfTicks = 10,
  xScale = scale.scaleLinear,
  xAccessor = ({ index }) => index,
}) {
  const series = shape
    .stack()
    .keys(keys)
    .order(order)
    .offset(offset)(data);

  //double merge arrays to extract just the yValues
  const yValues = array.merge(array.merge(series));
  const xValues = data.map((item, index) => xAccessor({ item, index }));

  const yExtent = array.extent([...yValues, gridMin, gridMax]);
  const xExtent = array.extent(xValues);

  yMin = yMin ?? yExtent[0];
  yMax = yMax ?? yExtent[1];
  xMin = xMin ?? xExtent[0];
  xMax = xMax ?? xExtent[1];

  //invert range to support svg coordinate system
  const y = scale
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - bottom, top])
    .clamp(clampY);

  const x = xScale()
    .domain([xMin, xMax])
    .range([left, width - right])
    .clamp(clampX);

  const ticks = y.ticks(numberOfTicks);

  const areas = series.map((serie, index) => {
    const mappedData = data.map((_, i) => serie[i]);
    const path = shape
      .area()
      .x((d, i) => x(xAccessor({ item: d.data, index: i })))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(curve)(mappedData);

    const line = shape
      .line()
      .x((d, i) => x(xAccessor({ item: d.data, index: i })))
      .y(d => y(d[0]))
      .y(d => y(d[1]))
      .curve(curve)(mappedData);

    return {
      path,
      line,
      key: keys[index],
    };
  });

  return {
    x,
    y,
    ticks,
    areas,
  };
}

export function stackAreaExtractDataPoints(
  data,
  keys,
  order = shape.stackOrderNone,
  offset = shape.stackOffsetNone,
) {
  const series = shape
    .stack()
    .keys(keys)
    .order(order)
    .offset(offset)(data);

  //double merge arrays to extract just the values
  return array.merge(array.merge(series));
}
