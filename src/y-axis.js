import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Svg, G, Text as SVGText } from "react-native-svg";
import * as d3Scale from "d3-scale";
import * as array from "d3-array";
import { useLayout } from "./hooks/layout";
import { useInlineStyle } from "./hooks";

/**
 * @typedef {object} YAxisProps
 * @property {number} [spacingOuter] Spacing outside of the labels. Only
 * applicable if `scale=d3Scale.scaleBand` and should then be equal to
 * `spacingOuter` prop on the actual BarChart Default is `0.05`
 *
 * @property {number} [spacingInner] Spacing between the labels. Only applicable
 * if `scale=d3Scale.scaleBand` and should then be equal to `spacingInner` prop
 * on the actual BarChart Default is `0.05`
 *
 * @property {d3Scale.scaleLinear} [scale] Should be the same as passed into the
 * charts `yScale`, _or_ d3Scale.scaleBand if used in conjunction with a
 * horizontal BarChart Default is `d3Scale.scaleLinear`
 *
 * @property {() => any} [yAccessor]
 * @property {number} [max] Used to sync layout with chart (if gridMax is used
 * there)
 *
 * @property {number} [min] Used to sync layout with chart (if gridMin is used
 * there)
 *
 * @property {{ top: number; bottom: number }} [contentInset] Used to sync
 * layout with chart (if same prop used there) Default is { top: 0, bottom: 0 }
 *
 * @property {() => any} [formatLabel] A utility function to format the text
 * before it is displayed, e.g `value => "\$" + value Default is `value =>
 * value`
 *
 * @property {number} [numberOfTicks] Default is `10`
 * @property {import("react-native").ViewStyle} [style]
 * @property {import("react-native-svg").TextProps} [svg]
 * @property {number[] | {}[]} [data]
 */

/**
 * @type {React.FC<YAxisProps & import("react-native-svg").TextProps>}
 */
const YAxis = memo(
  ({
    contentInset: { top = 0, bottom = 0 } = {},
    style,
    data,
    children,
    numberOfTicks = 10,
    spacingInner = 0.05,
    spacingOuter = 0.05,
    scale = d3Scale.scaleLinear,
    formatLabel = value => value && value.toString(),
    yAccessor = ({ item }) => item,
    min,
    max,
    ...svg
  }) => {
    const { width, height, onLayout } = useLayout();

    const getY = domain => {
      const y = scale()
        .domain(domain)
        .range([height - bottom, top]);

      if (scale === d3Scale.scaleBand) {
        // use index as domain identifier instead of value since
        // same value can occur at several places in dataPoints
        y
          // set range top to bottom - we are not sorting on values in scaleBand
          .range([top, height - bottom])
          .paddingInner([spacingInner])
          .paddingOuter([spacingOuter]);

        //add half a bar to center label
        return value => y(value) + y.bandwidth() / 2;
      }

      return y;
    };

    const values = data.map((item, index) => yAccessor({ item, index }));

    const extent = array.extent(values);

    min = min ?? extent[0];
    max = max ?? extent[1];

    const domain = scale === d3Scale.scaleBand ? values : [min, max];

    //invert range to support svg coordinate system
    const y = getY(domain);

    const ticks = scale === d3Scale.scaleBand ? values : y.ticks(numberOfTicks);

    const longestValue = ticks
      .map((value, index) => formatLabel(value, index))
      .reduce(
        (prev, curr) =>
          prev.toString().length > curr.toString().length ? prev : curr,
        0,
      );

    const extraProps = {
      y,
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
      <View style={style}>
        <View style={styles.container} onLayout={onLayout}>
          {/*invisible text to allow for parent resizing*/}
          <Text style={invisibleTextStyle}>{longestValue}</Text>
          {height > 0 && width > 0 && (
            <Svg style={[styles.svg, svgStyle]}>
              <G>
                {React.Children.map(children, child => {
                  return React.cloneElement(child, extraProps);
                })}
                {// don't render labels if width isn't measured yet,
                // causes rendering issues
                height > 0 &&
                  ticks.map((value, index) => {
                    return (
                      <SVGText
                        originY={y(value)}
                        textAnchor={"middle"}
                        x={"50%"}
                        alignmentBaseline={"middle"}
                        {...svg}
                        key={y(value)}
                        y={y(value)}
                      >
                        {formatLabel(value, index, ticks.length)}
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

export default YAxis;
