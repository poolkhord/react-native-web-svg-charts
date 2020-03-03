import React from "react";

import Regular from "./standard";
import Partial from "./partial";
import WithGradient from "./with-gradient";
import WithDifferentBase from "./with-differen-base";
import ShowcaseCard from "../showcase-card";

const AreaChart = () => (
  <ShowcaseCard title="AreaChart">
    <Regular />
    <Partial />
    <WithGradient />
    <WithDifferentBase />
  </ShowcaseCard>
);

export default AreaChart;
