import { StyleSheet, Text, View } from "react-native";

type Summary = {
  startDate: string;
  endDate: string;
  holidayCount: number;
};

export default function Index() {
  return (
    <View style={styles.rootContainer}>
      <Text>App 資訊</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
  },
});
