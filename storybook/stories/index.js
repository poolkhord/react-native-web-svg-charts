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

export default [
  { title: "Area Chart", component: AreaChart },
  { title: "Area Stack", component: AreaStack },
  { title: "Bar Chart", component: BarChart },
  { title: "Bar Stack", component: BarStack },
  { title: "Line Chart", component: LineChart },
  { title: "Pie Chart", component: PieChart },
  { title: "Progress Chart", component: ProgressChart },
  { title: "X Axis", component: XAxis },
  { title: "Y Axis", component: YAxis },
  { title: "Decorators", component: Decorators },
  { title: "Others", component: Others },
];
