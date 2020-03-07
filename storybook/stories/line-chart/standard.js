import React from "react";
import { LineChart, Grid, Path } from "../../../src";

class LineChartExample extends React.PureComponent {
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
      <LineChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 20, bottom: 20 }}
      >
        {({ y, ticks, path }) => (
          <>
            <Grid y={y} ticks={ticks} />
            <Path
              fill="none"
              stroke="rgb(134, 65, 244)"
              d={path}
              animate
              animationDuration={300}
            />
          </>
        )}
      </LineChart>
    );
  }
}

export default LineChartExample;
