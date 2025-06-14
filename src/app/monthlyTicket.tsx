import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
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
  const today = new Date();
  const todayString = today.toString();
  // console.log('get in')

  useFocusEffect(
    useCallback(() => {
      console.log('focus')
      setSelectedDate('')
      setMarkHoliday({})
      setSummary(undefined)
      setTicketPrice('')
    }, [])
  )

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
      // console.log("loopDate =>", newDate, " i ", i, selected);
      // console.log("day =>", day);

      const isoDate = newDate.toISOString().split("T")[0];
      if (day === 0 || day === 6) {
        holidayCount++;
        markedDates[isoDate] = {
          startingDay: i === 0,
          endingDay: i === 29,
          color: "#ffa500",
          textColor: "white",
          dotColor: "red",
          marked: true,
        };
      } else {
        markedDates[isoDate] = {
          startingDay: i === 0,
          endingDay: i === 29,
          color: "#ffa500",
          textColor: "white",
          // marked: true,
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

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setTicketPrice}
          value={ticketPrice}
          keyboardType={
            Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
          }
        />
      </View>
      <Text>選擇啟用日期</Text>
      {summary && summary.startDate && (
        <View>
          <Text>
            {summary.startDate} - {summary.endDate}
          </Text>
          <Text>六、日假期 {summary.holidayCount} 天</Text>
          <Text>非假日 {30 - summary.holidayCount} 天</Text>
        </View>
      )}
      <Calendar
        minDate={todayString}
        onDayPress={(e) => {
          setSelectedDate(e.dateString);
        }}
        onPressArrowRight={(e, month) => {
          console.log("month ", month);
          e();
        }}
        // disableArrowLeft={}
        markingType={"period"}
        markedDates={{
          // [selectedDate]: {
          //   selected: true,
          //   disableTouchEvent: true,
          //   selectedColor: "orange",
          // },
          ...markHoliday,
        }}
      />
      {ticketPrice && summary?.holidayCount && (
        <View>
          <Text>
            總共花費: {Number(ticketPrice) * (30 - summary?.holidayCount)}
          </Text>
          {Number(ticketPrice) * (30 - summary?.holidayCount) > 1200 ? (
            <Text>
              恭喜省下:{" "}
              {Number(ticketPrice) * (30 - summary?.holidayCount) - 1200}
            </Text>
          ) : (
            <Text>很可惜你沒省到</Text>
          )}
        </View>
      )}
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
