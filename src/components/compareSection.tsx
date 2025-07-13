import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

interface CompareSectionProps {
  inputs: {
    amount: string;
    price: string;
    pricePerUnit: number | null;
  }[];
  index: number;
  inputEvent: (value: string, index: number, key: "amount" | "price") => void;
}

export default function CompareSection({ inputs, index, inputEvent }: CompareSectionProps) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.firstText}>{String.fromCharCode(65 + index)}</Text>
      <View style={styles.inputSection}>
        <View style={[styles.inputContainer, styles.priceContainer]}>
          <Text style={styles.title}>價格</Text>
          <TextInput
            style={styles.input}
            onChangeText={(price) => inputEvent(price, index, "price")}
            value={inputs[index].price}
            keyboardType={Platform.OS === "ios" ? "numeric" : "numeric"}
            placeholder="0"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>數量</Text>
          <TextInput
            style={styles.input}
            onChangeText={(amount) => inputEvent(amount, index, "amount")}
            value={inputs[index].amount}
            keyboardType={Platform.OS === "ios" ? "numeric" : "numeric"}
            placeholder="0"
            placeholderTextColor="#999"
          />
        </View>
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
    backgroundColor: '#FAFAFA',
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
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#4F4F4F',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: "#6C6C6C",
    borderRadius: 6,
    // height: 40,
    width: '60%',
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
});