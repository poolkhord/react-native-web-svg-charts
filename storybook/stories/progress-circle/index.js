import React from "react";
import Standard from "./standard";
import WithCenteredText from "./with-center-text";
import Gauge from "./gauge";
import ShowcaseCard from "../showcase-card";

const ProgressCircle = () => (
  <ShowcaseCard title="Progress Circle">
    <Standard />
    <Gauge />
    <WithCenteredText />
  </ShowcaseCard>
);

export default ProgressCircle;
