import React, { useState } from "react";
import StorybookArray from "./stories";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default () => {
  const [selectedStory, setSelectedStory] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {StorybookArray.map(({ title }, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.menuItem,
                selectedStory === index && styles.menuItemSelected,
              ]}
              onPress={() => {
                setSelectedStory(index);
              }}
            >
              <Text>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.screenContainer}>
        <ScrollView>
          {StorybookArray.map(({ component: Story }, index) => {
            return selectedStory === index && <Story />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  menuContainer: {
    width: 100,
    height: "%100",
    justifyContent: "space-around",
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemSelected: {
    backgroundColor: "#ddd",
  },
  screenContainer: {
    flex: 1,
  },
});
