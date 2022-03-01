import { useState } from "react";

/**
 * @returns {{
  width: number;
  height: number;
  onLayout: () => void;
}}
 */
export function useLayout() {
  const onLayout = event => {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event;
    setLayout({ height, width });
  };

  const [{ width, height }, setLayout] = useState({
    width: 0,
    height: 0,
  });

  return {
    width,
    height,
    onLayout,
  };
}
