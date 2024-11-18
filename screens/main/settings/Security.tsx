import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import { ArrowRight, ArrowRight2, PasswordCheck } from "iconsax-react-native";
import { Colors } from "../../../components/Colors";
import { BaseNavigationT } from "../home/Home";
import { MediumText } from "../../../components/styles/styledComponents";
import { generateUniqueRandomId } from "../../../utils";

interface SecurityI extends BaseNavigationT {}

export default function Security({ navigation }: SecurityI) {
  const { fontScale } = useWindowDimensions();
  const passwordsList = [
    {
      id: generateUniqueRandomId(),
      title: "Change Passwords",
      onPress: () => null,
    },
  ];
  const paymentList = [
    {
      id: generateUniqueRandomId(),
      title: "Create Transaction Pin",
      onPress: () => null,
    },
    {
      id: generateUniqueRandomId(),
      title: "Change Transaction Pin",
      onPress: () => null,
    },
  ];
  return (
    <CustomView>
      <CustomHeader
        icon={<PasswordCheck color={Colors?.primary} variant="TwoTone" />}
        text="Security"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 20 }}>
        <MediumText style={{ fontSize: 15 / fontScale }}>Passwords</MediumText>
        <View style={[styles.roudedBox]}>
          {passwordsList?.map((item, i) => (
            <Pressable
              onPress={item.onPress}
              key={item.id}
              style={[
                styles.listItem,
                {
                  borderBottomWidth: i === passwordsList.length - 1 ? 0 : 1,
                  paddingBottom: i === passwordsList.length - 1 ? 0 : 10,
                },
              ]}
            >
              <MediumText
                style={{
                  fontSize: 15 / fontScale,
                  color: Colors.authTextTitle,
                }}
              >
                {item.title}
              </MediumText>
              <ArrowRight2 color={Colors.authTextTitle} />
            </Pressable>
          ))}
        </View>
        <MediumText style={{ fontSize: 15 / fontScale }}>
          Payment Settings
        </MediumText>
        <View style={[styles.roudedBox]}>
          {paymentList?.map((item, i) => (
            <Pressable
              onPress={item.onPress}
              key={item.id}
              style={[
                styles.listItem,
                {
                  borderBottomWidth: i === paymentList.length - 1 ? 0 : 1,
                  paddingBottom: i === paymentList.length - 1 ? 0 : 10,
                },
              ]}
            >
              <MediumText
                style={{
                  fontSize: 15 / fontScale,
                  color: Colors.authTextTitle,
                }}
              >
                {item.title}
              </MediumText>
              <ArrowRight2 color={Colors.authTextTitle} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  roudedBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
    justifyContent: "center",
  },
  listItem: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
