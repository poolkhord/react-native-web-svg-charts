import React from "react";

import Standard from "./standard";
import Horizontal from "./horizontal";
import Grouped from "./grouped";
import GroupedHorizontal from "./horizontal-grouped";
import WithGradient from "./with-gradient";
import WithYMinMax from "./with-y-min-max";
import WithOnPress from "./with-on-press";
import ShowcaseCard from "../showcase-card";

const BarChart = () => (
  <ShowcaseCard title="Bar chart">
    <Standard />
    <Grouped />
    <Horizontal />
    <GroupedHorizontal />
    <WithOnPress />
    <WithGradient />
    <WithYMinMax />
  </ShowcaseCard>
);
export default BarChart;
