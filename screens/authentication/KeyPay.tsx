import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import { FontAwesome5 } from "react-native-vector-icons";
//const logo = require("../images/Logo.png");

const PinEntryScreen = (): JSX.Element => {
  const [pin, setPin] = useState<string>("");
  const navigation = useNavigation();

  const handlePinPress = (digit: string | number): void => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
    if (pin.length === 3) {
     // navigation.navigate("NavBar");
    }
  };

  const handleClearPin = (): void => {
    setPin("");
  };

  const handleDelete = (): void => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <View style={styles.logoContainer}>
      
        </View>

        <View style={styles.pinContainer}>
          <Text style={styles.title}>Enter PIN</Text>
          <Text style={styles.pinDisplay}>{pin}</Text>
          <View style={styles.grid}>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9,
              //   `$}`,
              0,
            ].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.gridItem}
                onPress={() => handlePinPress(digit)}
              >
                <Text style={styles.gridItemText}>{digit}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 48,
              paddingRight: 48,
            }}
          >
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearPin}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleDelete}>
              <Text style={styles.clearButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.textLabel}>
            Forget Password? {""}
            <Text
            //  onPress={() => navigation.navigate("Forgot")}
              style={styles.orangeText}
            >
              Reset Now
            </Text>
          </Text>
          <Text
            //onPress={() => navigation.navigate("Login")}
            style={[styles.orangeText, { marginTop: 16 }]}
          >
            Login manually with password
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  logoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
  },
  textContainer: {
    marginTop: 24,
  },
  pinContainer: {
    //flex: 1,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 160,
  },
  header: {
    fontSize: 24,
    fontFamily: "Bold",
  },
  content: {
    color: "#1A374D",
    fontFamily: "Light",
    marginTop: 4,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontFamily: "MontserratRegular",
  },
  pinDisplay: {
    fontSize: 30,
    fontWeight: "bold",
    height: 60,
    marginVertical: 20,
    marginTop: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridItem: {
    width: "30%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  gridItemText: {
    fontSize: 20,
  },
  clearButton: {
    marginVertical: 20,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  textLabel: {
    marginTop: 24,
    fontFamily: "Regular",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Regular",
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    height: 56,
    backgroundColor: "#1E0700",
    marginTop: 64,
    padding: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  orangeText: {
    color: "#FF6100",
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: 16,
  },
});

export default PinEntryScreen;
