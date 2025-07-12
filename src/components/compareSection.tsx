import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export default function CompareSection({ inputs, index, inputEvent }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.firstText}>{String.fromCharCode(65 + index)}</Text>
      <View style={[styles.inputSection]}>
        <View style={[styles.inputContainer, styles.priceContainer]}>
          <Text style={styles.title}>Price</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={(amount) => inputEvent(amount, index, "amount")}
            value={inputs[index].amount}
            keyboardType={
              Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
            }
            // textAlign="right"
            placeholder="0"
          >
          </TextInput>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={styles.title}>Quantity</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={(price) => inputEvent(price, index, "price")}
            value={inputs[index].price}
            keyboardType={
              Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
            }
            // textAlign="right"
            placeholder="0"
          />
        </View>

        {/* <Text style={[styles.col3, styles.text_center]}>
          {inputs[index].amount} / {inputs[index].price}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#6C6C6C",
  },
  inputSection: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  priceContainer: {
    marginBottom: 16,
  },
  firstText: {
    marginRight: 24,
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    color: '#4F4F4F'
  },
  input: {
    borderWidth: 1,
    borderColor: "#6C6C6C",
    borderRadius: 6,
    height: 36,
    width: '60%',
    padding: 0,
    paddingLeft: 5,
    margin: 0,
  },
  text_center: {
    textAlign: "center",
  },
  justify_center: {
    justifyContent: "center",
  },
  justify_between: {
    justifyContent: "space-between",
  },
  align_center: {
    alignItems: "center",
  },
  test: {
    borderWidth: 1,
  },
});
