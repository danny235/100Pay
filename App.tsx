/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import SplashScreen from "react-native-splash-screen";
// import { Colors } from "./components/Colors";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { ToastProvider } from "./components/CustomToast/ToastContext";
import NavigationContent from "./routes/AppStacks";
import { useFonts } from "expo-font";
import ErrorBoundary from "./ErrorBoundary";

import "./styles.css";
import { Colors } from "./components/Colors";



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [isOffline, setIsOffline] = useState(true);

  let [fontsLoaded, fontsError] = useFonts({
    SpaceGroteskBold: require("./assets/fonts/SpaceGroteskBold.ttf"),
    SpaceGroteskLight: require("./assets/fonts/SpaceGroteskLight.ttf"),
    SpaceGroteskRegular: require("./assets/fonts/SpaceGroteskRegular.ttf"),
    SpaceGroteskMedium: require("./assets/fonts/SpaceGroteskMedium.ttf"),
    SpaceGroteskSemiBold: require("./assets/fonts/SpaceGroteskSemiBold.ttf"),
  });

  // Make sure that all fonts has been loaded before rendering
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,

  // };

  // useEffect(() => {
  //   if (Platform.OS === "android") SplashScreen.hide();
  // }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <ToastProvider>
                  <NavigationContent />
                </ToastProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
