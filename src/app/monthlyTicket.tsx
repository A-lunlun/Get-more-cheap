import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

type Summary = {
  startDate: string;
  endDate: string;
  holidayCount: number;
};

export default function MonthlyTicket() {
  const [selectedDate, setSelectedDate] = useState("");
  const [markHoliday, setMarkHoliday] = useState({});
  const [summary, setSummary] = useState<Summary | undefined>(undefined);
  const [ticketPrice, setTicketPrice] = useState("");
  const [monthlyTicketPrice, setMonthlyTicketPrice] = useState("1200");
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  useFocusEffect(
    useCallback(() => {
      setSelectedDate("");
      setMarkHoliday({});
      setSummary(undefined);
      setTicketPrice("");
    }, [])
  );

  const setMark = useCallback(() => {
    setMarkHoliday({});
    if (!selectedDate) return;

    let markedDates: Record<string, any> = {};
    let endDate = "";
    let holidayCount = 0;

    for (let i = 0; i < 30; i++) {
      const cloneSelectedDate = new Date(selectedDate);
      const newDate = new Date(
        cloneSelectedDate.setDate(cloneSelectedDate.getDate() + i)
      );
      const day = newDate.getDay();

      const isoDate = newDate.toISOString().split("T")[0];
      if (day === 0 || day === 6) {
        holidayCount++;
        markedDates[isoDate] = {
          startingDay: i === 0,
          endingDay: i === 29,
          color: "#FF6B6B",
          textColor: "white",
          dotColor: "#FF3838",
          marked: true,
        };
      } else {
        markedDates[isoDate] = {
          startingDay: i === 0,
          endingDay: i === 29,
          color: "#4ECDC4",
          textColor: "white",
        };
      }
      if (i === 29) endDate = isoDate;
    }
    setMarkHoliday((current) => {
      return { ...current, ...markedDates };
    });
    setSummary({
      startDate: selectedDate,
      endDate,
      holidayCount,
    });
  }, [selectedDate]);

  useEffect(() => {
    setMark();
  }, [selectedDate, setMark]);

  const resetAll = () => {
    Alert.alert("重新開始", "確定要清除所有資料嗎？", [
      { text: "取消", style: "cancel" },
      {
        text: "確定",
        onPress: () => {
          setSelectedDate("");
          setMarkHoliday({});
          setSummary(undefined);
          setTicketPrice("");
        },
      },
    ]);
  };

  const calculateResult = () => {
    if (!ticketPrice || !summary?.holidayCount) return null;

    const workingDays = 30 - summary.holidayCount;
    const totalCost = Number(ticketPrice) * 2 * workingDays;
    const monthlyPrice = Number(monthlyTicketPrice);
    const savings = totalCost - monthlyPrice;

    return {
      workingDays,
      totalCost,
      monthlyPrice,
      savings,
      isWorthIt: savings > 0,
    };
  };

  const result = calculateResult();

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>月票計算器</Text>
        <Text style={styles.subtitle}>輕鬆計算月票是否划算</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>票價設定</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>單程票價 (元)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTicketPrice}
              value={ticketPrice}
              placeholder="請輸入單程票價"
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>月票價格 (元)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMonthlyTicketPrice}
              value={monthlyTicketPrice}
              placeholder="1200"
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          選擇啟用日期
        </Text>
        <Text style={styles.instructionText}>
          點擊日期開始計算30天的使用期間
        </Text>

        {summary && summary.startDate && (
          <View style={styles.dateInfoContainer}>
            <Text style={styles.dateRange}>
              使用期間：{summary.startDate} ~ {summary.endDate}
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{summary.holidayCount}</Text>
                <Text style={styles.statLabel}>假日天數</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {30 - summary.holidayCount}
                </Text>
                <Text style={styles.statLabel}>工作天數</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.calendarContainer}>
          <Calendar
            minDate={todayString}
            onDayPress={(e) => {
              setSelectedDate(e.dateString);
            }}
            markingType={"period"}
            markedDates={markHoliday}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#4ECDC4",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#4ECDC4",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#4ECDC4",
              selectedDotColor: "#ffffff",
              arrowColor: "#4ECDC4",
              monthTextColor: "#2d4150",
              indicatorColor: "#4ECDC4",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13,
            }}
          />
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#4ECDC4" }]}
            />
            <Text style={styles.legendText}>工作日</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]}
            />
            <Text style={styles.legendText}>假日</Text>
          </View>
        </View>
      </View>

      {result && (
        <View style={[styles.card, styles.resultCard]}>
          <Text style={styles.sectionTitle}>計算結果</Text>

          <View style={styles.costBreakdown}>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>工作日通勤成本</Text>
              <Text style={styles.costValue}>
                {result.workingDays} 天 × ${ticketPrice} × 2 = $
                {result.totalCost}
              </Text>
            </View>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>月票價格</Text>
              <Text style={styles.costValue}>${result.monthlyPrice}</Text>
            </View>
          </View>

          <View
            style={[
              styles.resultContainer,
              result.isWorthIt ? styles.profitResult : styles.lossResult,
            ]}
          >
            {result.isWorthIt ? (
              <>
                <Text style={styles.resultIcon}>🎉</Text>
                <Text style={styles.resultTitle}>恭喜！月票很划算</Text>
                <Text style={styles.resultAmount}>
                  省下 ${result.savings} 元
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.resultIcon}>💸</Text>
                <Text style={styles.resultTitle}>月票不太划算</Text>
                <Text style={styles.resultAmount}>
                  多花 ${Math.abs(result.savings)} 元
                </Text>
              </>
            )}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetButtonText}>重新開始</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {/* <MaterialIcons name="info" size={16}/> */}
          提示：計算基於30天期間，假日不搭車的情況
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#4ECDC4",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  card: {
    backgroundColor: "white",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d4150",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  dateInfoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateRange: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d4150",
    textAlign: "center",
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4ECDC4",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  calendarContainer: {
    marginVertical: 16,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  resultCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4ECDC4",
  },
  costBreakdown: {
    marginBottom: 20,
  },
  costItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  costLabel: {
    fontSize: 14,
    color: "#666",
  },
  costValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d4150",
  },
  resultContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  profitResult: {
    backgroundColor: "#e8f5e8",
    borderColor: "#4caf50",
    borderWidth: 1,
  },
  lossResult: {
    backgroundColor: "#ffeaea",
    borderColor: "#f44336",
    borderWidth: 1,
  },
  resultIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d4150",
    marginBottom: 4,
  },
  resultAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4ECDC4",
  },
  resetButton: {
    backgroundColor: "#FF6B6B",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    // alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    borderWidth: 1
  },
});
