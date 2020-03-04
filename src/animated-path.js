import React, { useState, useRef, memo } from "react";
import Animated, {
  set,
  timing,
  Value,
  Clock,
  Easing,
  block,
  cond,
  call,
  useCode,
  clockRunning,
  startClock,
  stopClock,
} from "react-native-reanimated";
import { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";

const RNAnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * @typedef {object} _AnimatedPathProps
 * @property {boolean} [animate] Default id `false`
 * @property {number} [animationDuration] Default is `300`
 */

/**
 * @typedef {import("react-native-svg").PathProps & _AnimatedPathProps} AnimatedPathProps
 */
const AnimatedPath = memo(
  ({ d, animationDuration = 300, animate = false, ...props }) => {
    const isMount = useRef(false);
    const [newD, setNewD] = useState(d);

    const clock = useRef(new Clock());
    const value = new Value(0);
    const dest = useRef(new Value(1));

    const state = useRef({
      finished: new Value(0),
      position: value,
      time: new Value(0),
      frameTime: new Value(0),
    }).current;

    const config = {
      duration: animationDuration,
      toValue: dest.current,
      easing: Easing.out(Easing.quad),
    };

    const _interpolate = interpolatePath(newD, d);

    useCode(() => {
      const code =
        animate &&
        isMount.current &&
        block([
          cond(clockRunning(clock.current), 0, [
            // If the clock isn't running we reset all the animation params and start the clock
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest.current),
            startClock(clock.current),
          ]),
          // we run the step here that is going to update position
          timing(clock.current, state, config),
          // if the animation is over we stop the clock
          cond(
            state.finished,
            stopClock(clock.current),
            call([state.position], p => {
              setNewD(_interpolate(p));
            }),
          ),
        ]);

      if (!animate) {
        setNewD(_interpolate(1));
      }
      isMount.current = true;
      return code;
    }, [d]);
    // const _d = interpolate(d, oldD.current);
    return (
      <>
        <RNAnimatedPath
          d={newD}
          // d={bInterpolatePath(progress, rhino, elephant)}
          {...props}
        />
      </>
    );
  },
);

AnimatedPath.defaultProps = {};

export default AnimatedPath;

export function runTiming(clock, value, dest, callback) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 300,
    toValue: dest,
    easing: Easing.out(Easing.quad),
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, callback),
    // we made the block return the updated position
    state.position,
  ]);
}
