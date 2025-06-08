import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  // return <Stack />;
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'App 資訊',
            title: 'App 資訊'
          }}
        />
        <Drawer.Screen
          name="monthlyTicket"
          options={{
            drawerLabel: '月票幫你算',
            title: '月票幫你算',
          }}
          key={Math.random().toString()}
        />
        <Drawer.Screen
          name="somethingCompare"
          options={{
            drawerLabel: '比比囉',
            title: '比比囉'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
