import React from "react";
import { Grid, Path, useLayout, useChart, useLine, Chart } from "../../../src";
import { Circle, G, Line, Rect, Text } from "react-native-svg";

const ExtrasExample = () => {
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
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      <Path
        fill="none"
        stroke="rgb(134, 65, 244)"
        strokeWidth={2}
        d={line}
        animate
        animationDuration={300}
      />
      <Grid {...{ y, ticks }} />
      <HorizontalLine {...{ y }} />
      <Tooltip {...{ x, y, data }} />
    </Chart>
  );
};

const HorizontalLine = ({ y }) => (
  <Line
    key={"zero-axis"}
    x1={"0%"}
    x2={"100%"}
    y1={y(50)}
    y2={y(50)}
    stroke={"grey"}
    strokeDasharray={[4, 8]}
    strokeWidth={2}
  />
);

const Tooltip = ({ x, y, data }) => (
  <G
    x={x(5) - 75 / 2}
    key={"tooltip"}
    onPress={() => console.log("tooltip clicked")}
  >
    <G y={50}>
      <Rect
        height={40}
        width={75}
        stroke={"grey"}
        fill={"white"}
        ry={10}
        rx={10}
      />
      <Text
        x={75 / 2}
        dy={20}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
        stroke={"rgb(134, 65, 244)"}
      >
        {`${data[5]}ºC`}
      </Text>
    </G>
    <G x={75 / 2}>
      <Line y1={50 + 40} y2={y(data[5])} stroke={"grey"} strokeWidth={2} />
      <Circle
        cy={y(data[5])}
        r={6}
        stroke={"rgb(134, 65, 244)"}
        strokeWidth={2}
        fill={"white"}
      />
    </G>
  </G>
);

export default ExtrasExample;
