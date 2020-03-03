import React from "react";
import { SafeAreaView, View, Text } from "react-native";

const ShowcaseCard = ({ children, title }) => (
  <SafeAreaView>
    <View
      style={{
        margin: 16,
        paddingHorizontal: 16,
        backgroundColor: "white",
        shadowOffset: {
          height: 2,
          width: 2,
        },
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.5,
      }}
    >
      <Text>{title}</Text>
      {children}
    </View>
  </SafeAreaView>
);

export default ShowcaseCard;
