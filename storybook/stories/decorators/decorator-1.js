import React from "react";
import { AreaChart, Grid } from "../../../src";
import { Circle, Path } from "react-native-svg";
import { StyleSheet } from "react-native";

class DecoratorExample extends React.PureComponent {
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
      <AreaChart
        style={styles.container}
        data={data}
        contentInset={{ top: 20, bottom: 30 }}
      >
        {({ line, x, y, ticks, path }) => (
          <>
            <Path
              fill="rgba(134, 65, 244, 0.2)"
              d={path}
              animate
              animationDuration={300}
            />
            <Grid {...{ y, ticks }} />
            <Line {...{ line }} />
            <Decorator {...{ x, y, data }} />
          </>
        )}
      </AreaChart>
    );
  }
}

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
