import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ListScreen from '../screens/ListScreen';
import SavedScreen from '../screens/SavedScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Alt sekmeler: Liste ve Kaydedilenler
function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Liste"
        component={ListScreen}
        options={{
          title: 'F1 2024 Takımlar',
          tabBarLabel: 'Liste',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Kaydedilenler"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Kök Stack: sekmeler altta, Detay onların üstünde açılır
export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="Detay"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.item.name })}
      />
    </Stack.Navigator>
  );
}
