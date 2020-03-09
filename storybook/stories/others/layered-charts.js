import React from "react";
import { Grid, Path, useLayout, useChart, useArea, Chart } from "../../../src";
import * as shape from "d3-shape";
import { StyleSheet, View } from "react-native";

const LayeredChartsExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const data2 = [
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
  ].reverse();

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
  });

  const { x: x2, y: y2, mappedData: mappedData2 } = useChart({
    width,
    height,
    data: data2,
    contentInset: { top: 30, bottom: 30 },
  });

  const { area: area2 } = useArea({
    x: x2,
    y: y2,
    mappedData: mappedData2,
    curve: shape.curveNatural,
  });

  return (
    <View style={{ height: 200 }}>
      <Chart style={{ flex: 1 }} {...{ width, height, onLayout }}>
        <Path fill="rgba(134, 65, 244, 0.5)" d={area} />
        <Grid {...{ y, ticks }} />
      </Chart>
      <Chart style={StyleSheet.absoluteFill} {...{ width, height, onLayout }}>
        <Path fill="rgba(134, 65, 244, 0.5)" d={area2} />
      </Chart>
    </View>
  );
};

export default LayeredChartsExample;
