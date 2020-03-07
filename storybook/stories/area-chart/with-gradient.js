import React from "react";
import { Path } from "../../../src";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { useChart, useArea, useLayout } from "../../../src/hooks";
import * as shape from "d3-shape";
import { Chart } from "../../../src/chart/newChart";

const GradientExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const { width, height, onLayout } = useLayout();

  const { x, y, mappedData } = useChart({
    width,
    height,
    data,
    contentInset: { top: 30, bottom: 20 },
  });

  const { path } = useArea({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  return (
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      <Gradient />
      <Path fill="url(#gradient)" d={path} />
    </Chart>
  );
};

const Gradient = () => (
  <Defs>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} stopOpacity={0.8} />
      <Stop offset={"100%"} stopColor={"rgb(134, 65, 244)"} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);

export default GradientExample;
