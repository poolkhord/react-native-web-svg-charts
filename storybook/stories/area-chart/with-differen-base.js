import React from "react";
import { Grid, Path } from "../../../src";
import * as shape from "d3-shape";
import * as array from "d3-array";
import { Chart } from "../../../src/chart/newChart";
import { useChart, useArea, useLayout } from "../../../src/hooks";

const DifferentBaseExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const min = array.extent(data)[0];

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    contentInset: { top: 30, bottom: 30 },
  });

  const { area } = useArea({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
    start: min,
  });

  return (
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      <Grid y={y} ticks={ticks} />
      <Path fill="rgba(134, 65, 244, 0.8)" d={area} />
    </Chart>
  );
};

export default DifferentBaseExample;
