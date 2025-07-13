import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6d73e9',
        headerTitleAlign: 'center'
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: '關於 App',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) =>
            <MaterialIcons
              name="home"
              color={color}
              size={size}
            />
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="monthlyTicket"
        options={{
        title: '月票計算器',
          tabBarIcon: ({color, size}) =>
            <MaterialIcons
              name="calendar-month"
              color={color}
              size={size}
            />
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="smartCompare"
        options={{
        title: 'CP Battle',
          tabBarIcon: ({color, size}) =>
          <MaterialIcons
            name="compare"
            color={color}
            size={size}
          />
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
