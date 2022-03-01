import React from "react";
import {
  XAxis,
  Grid,
  Path,
  Chart,
  useArea,
  useLayout,
  useChart,
} from "../../../src";
import { View } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as dateFns from "date-fns";

const XAxisScaleTimeExample = () => {
  const data = [
    {
      value: 50,
      date: dateFns.setHours(new Date(2018, 0, 0), 6),
    },
    {
      value: 10,
      date: dateFns.setHours(new Date(2018, 0, 0), 9),
    },
    {
      value: 150,
      date: dateFns.setHours(new Date(2018, 0, 0), 15),
    },
    {
      value: 10,
      date: dateFns.setHours(new Date(2018, 0, 0), 18),
    },
    {
      value: 100,
      date: dateFns.setHours(new Date(2018, 0, 0), 21),
    },
    {
      value: 20,
      date: dateFns.setHours(new Date(2018, 0, 0), 24),
    },
  ];

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    yAccessor: ({ item }) => item.value,
    xAccessor: ({ item }) => item.date,
    xScale: scale.scaleTime,
    contentInset: { top: 10, bottom: 10 },
    curve: shape.curveLinear,
  });
  const { area } = useArea({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  return (
    <View style={{ height: 200, padding: 20 }}>
      <Chart style={{ flex: 1 }} {...{ width, height, onLayout }}>
        <Path fill="rgba(134, 65, 244, 0.5)" d={area} />
        <Grid {...{ y, ticks }} />
      </Chart>
      <XAxis
        data={data}
        xAccessor={({ item }) => item.date}
        scale={scale.scaleTime}
        numberOfTicks={6}
        style={{ marginHorizontal: -15, height: 20 }}
        contentInset={{ left: 10, right: 25 }}
        formatLabel={value => dateFns.format(value, "HH:mm")}
        fill="black"
        fontSize={8}
        fontWeight="bold"
        rotation={20}
        originY={30}
        y={5}
      />
    </View>
  );
};

export default XAxisScaleTimeExample;
