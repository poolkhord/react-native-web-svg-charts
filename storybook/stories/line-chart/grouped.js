import React from "react";
import { Grid, Path, Chart, useLine, useChart, useLayout } from "../../../src";

const GroupedLineChartExample = () => {
  const data1 = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    85,
    91,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];
  const data2 = [
    -87,
    66,
    -69,
    92,
    -40,
    -61,
    16,
    62,
    20,
    -93,
    -54,
    47,
    -89,
    -44,
    18,
  ];

  const data = [
    {
      data: data1,
      svg: { stroke: "#8800cc" },
    },
    {
      data: data2,
      svg: { stroke: "green" },
    },
  ];

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    contentInset: { top: 20, bottom: 20 },
  });
  const { lines } = useLine({
    mappedData,
    x,
    y,
  });

  return (
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      {lines.map((line, index) => {
        const { svg } = data[index];
        return <Path fill={"none"} d={line} key={index} {...svg} />;
      })}
      <Grid {...{ y, ticks }} />
    </Chart>
  );
};

export default GroupedLineChartExample;
