import React from "react";
import ScaleLinear from "./scale-linear";
import ScaleTime from "./scale-time";
import ScaleBand from "./scale-band";
import WithComplexData from "./data-object";
import ShowcaseCard from "../showcase-card";

const XAxis = () => (
  <ShowcaseCard title="XAxis">
    <ScaleLinear />
    <ScaleTime />
    <ScaleBand />
    <WithComplexData />
  </ShowcaseCard>
);

export default XAxis