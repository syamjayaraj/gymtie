import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthScreen from "./screens/AuthScreen";
import { NativeBaseProvider } from "native-base";
import MainNavigator from "./MainNavigator";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./apollo-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const Stack = createStackNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  // Default apollo-graphql URL
  const [client, setClient] = useState(
    createApolloClient("http://192.168.18.131:1337/graphql")
  );

  // Setting the apollo-graphql URL with respect to change in client
  useEffect(() => {
    const checkClient = async () => {
      const client: any = await AsyncStorage.getItem("client");
      const clientParsed = JSON.parse(client);
      console.log(clientParsed, "client");
      setClient(createApolloClient("http://192.168.18.131:1337/graphql"));
    };
    checkClient();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar style="dark" backgroundColor="white" />
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </ApolloProvider>
  );
};
export default App;
