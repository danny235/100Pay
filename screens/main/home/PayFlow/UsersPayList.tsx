import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import AvatarE from "../../../../assets/images/DashboardEmojis/Avatar-e.png";
import {
  LightText,
  SemiBoldText,
} from "../../../../components/styles/styledComponents";
import { Colors } from "../../../../components/Colors";
import { RootState } from "../../../../app/store";
import { useSelector } from "react-redux";
import { truncateText } from "../../../../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../routes/AppStacks";

interface User {
  id: string;
  username: string;
  avatar: any;
}

interface UserPayListProps {
  renderSingleItem?: boolean;
  onPress?: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList> | any
}

const UserPayList: React.FC<UserPayListProps> = ({
  renderSingleItem,
  onPress,
  navigation
}) => {
  const { beneficiaries, beneficiariesError, beneficiariesLoading } =
    useSelector((state: RootState) => state.account);
  const { fontScale } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {beneficiaries.map((user) => (
        <Pressable
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
          key={user._id}
          style={styles.userContainer}
        >
          <View style={styles.initialAvatar}>
            <SemiBoldText
              style={{ fontSize: 10 / fontScale, color: Colors.white }}
            >
              {truncateText(user?.bank_name, 4)}
            </SemiBoldText>
          </View>
          <SemiBoldText style={[styles.username, {fontSize: 14 / fontScale}]}>
            {truncateText(user?.account_name, 10)}
          </SemiBoldText>
          <View style={[styles.userInfo]}>
            <LightText style={[styles.userId, {fontSize: 12 / fontScale}]}>
              Account: {user?.account_number}
            </LightText>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 12,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
    borderLeftWidth: 1,
    borderLeftColor: Colors.ash,
    paddingLeft: 12,
  },
  username: {

    color: Colors.balanceBlack,
    paddingRight: 12,
    textTransform: "capitalize"
  },
  userId: {

    color: "gray",
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

export default UserPayList;
