import React from "react";
import { AreaChart, Grid, Path } from "../../../src";
import * as shape from "d3-shape";

class AreaChartExample extends React.PureComponent {
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
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
      >
        {({ y, ticks, path }) => (
          <>
            <Grid y={y} ticks={ticks} />
            <Path
              fill="rgba(134, 65, 244, 0.8)"
              d={path}
              animate
              animationDuration={300}
            />
          </>
        )}
      </AreaChart>
    );
  }
}

export default AreaChartExample;
