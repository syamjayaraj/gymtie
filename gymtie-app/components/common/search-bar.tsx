import { Icon, Input, VStack, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useState } from "react";
import useDebounce from "../../utils/use-debounce";

interface customProps {
  onSearchData: (searchInput: string) => void;
  placeholder: string;
}

export default function SearchBar({ onSearchData, placeholder }: customProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  useDebounce(
    () => {
      onSearchData(searchInput);
    },
    [searchInput],
    800
  );

  const handleSearch = (value: string) => setSearchInput(value);

  return (
    <View style={styles.searchInputContainer}>
      <VStack w="100%" alignSelf="center">
        <Input
          onChangeText={handleSearch}
          placeholder={placeholder}
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    margin: 20,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
