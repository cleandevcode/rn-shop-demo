import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import DetailScreen from "../screens/DetailScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: `Product detail`,
        }}
      />
    </HomeStack.Navigator>
  );
};

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="cart" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
