import React from "react";

import Regular from "./standard";
import WithTimeScale from "./with-time-scale";
import WithGradient from "./with-gradient";
import WithYAxis from "./with-y-axis";
import ShowcaseCard from "../showcase-card";

const StackedAreaChart = () => (
  <ShowcaseCard title="Stacked area chart">
    <Regular />
    <WithTimeScale />
    <WithYAxis />
    <WithGradient />
  </ShowcaseCard>
);

export default StackedAreaChart;
