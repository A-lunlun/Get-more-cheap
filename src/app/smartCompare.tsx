import { filter, findIndex, minBy } from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CompareSection from "../components/compareSection";

export default function SomeThingCompare() {
  // const [inputs, setInputs ] = useState([{value: ''}])
  const [inputs, setInputs] = useState([
    { amount: "", price: "", pricePerUnit: "" },
    { amount: "", price: "", pricePerUnit: "" },
  ]);

  const handlePricesInput = (
    inputValue: string,
    index: number,
    key: "amount" | "price"
  ) => {
    // console.log("input value =>", inputValue);
    setInputs((current) => {
      const currentArray = [...current];
      // console.log("currentArray ", currentArray);
      const indexV = currentArray[index];
      indexV[key] = inputValue;
      if (indexV.amount && indexV.price) {
        indexV.pricePerUnit = calculatePricePerUnit(
          indexV.amount,
          indexV.price
        );
      } else {
        indexV.pricePerUnit = "";
      }
      return currentArray;
    });
  };

  const calculatePricePerUnit = (amount: string, price: string) => {
    return (Number(amount) / Number(price)).toFixed(2).toString();
  };

  const compare = () => {
    const max = minBy(inputs, (o: any) => o.pricePerUnit);
    return findIndex(inputs, max);
  };

  const check = () => {
    const match = filter(inputs, (item) => {
      return item.pricePerUnit;
    });
    return match.length > 1;
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.rootContainer}>
      <View>
        {inputs.map((item, index) => (
          <View key={index} style={styles.compareSectionContainer}>
            <CompareSection
              inputs={inputs}
          index={index}
              inputEvent={handlePricesInput}
            />
          </View>
        ))}
      </View>
      {check() && (
        <View>
          <Text>推薦結果 {String.fromCharCode(compare() + 65)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  compareSectionContainer: {
    marginBottom: 16,
  },
});
