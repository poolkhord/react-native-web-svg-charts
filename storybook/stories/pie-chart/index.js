import React from "react";
import Standard from "./standard";
import WithCenteredText from "./with-center-text";
import WithLabels from "./with-labels";
import ShowcaseCard from "../showcase-card";

const PieChart = () => (
  <ShowcaseCard title="Pie chart">
    <Standard />
    <WithCenteredText />
    <WithLabels />
  </ShowcaseCard>
);

export default PieChart