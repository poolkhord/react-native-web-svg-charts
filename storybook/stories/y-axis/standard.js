import React from "react";
import { LineChart, YAxis, Grid } from "../../../src";
import { View } from "react-native";
import { Path } from "react-native-svg";

class YAxisExample extends React.PureComponent {
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

    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ height: 200, flexDirection: "row" }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}ºC`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={contentInset}
        >
          {({ y, ticks, path }) => (
            <>
              <Path fill="none" stroke="rgb(134, 65, 244)" d={path} />
              <Grid {...{ y, ticks }} />
            </>
          )}
        </LineChart>
      </View>
    );
  }
}

export default YAxisExample;
