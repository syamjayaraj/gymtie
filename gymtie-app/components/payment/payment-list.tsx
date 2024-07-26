import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Spacer, Text, VStack } from "native-base";
import { StyleSheet, View } from "react-native";
import React from "react";
import moment from "moment";

const PaymentListComponent = React.memo(({ item, index }: any) => {
  return (
    <View style={styles.item}>
      <Box>
        <HStack space={[3, 3]} justifyContent="space-between">
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(item?.attributes?.date).format("DD")}
            </Text>
            <Text style={styles.month}>
              {moment(item?.attributes?.date).format("MMM")?.toUpperCase()}
            </Text>
            <Text style={styles.year}>
              {moment(item?.attributes?.date).format("YYYY")?.toUpperCase()}
            </Text>
          </View>
          <VStack>
            <View
              style={{
                borderRadius: 3,
                width: 50,
                backgroundColor:
                  item.attributes.type === "upi"
                    ? "#6932a8"
                    : item.attributes.type === "cash"
                    ? "#c2b027"
                    : item.attributes.type === "card"
                    ? "#a83267"
                    : "",
              }}
            >
              <Text style={styles.type}>{item.attributes.type}</Text>
            </View>
            <Text bold fontSize={20}>
              ₹{item.attributes.amount}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontSize={12}
            >
              {item.attributes.note}
            </Text>
          </VStack>
          <Spacer />
          <Ionicons
            style={styles.categoryMoreIcon}
            name="arrow-forward-outline"
          />
        </HStack>
      </Box>
    </View>
  );
});

export default PaymentListComponent;

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: "#2b2b2b",
    borderRadius: 5,
    paddingTop: 12,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "center",
  },
  month: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  date: {
    fontSize: 10,
    marginTop: -5,
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
  },
  year: {
    fontSize: 10,
    marginTop: -5,
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
  },
  typeContainer: {
    borderRadius: 3,
    width: 50,
  },
  type: {
    color: "white",
    textAlign: "center",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 20,
    // marginBottom: 50,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  categoryMoreIcon: {
    fontSize: 17,
  },
});
