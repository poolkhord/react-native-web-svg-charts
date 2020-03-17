import { useMemo } from "react";
import { StyleSheet } from "react-native";

const memorizedStyles = {};

/**
 * @param {import("react-native").ViewStyle & import("react-native").TextStyle} styles
 */
export function useInlineStyle(styles) {
  return useMemo(() => {
    const stylesKey = convertStyleToAKey(styles);
    if (memorizedStyles[stylesKey]) {
      return memorizedStyles[stylesKey];
    }
    memorizedStyles[stylesKey] = StyleSheet.create({
      a: styles,
    }).a;

    return memorizedStyles[stylesKey];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(styles));
}

function convertStyleToAKey(obj) {
  const objSorted = Object.keys(obj)
    .sort()
    .reduce((previous, key) => {
      previous[key] = obj[key];
      return previous;
    }, {});

  const str = JSON.stringify(objSorted);
  return str.replace(/({|}|,|"|:)/g, "");
}
