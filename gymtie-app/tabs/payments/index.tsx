import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import PageTitle from "../../components/title/page-title";

const Stack = createStackNavigator();

const PaymentsComponent = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Payments"
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
        name="Payments"
        component={Landing}
        options={{
          headerShown: false,
          headerTitle: (props: any) => <PageTitle title="Payments" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default PaymentsComponent;
