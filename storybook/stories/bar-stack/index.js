import React from "react";

import Standard from "./standard";
import Horizontal from "./horizontal";
import WithOnPress from "./with-on-press";
import Grouped from "./grouped";
import HorizontalGrouped from "./horizontal-grouped";
import ShowcaseCard from "../showcase-card";

const BarStack = () => (
  <ShowcaseCard title="Bar stack">
    <Standard />
    <Horizontal />
    <WithOnPress />
    <Grouped />
    <HorizontalGrouped />
  </ShowcaseCard>
);

export default BarStack;
