import React, { useState, useEffect } from "react";
import { ClipPath, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { Path, Grid } from "../../../src";
import { Chart } from "../../../src/chart/newChart";
import { useChart, useArea } from "../../../src/hooks";

const PartialAreaChartExample = () => {
  const [data, setData] = useState(PATH1);

  useEffect(() => {
    setTimeout(() => {
      setData(PATH2);
      setTimeout(() => {
        setData(PATH3);
      }, 3000);
    }, 3000);
  }, []);

  const indexToClipFrom = 10;
  const { x, y, width, height, ticks, onLayout, mappedData } = useChart({
    data,
    contentInset: { top: 30, bottom: 30 },
  });
  const { path, line } = useArea({ mappedData, x, y });

  return (
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      <Grid y={y} ticks={ticks} />
      <Path
        fill="url(#gradient)"
        clipPath="url(#clip-path-1)"
        d={path}
        animate
        animationDuration={300}
      />
      <Gradient />
      <Clips x={x} width={width} indexToClipFrom={indexToClipFrom} />
      <Line line={line} />
      <DashedLine line={line} />
    </Chart>
  );
};

const Gradient = () => (
  <Defs key={"defs"}>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} stopOpacity={0.8} />
      <Stop offset={"100%"} stopColor={"rgb(134, 65, 244)"} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);

const Line = ({ line }) => {
  return (
    <Path
      animate={true}
      animationDuration={300}
      key={"line"}
      d={line}
      stroke={"green"}
      fill={"none"}
      clipPath={"url(#clip-path-1)"}
    />
  );
};

const Clips = ({ x, width, indexToClipFrom }) => (
  <Defs key={"clips"}>
    <ClipPath id={"clip-path-1"} key={"0"}>
      <Rect x={0} y={"0"} width={x(indexToClipFrom)} height={"100%"} />
    </ClipPath>
    <ClipPath id="clip-path-2" key={"1"}>
      <Rect
        x={x(indexToClipFrom)}
        y={"0"}
        width={width - x(indexToClipFrom)}
        height={"100%"}
      />
    </ClipPath>
  </Defs>
);

const DashedLine = ({ line }) => (
  <Path
    animate={true}
    animationDuration={300}
    key={"dashed-line"}
    stroke={"green"}
    d={line}
    fill={"none"}
    clipPath={"url(#clip-path-2)"}
    strokeDasharray={[4, 4]}
  />
);

const PATH1 = [
  24,
  5,
  9,
  3,
  5,
  -53,
  24,
  50,
  24,
  35,
  53,
  -53,
  24,
  24,
  50,
  -20,
  -80,
];
const PATH2 = [50, 10, 40, 95, 50, 24, 5, 9, 3, 5, -53, 24, 50, -20, -80];
const PATH3 = [24, 5, 9, 3, -53, 24, 50, 24, 35, 53, -53, 24, 24, 50, -20, -80];
export default PartialAreaChartExample;
