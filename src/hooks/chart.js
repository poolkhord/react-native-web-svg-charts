import * as array from "d3-array";
import * as scale from "d3-scale";

export function useChart({
  width,
  height,
  data,
  gridMin,
  gridMax,
  clampY,
  clampX,
  yMin,
  yMax,
  xMin,
  xMax,
  contentInset: { top = 0, bottom = 0, left = 0, right = 0 } = {},
  numberOfTicks = 10,
  yScale = scale.scaleLinear,
  xScale = scale.scaleLinear,
  xAccessor = ({ index }) => index,
  yAccessor = ({ item }) => item,
}) {
  let mappedData;
  let yValues;
  let xValues;
  if (typeof data[0] === "object") {
    mappedData = data.map(dataArray =>
      dataArray.data.map((item, index) => ({
        y: yAccessor({ item, index }),
        x: xAccessor({ item, index }),
      })),
    );
    yValues = array.merge(mappedData).map(item => item.y);
    xValues = array.merge(mappedData).map(item => item.x);
  } else {
    mappedData = data.map((item, index) => ({
      y: yAccessor({ item, index }),
      x: xAccessor({ item, index }),
    }));

    yValues = mappedData.map(item => item.y);
    xValues = mappedData.map(item => item.x);
  }

  const yExtent = array.extent([...yValues, gridMin, gridMax]);
  const xExtent = array.extent([...xValues]);

  yMin = yMin ?? yExtent[0];
  yMax = yMax ?? yExtent[1];
  xMin = xMin ?? xExtent[0];
  xMax = xMax ?? xExtent[1];

  //invert range to support svg coordinate system
  const y = yScale()
    .domain([yMin, yMax])
    .range([height - bottom, top])
    .clamp(clampY);

  const x = xScale()
    .domain([xMin, xMax])
    .range([left, width - right])
    .clamp(clampX);

  const ticks = y.ticks(numberOfTicks);
  const ticksX = x.ticks(numberOfTicks);

  return {
    x,
    y,
    data,
    mappedData,
    ticks,
    ticksX,
  };
}
