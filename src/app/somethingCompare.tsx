import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <Text>Something Compare</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
