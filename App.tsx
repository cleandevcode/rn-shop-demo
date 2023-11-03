import { View } from "react-native";
import "react-native-gesture-handler";
import BottomTabs from "./src/navigation/bottomTab";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: `white` }}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </Provider>
    </View>
  );
}
