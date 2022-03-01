import React from "react";
import { YAxis, Grid, Chart, useChart, useLayout, useLine } from "../../../src";
import * as shape from "d3-shape";
import { View } from "react-native";
import { Path } from "react-native-svg";

const YAxisExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const contentInset = { top: 20, bottom: 20 };

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    contentInset,
  });
  const { line } = useLine({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  return (
    <View style={{ height: 200, flexDirection: "row" }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        fill="grey"
        fontSize={10}
        numberOfTicks={10}
        formatLabel={value => `${value}ºC`}
      />
      <Chart
        style={{ flex: 1, marginLeft: 16 }}
        {...{ width, height, onLayout }}
      >
        <Path fill="none" stroke="rgb(134, 65, 244)" d={line} />
        <Grid {...{ y, ticks }} />
      </Chart>
    </View>
  );
};

export default YAxisExample;
