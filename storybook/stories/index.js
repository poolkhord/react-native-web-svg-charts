import React from "react";
import AreaChart from "./area-chart";
import AreaStack from "./area-stack";
import BarChart from "./bar-chart";
import BarStack from "./bar-stack";
import LineChart from "./line-chart";
import PieChart from "./pie-chart";
import ProgressChart from "./progress-circle";
import XAxis from "./x-axis";
import YAxis from "./y-axis";
import Decorators from "./decorators";
import Others from "./others";
import { ScrollView } from "react-native";

export default () => {
  return (
    <ScrollView>
      <AreaChart />
      <AreaStack />
      <BarChart />
      <BarStack />
      <LineChart />
      <PieChart />
      <ProgressChart />
      <XAxis />
      <YAxis />
      <Decorators />
      <Others />
    </ScrollView>
  );
};
