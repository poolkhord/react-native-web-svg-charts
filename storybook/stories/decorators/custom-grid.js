import React from "react";
import { Path, Chart, useLine, useChart, useLayout } from "../../../src";
import { StyleSheet } from "react-native";
import { G, Line } from "react-native-svg";

const CustomGridExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const { width, height, onLayout } = useLayout();

  const { x, y, ticks, mappedData } = useChart({
    width,
    height,
    data,
    contentInset: { top: 20, bottom: 20 },
  });

  const { line } = useLine({
    mappedData,
    x,
    y,
  });

  return (
    <Chart style={styles.container} {...{ width, height, onLayout }}>
      <CustomGrid {...{ x, y, data, ticks }} />
      <Path fill="none" stroke="rgb(134, 65, 244)" strokeWidth={5} d={line} />
    </Chart>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: "row",
  },
  chart: {
    flex: 1,
  },
});

const CustomGrid = ({ x, y, data, ticks }) => (
  <G>
    {// Horizontal grid
    ticks.map(tick => (
      <Line
        key={tick}
        x1={"0%"}
        x2={"100%"}
        y1={y(tick)}
        y2={y(tick)}
        stroke={"rgba(0,0,0,0.2)"}
      />
    ))}
    {// Vertical grid
    data.map((_, index) => (
      <Line
        key={index}
        y1={"0%"}
        y2={"100%"}
        x1={x(index)}
        x2={x(index)}
        stroke={"rgba(0,0,0,0.2)"}
      />
    ))}
  </G>
);

export default CustomGridExample;
