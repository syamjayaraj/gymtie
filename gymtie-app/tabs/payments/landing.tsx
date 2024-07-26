import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { Box, Text, ScrollView, Heading, List } from "native-base";
import { gql, useQuery } from "@apollo/client";
import ItemComponent from "../../components/item";
import SearchBar from "../../components/common/search-bar";

const GET_MEMBERS = gql`
  query {
    members {
      data {
        id
        attributes {
          name
          memberId
          joiningDate
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default function Landing(props: any) {
  const { loading, error, data } = useQuery(GET_MEMBERS);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (param: string) => {
    setSearchText(param);
  };

  return (
    <Box bg={"white"} pt={12}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Payments</Text>
          </View>
          <SearchBar
            onSearchData={handleSearch}
            placeholder="Search Payments"
          />
          {loading && <ActivityIndicator size="large" color="#00ff00" />}
          {!loading && (
            <View style={styles.container}>
              {!loading && data && (
                <FlatList
                  data={data?.members?.data}
                  renderItem={({ item, index }) => (
                    <ItemComponent item={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.container}
                />
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // marginTop: 100,
    marginRight: 0,
    width: 400,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2b2b2b",
    marginLeft: 10,
    paddingTop: 17,
  },
  container: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    flex: 2,
    flexWrap: "wrap",
    padding: 5,
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "49%",
    height: 100,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 0.2,
  },
  iconContainer: {
    backgroundColor: "white",
    // borderRadius: "50%",
    padding: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  label: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
  value: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    padding: 10,
  },
  sectionContent: {
    padding: 10,
  },
  sectionTitle: {
    fontWeight: "normal",
    fontSize: 17,
    marginTop: 20,
  },
});
