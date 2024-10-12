import { registerRootComponent } from "expo";
import { enableExperimentalWebImplementation } from "react-native-gesture-handler";
import App from "./App";

// enableExperimentalWebImplementation(true);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
