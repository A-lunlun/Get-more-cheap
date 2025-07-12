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
              fi
              color={color}
              size={size}
            />
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="monthlyTicket"
        options={{
        title: '月票幫你算',
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
    // ff6e61
    // <GestureHandlerRootView>
    //   <Drawer
    //     screenOptions={{
    //       // headerStyle: {
    //       //   backgroundColor: "#f4511e",
    //       // },
    //     }}
    //   >
    //     <Drawer.Screen
    //       name="index"
    //       options={{
    //         drawerLabel: "關於我",
    //         title: "關於我",
    //         // headerTintColor: "red", // header color
    //       }}
    //     />
    //     <Drawer.Screen
    //       name="monthlyTicket"
    //       options={{
    //         drawerLabel: "月票幫你算",
    //         title: "月票幫你算",
    //       }}
    //       key={Math.random().toString()}
    //     />
    //     <Drawer.Screen
    //       name="somethingCompare"
    //       options={{
    //         drawerLabel: "比比囉",
    //         title: "比比囉",
    //       }}
    //     />
    //   </Drawer>
    // </GestureHandlerRootView>
  );
}
