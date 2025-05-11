import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

type Summary = {
  startDate: string;
  endDate: string;
  holidayCount: number;
};

export default function Index() {
  const [selectedDate, setSelectedDate] = useState("");
  const [markHoliday, setMarkHoliday] = useState({});
  const [summary, setSummary] = useState<Summary | undefined>(undefined);
  const today = new Date();
  const todayString = today.toString();

  const setMark = useCallback(() => {
    setMarkHoliday({});
    // setSummary();
    // console.log("in check selectedDate ", selectedDate);
    // const selected = new Date(selectedDate);
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
    <View
      style={{
        flex: 1,
      }}
    >
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
          console.log('month ', month)
          e()
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
    </View>
  );
}
