import { AppRegistry, I18nManager, View } from "react-native";
I18nManager.forceRTL(false);
import React, { Suspense, lazy, Profiler } from "react";
const Storybook = lazy(() => import("../../storybook"));

////  end #1
const App = () => {
  return (
    <Suspense fallback={<View />}>
      <Profiler
        id={"profilerStory"}
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
          interactions,
        ) => {
          // console.table({
          //   id,
          //   phase,
          //   actualDuration,
          //   baseDuration,
          //   startTime,
          //   commitTime,
          //   interactions,
          // });
        }}
      >
        <Storybook onSelect={arg => console.log("action1", arg)} />
      </Profiler>
      {/* <JalaliCalendar onSelect={arg => console.log("action2", arg)} /> */}
    </Suspense>
  );
};

AppRegistry.registerComponent("examples-web", () => App);
AppRegistry.runApplication("examples-web", {
  rootTag: document.getElementById("root"),
});
