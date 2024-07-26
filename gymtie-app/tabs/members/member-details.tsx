import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Box, Text, ScrollView, Avatar, Center, Heading } from "native-base";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import generateImageUrl from "../../utils/generate-image-url";
import PaymentListComponent from "../../components/payment/payment-list";
import AddPaymentComponent from "../../components/payment/add-payment";

const GET_MEMBER_DETAILS = gql`
  query GetMember($id: ID!) {
    member(id: $id) {
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
          payments {
            data {
              id
              attributes {
                amount
                date
                note
                type
              }
            }
          }
        }
      }
    }
  }
`;

export default function MemberDetailsComponent({ route }: { route: any }) {
  const { id } = route.params;
  const { loading, data, error } = useQuery(GET_MEMBER_DETAILS, {
    variables: { id },
  });

  const member = data?.member?.data?.attributes;

  const handleAddPayment = () => {
    // Add payment logic here
  };

  return (
    <Box bg={"white"} pt={5} flex={1}>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <ScrollView>
            <Box marginLeft={5} marginRight={5}>
              <View style={styles.sectionContainer}>
                <Center>
                  <Avatar
                    size="100px"
                    source={{
                      uri: generateImageUrl(
                        member.image?.data?.attributes?.url
                      ),
                    }}
                  />
                  <Text style={styles.name}>{member.name}</Text>
                  <Text style={styles.memberId}>{member.memberId}</Text>
                  <Text style={styles.joiningDate}>
                    {moment(member?.joiningDate)?.format("Do MMM YYYY")}
                  </Text>
                  <AddPaymentComponent handleAddPayment={handleAddPayment} />
                </Center>
              </View>
              <View style={styles.sectionContainer}>
                <Center>
                  <Heading fontSize={20} marginBottom={5}>
                    Payment History
                  </Heading>
                </Center>
                <FlatList
                  data={member?.payments?.data}
                  renderItem={({ item, index }) => (
                    <PaymentListComponent item={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.container}
                />
              </View>
            </Box>
          </ScrollView>
        )}
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 0,
  },
  sectionContainer: {
    marginBottom: 0,
    marginTop: 10,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 6,
  },
  memberId: {
    fontSize: 16,
    marginBottom: 5,
  },
  joiningDate: {
    fontSize: 16,
    marginBottom: 20,
  },
});
