import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import Contact from "./contact";
import About from "./about";
import Terms from "./terms";

const Stack = createStackNavigator();

function SettingsComponent() {
  function OtherTitle(props: any) {
    return <Text style={styles.subTitle}>{props.name}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
          elevation: 1,
        },
        headerTintColor: "#2b2b2b",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Landing}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "Settings" }} />,
        }}
      />

      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "Contact" }} />,
        }}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#2b2b2b",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2b2b2b",
    marginLeft: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsComponent;
