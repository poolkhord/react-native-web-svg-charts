import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Svg from "react-native-svg";

export const Chart = memo(({ style, children, width, height, onLayout }) => {
  return (
    <View style={style}>
      <View style={styles.container} onLayout={onLayout}>
        {height > 0 && width > 0 && (
          <Svg style={{ height, width }}>{children}</Svg>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
