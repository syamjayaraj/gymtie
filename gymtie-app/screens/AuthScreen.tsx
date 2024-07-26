import React, { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Heading,
  Input,
  Center,
  Text,
  Select,
  HStack,
  Button,
  View,
  Avatar,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { clearClient, setClient, setToken } from "../reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import axios from "axios";
import { apiUrl } from "../config";
import generateImageUrl from "../utils/generate-image-url";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;

const AuthScreen = ({ navigation }: any) => {
  const [gyms, setGyms] = React.useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const client = useSelector((state: any) => state.auth.client);

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: any) => {
      dispatch(setToken(data.login.jwt));
      navigation.replace("Main");
    },
  });

  const handleLogin = async () => {
    login({ variables: { identifier: username, password } });
  };

  useEffect(() => {
    const loadGymList = async () => {
      const gyms: any = await axios.get(`${apiUrl}/gyms?populate=logo`);
      setGyms(gyms?.data?.data);
    };
    loadGymList();
  }, []);

  useEffect(() => {
    const checkTokenAndClient = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(setToken(token));
        navigation.replace("Main");
      } else {
        const client: any = await AsyncStorage.getItem("client");
        const clientParsed = JSON.parse(client);
        dispatch(setClient(clientParsed));
      }
    };
    checkTokenAndClient();
  }, [dispatch, navigation]);

  const handleChangeClient = (param: string) => {
    const selectedGym: any = gyms?.filter(
      (item: any) => item?.attributes?.database === param
    );
    if (selectedGym?.length !== 0) {
      dispatch(setClient(selectedGym[0]));
    }
  };

  const handleClearClient = () => {
    dispatch(clearClient());
  };

  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          textAlign="center"
          mb={5}
        >
          Log In
        </Heading>
        <VStack space={3} mt="5">
          {!client && (
            <Select
              selectedValue={client}
              minWidth="200"
              accessibilityLabel="Choose Gym"
              placeholder="Choose Gym"
              bg="coolGray.100"
              _selectedItem={{
                bg: "coolGray.100",
                endIcon: <Ionicons name="arrow-forward-outline" />,
              }}
              mt={1}
              onValueChange={(itemValue) => handleChangeClient(itemValue)}
            >
              {gyms.map((item: any, index: number) => {
                return (
                  <Select.Item
                    key={"gym" + index}
                    leftIcon={
                      <Avatar
                        size="40px"
                        source={{
                          uri: generateImageUrl(
                            item?.attributes?.logo?.data?.attributes?.url
                          ),
                        }}
                        mt={-2}
                      />
                    }
                    label={item?.attributes?.name}
                    value={item?.attributes?.database}
                  />
                );
              })}
            </Select>
          )}
          {client && (
            <TouchableOpacity onPress={handleClearClient}>
              <Center>
                <Avatar
                  size="48px"
                  source={{
                    uri: generateImageUrl(
                      client?.attributes?.logo?.data?.attributes?.url
                    ),
                  }}
                />
                <HStack>
                  <Text fontSize={17} fontWeight={400} mt={2}>
                    {client?.attributes?.name}
                  </Text>
                  <View
                    style={{
                      marginLeft: 8,
                      marginTop: 14,
                    }}
                  >
                    <Ionicons
                      name="create-outline"
                      size={15}
                      color={"#2b2b2b"}
                    />
                  </View>
                </HStack>
              </Center>
            </TouchableOpacity>
          )}
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            variant="filled"
            bg="coolGray.100"
            borderRadius="5"
            py="3"
            px="4"
            borderWidth="1"
            _input={{ bg: "coolGray.100" }}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            variant="filled"
            bg="coolGray.100"
            borderRadius="5"
            py="3"
            px="4"
            borderWidth="1"
            _input={{ bg: "coolGray.100" }}
          />
          <Button onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
          {error && <Text color="red.500">{error?.message}</Text>}
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2b2b2b",
    color: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AuthScreen;
