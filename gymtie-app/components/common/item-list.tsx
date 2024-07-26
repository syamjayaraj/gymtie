import { Box, HStack, Spacer, Spinner, Text, VStack, View } from "native-base";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import ItemComponent from "../item";
import ItemBusTimingComponent from "../item-bus-timing";

interface customProps {
  loading: boolean;
  data: any;
  onClick: (categoryId: string) => void;
  props: any;
  handleLoadMore: () => Promise<void>;
  handleLoadOld: () => Promise<void>;
}

export default function ItemList({
  loading,
  data,
  onClick,
  props,
  handleLoadMore,
  handleLoadOld,
}: customProps) {
  const type = props?.route?.params?.type;
  const typeCategory = props?.route?.params?.typeCategory;
  const mainProp = props?.route?.params?.main;

  return (
    <View>
      <FlatList
        initialNumToRender={20}
        data={data}
        keyExtractor={(item: any) => item?.id?.toString()}
        onStartReached={handleLoadOld}
        onEndReached={handleLoadMore}
        showDefaultLoadingIndicators={true}
        onStartReachedThreshold={10}
        onEndReachedThreshold={10}
        activityIndicatorColor={"#2b2b2b"}
        HeaderLoadingIndicator={() =>
          loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
        }
        FooterLoadingIndicator={() =>
          loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
        }
        enableAutoscrollToTop={false}
        renderItem={({ item, index }) => (
          <ItemComponent
            item={item}
            props={props}
            mainProp={mainProp}
            type={type}
            typeCategory={typeCategory}
            index={index}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
    marginBottom: 100,
  },
  item: {
    marginBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  parambath: {
    fontSize: 8,
  },
});
