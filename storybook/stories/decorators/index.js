import React from "react";
import Grid from "./custom-grid";
import Decorator1 from "./decorator-1";
import Decorator2 from "./decorator-2";
import ShowcaseCard from "../showcase-card";

export const Decorators = () => (
  <ShowcaseCard title="Decorators">
    <Grid />
    <Decorator1 />
    <Decorator2 />
  </ShowcaseCard>
);

export default Decorators;
