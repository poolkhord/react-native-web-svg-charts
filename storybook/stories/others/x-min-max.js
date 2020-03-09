import React from "react";
import { View } from "react-native";
import { XAxis, Path, Chart, useArea, useChart, useLayout } from "../../../src";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as dateFns from "date-fns";

const GridMinMaxExample = () => {
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

  const xMin = dateFns.setHours(new Date(2018, 0, 0), 0);

  const { width, height, onLayout } = useLayout();

  const { x, y, mappedData } = useChart({
    width,
    height,
    data,
    xMin,
    contentInset: { top: 30, bottom: 30 },
    xScale: scale.scaleTime,
    xAccessor: ({ item }) => item.date,
    yAccessor: ({ item }) => item.value,
    yMax: 200,
  });

  const { area } = useArea({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  return (
    <View style={{ height: 200 }}>
      <Chart style={{ flex: 1 }} {...{ width, height, onLayout }}>
        <Path fill="rgba(134, 65, 244, 0.2)" d={area} />
      </Chart>
      <XAxis
        style={{ marginHorizontal: -10, marginTop: 10 }}
        contentInset={{ left: 10, right: 10 }}
        data={data}
        scale={scale.scaleTime}
        numberOfTicks={12}
        xAccessor={({ item }) => item.date}
        formatLabel={value => dateFns.format(value, "HH")}
        min={xMin}
      />
    </View>
  );
};

export default GridMinMaxExample;
