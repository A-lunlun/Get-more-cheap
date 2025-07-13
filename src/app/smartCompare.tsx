import { minBy } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CompareSection from "../components/compareSection";

interface CompareItem {
  amount: string;
  price: string;
  pricePerUnit: number | null;
}

export default function SomeThingCompare() {
  const [inputs, setInputs] = useState<CompareItem[]>([
    { amount: "", price: "", pricePerUnit: null },
    { amount: "", price: "", pricePerUnit: null },
  ]);

  const calculatePricePerUnit = useCallback((amount: string, price: string): number | null => {
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    
    if (isNaN(amountNum) || isNaN(priceNum) || amountNum <= 0 || priceNum <= 0) {
      return null;
    }
    
    return priceNum / amountNum;
  }, []);

  const handlePricesInput = useCallback((
    inputValue: string,
    index: number,
    key: "amount" | "price"
  ) => {
    setInputs((current) => {
      const newInputs = [...current];
      newInputs[index] = { ...newInputs[index], [key]: inputValue };
      
      const item = newInputs[index];
      item.pricePerUnit = calculatePricePerUnit(item.amount, item.price);
      
      return newInputs;
    });
  }, [calculatePricePerUnit]);

  // 使用 useMemo 優化計算
  const validItems = useMemo(() => {
    return inputs.filter(item => item.pricePerUnit !== null);
  }, [inputs]);

  const recommendedIndex = useMemo(() => {
    if (validItems.length < 2) return -1;
    
    const cheapest = minBy(inputs, (item) => item.pricePerUnit || Infinity);
    return inputs.findIndex(item => item === cheapest);
  }, [inputs, validItems.length]);

  const hasValidComparison = validItems.length > 1;

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
            {/* 顯示每單位價格 */}
            {/* {item.pricePerUnit !== null && (
              <View style={styles.pricePerUnitContainer}>
                <Text style={styles.pricePerUnitText}>
                  每單位價格: ${item.pricePerUnit.toFixed(2)}
                </Text>
              </View>
            )} */}
          </View>
        ))}
      </View>
      
      {hasValidComparison && recommendedIndex !== -1 && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>
            💡 推薦 {String.fromCharCode(recommendedIndex + 65)} - 每單位價格最便宜
          </Text>
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
  pricePerUnitContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  pricePerUnitText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  recommendationContainer: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
});