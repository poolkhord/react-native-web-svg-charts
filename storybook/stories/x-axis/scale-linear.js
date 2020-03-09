import React from "react";
import { XAxis, Grid, Chart, useLayout, useChart, useLine } from "../../../src";
import { View } from "react-native";
import { Path } from "react-native-svg";

const XAxisExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    gridMin: 0,
    contentInset: { top: 10, bottom: 10 },
  });

  const { line } = useLine({
    mappedData,
    x,
    y,
  });

  return (
    <View style={{ height: 200, padding: 20 }}>
      <Chart style={{ flex: 1 }} {...{ width, height, onLayout }}>
        <Path fill="none" stroke="rgb(134, 65, 244)" d={line} />
        <Grid {...{ y, ticks }} />
      </Chart>
      <XAxis
        style={{ marginHorizontal: -10 }}
        data={data}
        formatLabel={(value, index) => index}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 10, fill: "black" }}
      />
    </View>
  );
};

export default XAxisExample;
