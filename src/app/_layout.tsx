import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4ECDC4', // 統一使用你 App 的主色調
        tabBarInactiveTintColor: '#999',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 2, // Android 陰影
          shadowOpacity: 0.1, // iOS 陰影
          shadowOffset: { width: 0, height: 2 },
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#2d4150',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingTop: 5,
          height: 60,
          shadowColor: 'transparent', // 移除陰影
          elevation: 0, // Android 移除陰影
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: '關於 App',
          tabBarLabel: '首頁',
          tabBarIcon: ({color, size}) =>
            <MaterialIcons
              name="home"
              color={color}
              size={size}
            />
        }}
      />
      <Tabs.Screen
        name="monthlyTicket"
        options={{
          title: '月票計算器',
          tabBarLabel: '月票計算',
          tabBarIcon: ({color, size}) =>
            <MaterialIcons
              name="train"
              color={color}
              size={size}
            />
        }}
      />
      <Tabs.Screen
        name="smartCompare"
        options={{
          title: 'CP 比較',
          tabBarLabel: 'CP 比較',
          tabBarIcon: ({color, size}) =>
            <MaterialIcons
              name="compare-arrows"
              color={color}
              size={size}
            />
        }}
      />
    </Tabs>
  );
}