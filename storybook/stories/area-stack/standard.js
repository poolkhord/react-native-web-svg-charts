import React, { Fragment } from "react";
import { Grid, Path } from "../../../src";
import * as shape from "d3-shape";
import { Chart } from "../../../src/chart/newChart";
import { useStackArea, useLayout } from "../../../src/hooks";

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
    { onPress: () => console.log("apples") },
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
    curve: shape.curveNatural,
  });

  return (
    <Chart
      style={{ height: 200, paddingVertical: 16 }}
      {...{ width, height, onLayout }}
    >
      <Grid {...{ y, ticks }} />
      {areas.map(({ path, line, key }, index) => (
        <Fragment {...{ key }}>
          <Path fill={colors[index]} {...svgs[index]} d={path} />
          <Line {...{ line }} />
        </Fragment>
      ))}
    </Chart>
  );
};

const Line = ({ line }) => {
  return <Path d={line} stroke={"green"} fill={"none"} />;
};

export default AreaStackChartExample;
