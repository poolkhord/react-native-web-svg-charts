import React from "react";
import { Grid, Path } from "../../../src";
import { Defs, Stop, LinearGradient } from "react-native-svg";
import * as shape from "d3-shape";
import { Chart } from "../../../src/chart/newChart";
import { useLayout, useStackArea } from "../../../src/hooks";

const AreaStackChartExample = () => {
  const data = [
    {
      month: new Date(2015, 0, 1),
      apples: 3840,
      bananas: 1920,
      cherries: 960,
      dates: 400,
    },
    {
      month: new Date(2015, 1, 1),
      apples: 1600,
      bananas: 1440,
      cherries: 960,
      dates: 400,
    },
    {
      month: new Date(2015, 2, 1),
      apples: 640,
      bananas: 960,
      cherries: 3640,
      dates: 400,
    },
    {
      month: new Date(2015, 3, 1),
      apples: 3320,
      bananas: 480,
      cherries: 640,
      dates: 400,
    },
  ];

  const colors = ["#8800cc", "#aa00ff", "#cc66ff", "#eeccff"];
  const keys = ["apples", "bananas", "cherries", "dates"];
  const svgs = [
    { fill: "url(#gradient)" },
    { onPress: () => console.log("bananas") },
    { onPress: () => console.log("cherries") },
    { onPress: () => console.log("dates") },
  ];

  const { width, height, onLayout } = useLayout();

  const { areas, ticks, y } = useStackArea({
    width,
    height,
    data,
    keys,
    colors,
    curve: shape.curveNatural,
  });

  return (
    <Chart
      style={{ height: 200, paddingVertical: 16 }}
      {...{ width, height, onLayout }}
    >
      <Grid {...{ y, ticks }} />
      <Gradient />
      {areas.map((area, index) => (
        <Path key={keys.key} fill={area.color} {...svgs[index]} d={area.path} />
      ))}
    </Chart>
  );
};

const Gradient = () => (
  <Defs>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"100%"} y2={"0%"}>
      <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} />
      <Stop offset={"100%"} stopColor={"#eeccff"} />
    </LinearGradient>
  </Defs>
);

export default AreaStackChartExample;
