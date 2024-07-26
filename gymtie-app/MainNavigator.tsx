import React, { useEffect } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeComponent from "./tabs/home";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import SettingsComponent from "./tabs/settings";
import MembersComponent from "./tabs/members";
import PaymentsComponent from "./tabs/payments";

const BottomTab = createBottomTabNavigator();

const MainNavigator = ({ navigation }: any) => {
  const isAuthenticated = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
    }
  }, [isAuthenticated, navigation]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#fafafa",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor: "#ffffff",
          position: "absolute",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 0,
          marginBottom: 5,
          color: "#2b2b2b",
          fontWeight: "bold",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        children={(props) => <HomeComponent {...props} />}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="home" size={24} color={"#2b2b2b"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Members"
        children={(props) => <MembersComponent {...props} />}
        options={{
          tabBarLabel: "Members",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="people" size={24} color={"#2b2b2b"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Payments"
        children={(props) => <PaymentsComponent {...props} />}
        options={{
          tabBarLabel: "Payments",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="wallet" size={24} color={"#2b2b2b"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsComponent}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="settings" size={24} color={"#2b2b2b"} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
