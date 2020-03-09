import React from "react";
import { ClipPath, Defs, Rect } from "react-native-svg";
import { Path, useLayout, useChart, Chart, useLine } from "../../../src";
import { StyleSheet } from "react-native";

const PartialLineChartExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const indexToClipFrom = 10;

  const { width, height, onLayout } = useLayout();

  const { x, y, mappedData } = useChart({
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
      <Clips x={x} width={width} indexToClipFrom={indexToClipFrom} />
      <Path
        fill="none"
        stroke="rgb(134, 65, 244)"
        strokeWidth={2}
        clipPath="url(#clip-path-1)"
        d={line}
      />
      <Shadow {...{ line }} />
      <DashedLine line={line} />
    </Chart>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

const Shadow = ({ line }) => (
  <Path
    y={3}
    key={"shadow-1"}
    d={line}
    stroke={"rgba(134, 65, 244, 0.2)"}
    strokeWidth={5}
    fill={"none"}
  />
);

const Clips = ({ x, width, indexToClipFrom }) => (
  <Defs key={"clips"}>
    <ClipPath id="clip-path-1">
      <Rect x={"0"} y={"0"} width={x(indexToClipFrom)} height={"100%"} />
    </ClipPath>
    <ClipPath id={"clip-path-2"}>
      <Rect
        x={x(indexToClipFrom)}
        y={"0"}
        width={width - x(indexToClipFrom)}
        height={"100%"}
      />
    </ClipPath>
  </Defs>
);

// Line extras:
const DashedLine = ({ line }) => (
  <Path
    key={"line-1"}
    d={line}
    stroke={"rgb(134, 65, 244)"}
    strokeWidth={2}
    fill={"none"}
    strokeDasharray={[4, 4]}
    clipPath={"url(#clip-path-2)"}
  />
);

export default PartialLineChartExample;
