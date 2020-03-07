import { useState } from "react";
import * as array from "d3-array";
import * as scale from "d3-scale";

export const useChart = ({
  data,
  xAccessor = ({ index }) => index,
  yAccessor = ({ item }) => item,
  yScale = scale.scaleLinear,
  xScale = scale.scaleLinear,
  numberOfTicks = 10,
  contentInset: { top = 0, bottom = 0, left = 0, right = 0 } = {},
  gridMax,
  gridMin,
  clampX,
  clampY,
  yMin,
  yMax,
  xMin,
  xMax,
}) => {
  const onLayout = event => {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event;
    setLayout({ height, width });
  };

  const [{ width, height }, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const mappedData = data.map((item, index) => ({
    y: yAccessor({ item, index }),
    x: xAccessor({ item, index }),
  }));

  const yValues = mappedData.map(item => item.y);
  const xValues = mappedData.map(item => item.x);

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
    width,
    height,
    onLayout,
  };
};
