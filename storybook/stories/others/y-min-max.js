import React from "react";
import {
  Path,
  useLayout,
  useChart,
  useArea,
  Chart,
  useLine,
} from "../../../src";
import * as shape from "d3-shape";

const GridMinMaxExample = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const { width, height, onLayout } = useLayout();

  const { x, y, mappedData } = useChart({
    width,
    height,
    data,
    contentInset: { top: 30, bottom: 30 },
    curve: shape.curveNatural,
    yMax: 500,
    yMin: -500,
  });

  const { area } = useArea({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  const { line } = useLine({
    mappedData,
    x,
    y,
    curve: shape.curveNatural,
  });

  return (
    <Chart style={{ height: 200 }} {...{ width, height, onLayout }}>
      <Line line={line} />
      <Path fill="rgba(134, 65, 244, 0.2)" d={area} />
    </Chart>
  );
};

const Line = ({ line }) => (
  <Path key={"line "} d={line} stroke={"rgb(134, 65, 244)"} fill={"none"} />
);

export default GridMinMaxExample;
