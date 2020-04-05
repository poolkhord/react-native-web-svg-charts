import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as d3Scale from "d3-scale";
import * as array from "d3-array";
import Svg, { G, Text as SVGText } from "react-native-svg";
import { useLayout, useInlineStyle } from "./hooks";

/**
 * @typedef {object} XAxisProps
 * @property {number} [spacingOuter] Spacing between the labels. Only applicable
 * if `scale=d3Scale.scaleBand` and should then be equal to `spacingOuter` prop
 * on the actual BarChart Default is `0.05`
 *
 * @property {number} [spacingInner] Spacing between the labels. Only applicable
 * if `scale=d3Scale.scaleBand` and should then be equal to `spacingInner` prop
 * on the actual BarChart Default is `0.05`
 *
 * @property {d3Scale.scaleLinear} [scale] Should be the same as passed into the
 * charts `xScale` Default is `d3Scale.scaleLinear`
 *
 * @property {() => any} [xAccessor] Default is `({index}) => index`
 * @property {number} [max]
 * @property {number} [min]
 * @property {{ left: number; right: number }} [contentInset] Used to sync
 * layout with chart (if same prop used there) Default is { left: 0, right: 0 }
 *
 * @property {() => any} [formatLabel] A utility function to format the text
 * before it is displayed, e.g `value => "day" + value`. Passes back the value
 * provided by the `xAccessor` Default is `value => value`
 *
 * @property {number} [numberOfTicks] Default is `10`
 * @property {import("react-native-svg").TextProps} [svg]
 * @property {(number | {})[]} data An array of values or objects to render on
 * the xAxis. Should preferably have the same length as the chart's dataPoints.
 * If a complex object is used instead of a simple value, a `xAccessor` prop
 * **is required** to calculate the axis' extent. A data object can contain a
 * `svg` property which allows you to override styles on that specific object
 *
 */

/**
 * @type {React.FC<XAxisProps & import("react-native-svg").TextProps>}
 */
const XAxis = memo(
  ({
    contentInset: { left = 0, right = 0 } = {},
    style,
    data,
    numberOfTicks,
    children,
    min,
    max,
    spacingInner = 0.05,
    spacingOuter = 0.05,
    xAccessor = ({ index }) => index,
    scale = d3Scale.scaleLinear,
    formatLabel = value => value,
    ...svg
  }) => {
    const { width, height, onLayout } = useLayout();
    const _getX = domain => {
      const x = scale()
        .domain(domain)
        .range([left, width - right]);

      if (scale === d3Scale.scaleBand) {
        x.paddingInner([spacingInner]).paddingOuter([spacingOuter]);

        //add half a bar to center label
        return value => x(value) + x.bandwidth() / 2;
      }

      return x;
    };

    const values = data.map((item, index) => xAccessor({ item, index }));
    const extent = array.extent(values);
    const domain =
      scale === d3Scale.scaleBand
        ? values
        : [min || extent[0], max || extent[1]];

    const x = _getX(domain);
    const ticks = numberOfTicks ? x.ticks(numberOfTicks) : values;

    const extraProps = {
      x,
      ticks,
      width,
      height,
      formatLabel,
    };

    const invisibleTextStyle = useInlineStyle({
      opacity: 0,
      fontSize: svg.fontSize,
      fontFamily: svg.fontFamily,
      fontWeight: svg.fontWeight,
    });

    const svgStyle = useInlineStyle({
      height,
      width,
    });

    if (data.length === 0) {
      return <View style={style} />;
    }

    return (
      <View {...{ style }}>
        <View style={styles.container} {...{ onLayout }}>
          {/*invisible text to allow for parent resizing*/}
          <Text style={invisibleTextStyle}>{formatLabel(ticks[0], 0)}</Text>
          {height > 0 && width > 0 && (
            <Svg style={[styles.svg, svgStyle]}>
              <G>
                {React.Children.map(children, child => {
                  return React.cloneElement(child, extraProps);
                })}
                {// don't render labels if width isn't measured yet,
                // causes rendering issues
                width > 0 &&
                  ticks.map((value, index) => {
                    const { svg: valueSvg } = data[index] || {};

                    return (
                      <SVGText
                        textAnchor={"middle"}
                        originX={x(value)}
                        alignmentBaseline={"hanging"}
                        {...svg}
                        {...valueSvg}
                        key={index}
                        x={x(value)}
                      >
                        {formatLabel(value, index)}
                      </SVGText>
                    );
                  })}
              </G>
            </Svg>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default XAxis;
