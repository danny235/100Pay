import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AvatarA from "../../../assets/images/DashboardEmojis/Avatar-a.png";
import AvatarB from "../../../assets/images/DashboardEmojis/Avatar-b.png";
import AvatarC from "../../../assets/images/DashboardEmojis/Avatar-c.png";
import AvatarD from "../../../assets/images/DashboardEmojis/Avatar-d.png";
import AvatarE from "../../../assets/images/DashboardEmojis/Avatar-e.png";
import AvatarF from "../../../assets/images/DashboardEmojis/Avatar-f.png";
import {
  BoldText,
  MediumText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import { Colors } from "../../../components/Colors";
import { ArrowFrontIcon } from "../../../components/SvgAssets";
import { useWindowDimensions } from "react-native";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/AppStacks";
import { truncateText } from "../../../utils";

interface User {
  id: number;
  username: string;
  avatar: any;
}

type MemojiT = {
  navigation: NativeStackNavigationProp<RootStackParamList> | any;
  onPress?: () => void;
};

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFD2"];

// Function to get initials from account name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
};



const Memojis = ({ navigation }: MemojiT) => {
  const { beneficiaries, beneficiariesError, beneficiariesLoading } =
    useSelector((state: RootState) => state.account);
  const { fontScale } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.line} />
        <BoldText style={styles.headerText}>Recents</BoldText>
      </View>
      {beneficiariesLoading === "loading" ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={35} color={Colors.primary} />
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {beneficiaries && [...beneficiaries]?.reverse().map((user, i) => (
            <Pressable
              className=" space-y-3"
              onPress={() =>
                navigation.navigate("SendPayment", {
                  bankDetails: {
                    account_name: user?.account_name,
                    account_number: user?.account_number,
                    bank_id: user?._id,
                  },
                  bank: {
                    name: user?.bank_name,
                    code: user?.bank_code,
                  },
                })
              }
              key={user?.__v}
              style={styles.userContainer}
            >
              <View style={styles.initialAvatar}>
                <SemiBoldText
                  style={{ fontSize: 10 / fontScale, color: Colors.white }}
                >
                  {truncateText(user?.bank_name, 4)}
                </SemiBoldText>
              </View>
              <MediumText
                style={[styles.username, { color: Colors.grayText }]}
              >
                {truncateText(user?.account_name, 9)}
              </MediumText>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 12,
    padding: 16,
    gap: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftColor: Colors.primary,
    borderLeftWidth: 5,
    borderRadius: 20,
    height: 16,
  },
  headerText: {
    fontSize: 17,
    color: Colors.balanceBlack,
  },
  userContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  username: {
    
    fontSize: 14,
  },
  initialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});

export default Memojis;
