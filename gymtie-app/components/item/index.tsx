import { Ionicons } from "@expo/vector-icons";
import { Avatar, Box, HStack, Spacer, Text, VStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import callToTheNumber from "../../utils/call-to-number";
import React from "react";
import generateImageUrl from "../../utils/generate-image-url";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ItemComponent = React.memo(({ item, index }: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation?.navigate("MemberDetails", { id: item?.id })}
      style={styles.item}
      key={index}
    >
      <Box>
        <HStack space={[3, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: generateImageUrl(
                item?.attributes?.image?.data?.attributes?.url
              ),
            }}
          />
          <VStack>
            <HStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.200",
                }}
                fontSize={14}
                marginTop={0.4}
                marginRight={1}
              >
                {item?.attributes?.memberId}
              </Text>
              <Text bold>{item?.attributes?.name}</Text>
            </HStack>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontSize={12}
              marginTop={0.5}
            >
              {moment(item?.attributes?.joiningDate).format("Do MMMM YYYY")}
            </Text>
          </VStack>
          <Spacer />
          <TouchableOpacity
            onPress={() => callToTheNumber(item?.attributes?.phoneNumber, true)}
          >
            <Ionicons name="arrow-forward" size={20} color="#2b2b2b" />
          </TouchableOpacity>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
});

export default ItemComponent;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
});
