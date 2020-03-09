import React from "react";
import {
  Grid,
  Chart,
  useLayout,
  useChart,
  useLine,
  useArea,
} from "../../../src";
import { Circle, Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const DecoratorExample = () => {
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

  const { area } = useArea({
    mappedData,
    x,
    y,
  });

  return (
    <Chart style={styles.container} {...{ width, height, onLayout }}>
      <Path
        fill="rgba(134, 65, 244, 0.2)"
        d={area}
        animate
        animationDuration={300}
      />
      <Grid {...{ y, ticks }} />
      <Line {...{ line }} />
      <Decorator {...{ x, y, data }} />
    </Chart>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={"rgb(134, 65, 244)"}
      fill={"white"}
    />
  ));
};

const Line = ({ line }) => (
  <Path d={line} stroke={"rgba(134, 65, 244)"} fill={"none"} />
);

export default DecoratorExample;
