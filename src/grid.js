import React, { memo } from "react";
import { G, Line } from "react-native-svg";

/**
 * @typedef {object} HorizontalLinesProps
 * @property {import("react-native-svg").LineProps} svg
 * @property {(number) => number} y
 * @property {number[]} ticks
 */

/**
 * @type {React.FC<HorizontalLinesProps>}
 */
const Horizontal = memo(({ ticks = [], y, svg }) => {
  return (
    <G>
      {ticks.map(tick => (
        <Line
          key={tick}
          x1={"0%"}
          x2={"100%"}
          y1={y(tick)}
          y2={y(tick)}
          strokeWidth={1}
          stroke={"rgba(0,0,0,0.2)"}
          {...svg}
        />
      ))}
    </G>
  );
});

/**
 * @typedef {object} VerticalLinesProps
 * @property {import("react-native-svg").LineProps} svg
 * @property {(number) => number} x
 * @property {number[]} ticksX
 */

/**
 * @type {React.FC<VerticalLinesProps>}
 */
const Vertical = ({ ticksX = [], x, svg }) => {
  return (
    <G>
      {ticksX.map((tick, index) => (
        <Line
          key={index}
          y1={"0%"}
          y2={"100%"}
          x1={x(tick)}
          x2={x(tick)}
          strokeWidth={1}
          stroke={"rgba(0,0,0,0.2)"}
          {...svg}
        />
      ))}
    </G>
  );
};

/**
 * @type {React.FC<VerticalLinesProps & HorizontalLinesProps>}
 */
const Both = props => {
  return (
    <G>
      <Horizontal {...props} />
      <Vertical {...props} />
    </G>
  );
};

const Direction = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
  BOTH: "BOTH",
};

/**
 * @typedef {object} _GridProps
 * @property {(keyof Direction)} [direction] default `HORIZONTAL`
 * @property {boolean} [belowChart] default true
 */

/**
 * @typedef {VerticalLinesProps & HorizontalLinesProps & _GridProps} GridProps
 */

/**
 * @type {React.FC<GridProps>}
 */
const Grid = memo(
  ({ direction = Direction.HORIZONTAL, belowChart = true, ...props }) => {
    if (direction === Direction.VERTICAL) {
      return <Vertical belowChart={belowChart} {...props} />;
    } else if (direction === Direction.HORIZONTAL) {
      return <Horizontal belowChart={belowChart} {...props} />;
    } else if (direction === Direction.BOTH) {
      return <Both belowChart={belowChart} {...props} />;
    }

    return null;
  },
);

Grid.Direction = Direction;

export default Grid;
