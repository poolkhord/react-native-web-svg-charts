import React from "react";
import { LineChart, Path } from "../../../src";
import { View, StyleSheet } from "react-native";
import { G, Line } from "react-native-svg";

class CustomGridExample extends React.PureComponent {
  render() {
    const data = [
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

    return (
      <View style={styles.container}>
        <LineChart style={styles.chart} data={data}>
          {({ x, y, ticks, path }) => (
            <>
              <CustomGrid {...{ x, y, data, ticks }} />
              <Path
                fill="none"
                stroke="rgb(134, 65, 244)"
                strokeWidth={5}
                d={path}
              />
            </>
          )}
        </LineChart>
      </View>
    );
  }
}

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
