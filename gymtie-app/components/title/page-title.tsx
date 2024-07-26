import { StyleSheet, Text } from "react-native";

const PageTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2b2b2b",
  },
});
export default PageTitle;
