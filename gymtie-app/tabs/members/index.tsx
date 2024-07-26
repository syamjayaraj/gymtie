import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import MemberDetailsComponent from "./member-details";
import PageTitle from "../../components/title/page-title";

const Stack = createStackNavigator();

function MembersComponent(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
          elevation: 1,
          borderWidth: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#2b2b2b",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Members"
        component={Landing}
        options={{
          headerShown: true,
          headerTitle: (props: any) => <PageTitle title="Members" />,
        }}
      />
      <Stack.Screen
        name="MemberDetails"
        component={MemberDetailsComponent}
        options={{
          headerShown: true,
          headerTitle: (props: any) => <PageTitle title="MemberDetails" />,
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}

export default MembersComponent;
