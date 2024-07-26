import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Share,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  Text,
  Box,
  ScrollView,
  HStack,
  VStack,
  Spacer,
  FlatList,
  AlertDialog,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import appJson from "../../app.json";
import { fetchContent } from "../../apiService";
import { useDispatch } from "react-redux";
import { clearToken } from "../../reducers/authReducer";

export default function Landing(props: any) {
  const [logoutConfirmOpen, setLogoutConfirm] = React.useState(false);

  const onClose = () => setLogoutConfirm(false);
  const dispatch = useDispatch();

  const listData = [
    {
      id: 2,
      title: "Contact",
      page: "Contact",
      icon: <Ionicons name="call-outline" size={24} color="#2b2b2b" />,
    },
    {
      id: 3,
      title: "App Info",
      page: "AppInfo",
      icon: (
        <Ionicons name="information-circle-outline" size={24} color="#2b2b2b" />
      ),
    },
    {
      id: 5,
      title: "Terms and Conditions",
      page: "Terms",
      icon: <Ionicons name="documents-outline" size={24} color="#2b2b2b" />,
    },
  ];

  const cancelRef = React.useRef(null);

  const logoutUser = () => {
    dispatch(clearToken());
    props?.navigation.replace("Auth");
  };

  return (
    <Box bg={"white"} pt={5} padding={3}>
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Box style={styles.list}>
            <FlatList
              data={listData}
              renderItem={({ item }) => (
                <Box
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={[0, 3]} justifyContent="space-between">
                    {item?.icon}
                    <VStack>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate(item?.page)}
                      >
                        <Text style={{ marginLeft: 10 }}>{item?.title}</Text>
                      </TouchableOpacity>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              )}
              keyExtractor={(item: any) => item?.id}
            />

            <Box
              _dark={{
                borderColor: "muted.50",
              }}
              borderColor="muted.800"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
            >
              <HStack space={[0, 3]} justifyContent="space-between">
                <Ionicons name="log-out-outline" size={24} color="#2b2b2b" />
                <VStack>
                  <TouchableOpacity
                    onPress={() => setLogoutConfirm(!logoutConfirmOpen)}
                  >
                    <Text style={{ marginLeft: 10 }}>Logout</Text>
                  </TouchableOpacity>
                </VStack>
                <Spacer />
              </HStack>

              <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={logoutConfirmOpen}
                onClose={onClose}
                width={240}
                marginLeft={"19%"}
              >
                <AlertDialog.Content>
                  <AlertDialog.Body>
                    <Button.Group>
                      <Button
                        variant="unstyled"
                        colorScheme="coolGray"
                        onPress={onClose}
                        ref={cancelRef}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="link"
                        colorScheme={"secondary"}
                        onPress={logoutUser}
                      >
                        Logout
                      </Button>
                    </Button.Group>
                  </AlertDialog.Body>
                </AlertDialog.Content>
              </AlertDialog>
            </Box>
          </Box>

          <Text
            style={{
              marginTop: 30,
              marginBottom: 50,
              textAlign: "center",
              fontSize: 15,
              color: "#b0b0b0",
            }}
          >
            Version {appJson?.expo?.version}
          </Text>
        </View>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#2b2b2b",
  },
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 0,
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 21,
  },
  owner: {
    fontSize: 13,
    color: "#1f1f1f",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    flex: 3,
    flexWrap: "wrap",
  },
  menuCard: {
    borderWidth: 0,
    borderColor: "red",
    width: "48%",
    height: 80,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 0.2,
    padding: 6,
    borderRadius: 0.5,
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
  icon: {
    fontSize: 19,
  },
  menuCardText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
});
