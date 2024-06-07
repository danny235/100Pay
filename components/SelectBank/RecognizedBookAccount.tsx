import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/AppStacks";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BoldText, LightText, SemiBoldText } from "../styles/styledComponents";
import { Profile } from "iconsax-react-native";
import { Colors } from "../Colors";
import { CustomBackdrop } from "../ChooseAccountBalance/ChooseAccountBalance";
import { ScrollView } from "react-native-gesture-handler";
import { truncateText } from "../../utils";
import { updateShowBookAccounts } from "../../features/account/accountSlice";
import { toggleShowCamera } from "../../features/user/userSlice";

type SelectAccountT = {
  navigation?: NavigationProp<RootStackParamList> | any;
  showSelectAccount: boolean;
  onClose?: () => void;
};

export default function RecognizedBookAccount({
  navigation,
  showSelectAccount,
  onClose,
}: SelectAccountT) {
  const { beneficiaries } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { fontScale, height, width } = useWindowDimensions();
  const [snapTo, setSnapTo] = useState([
    "38%",
    `${height <= 800 ? height / 9 : height / 13}%`,
  ]);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
     if (onClose) onClose();
    dispatch(toggleShowCamera(false));
    dispatch(updateShowBookAccounts(false));
    bottomSheetModalRef.current?.dismiss();
  }, [dispatch, onClose]);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (showSelectAccount) {
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [showSelectAccount]);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        key={"RecognizedBookAccounts"}
        // enableContentPanningGesture={false}
        enablePanDownToClose={false}
        handleIndicatorStyle={{
          borderWidth: 3,
          borderColor: Colors.ash,
          width: "20%",
        }}
        backdropComponent={({ animatedIndex, style }) => (
          <CustomBackdrop
            onPress={handlePresentModalClose}
            animatedIndex={animatedIndex}
            style={style}
          />
        )}
        animateOnMount={true}
      >
        <View style={{ paddingVertical: 20, paddingHorizontal: 20, gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Profile variant="TwoTone" color={Colors.primary} size={23} />
            <BoldText
              style={{
                fontSize: 19 / fontScale,
                borderLeftColor: Colors.ash,
                borderLeftWidth: 1,
                paddingLeft: 10,
              }}
            >
              Recognized Accounts
            </BoldText>
          </View>
          <LightText style={{ fontSize: 15 / fontScale }}>
            Paylens detected {beneficiaries?.length} banks with the same account number, please select
            one to continue.
          </LightText>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 20,

            gap: 10,
          }}
        >
          {beneficiaries?.map((user) => (
            <Pressable
              onPress={() =>{
                handlePresentModalClose()
                
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
                })}
              }
              key={user._id}
              style={styles.userContainer}
            >
              <View style={styles.initialAvatar}></View>
              <View style={{ gap: 10 }}>
                <SemiBoldText
                  style={[styles.username, { fontSize: 14 / fontScale }]}
                >
                  {user?.bank_name}
                </SemiBoldText>
                  <LightText
                    style={[styles.userId, { fontSize: 12 / fontScale }]}
                  >
                    {user?.account_number}
                  </LightText>
              
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 12,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
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
    textTransform: "capitalize",
  },
  userId: {
    color: "gray",
  },
  initialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.ash,
  },
});
