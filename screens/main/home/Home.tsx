import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleProp,
  View,
  useWindowDimensions,
  Animated,
  Easing,
  StyleSheet
} from "react-native";
import { Colors } from "../../../components/Colors";
import {
  BoldText,
  LightText,
} from "../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../routes/AppStacks";
import Action from "./Action";
import Balance from "./Balance";
import TransactionItem from "./TransactionItem";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { TouchableOpacity, ViewStyle } from "react-native";
import {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ChooseAccountBalance from "../../../components/ChooseAccountBalance/ChooseAccountBalance";
import { useToast } from "../../../components/CustomToast/ToastContext";
import {
  ArrowDownIcon,
  ArrowFrontIcon,
  CopyIcon,
  NotifictionIcon,
  ScanIcon,
} from "../../../components/SvgAssets";
import CustomView from "../../../components/Views/CustomView";
import Memojis from "./Memojis";
import {
  fetchUserApps,
  fetchUserData,
  toggleShowCamera,
} from "../../../features/user/userSlice";
import {
  fetchBanks,
  fetchBeneficiaries,
  fetchCharge,
  fetchPayments,
  fetchPaymentsLinks,
  fetchPayouts,
} from "../../../features/account/accountSlice";
import { ThunkDispatch } from "redux-thunk";
import { GenerateArray } from "../../../utils";
import { object } from "yup";
import TransactionsList from "../../../components/Transactions/TransactionsList";
import { NavigationProp } from "@react-navigation/native";
import SwitchBusiness from "./SwitchBusiness/SwitchBusiness";
import RecieveModal from "./RecieveModal/RecieveModal";
import PinInputBottomSheet from "../../../components/CustomPin/PinInputBottomSheet";
import Loader from "../../../components/Loader/LogoLoader";
import {
  CreateTransactionPin,
  createTransactionPinRequest,
} from "../../../apis/createtransactionpin";
import CustomCamera from "../../../components/Camera/CustomCamera";
import CustomCameraImage from "../../../components/Camera/CustomCameraImage";

interface CustomBackdropProps {
  animatedIndex: SharedValue<number>;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}



interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function Home({ navigation }: HomeProps): React.JSX.Element {
  const { fontScale } = useWindowDimensions();
  const [showSwitchBalanceModal, setShowSwithBalanceModal] = useState(false);
  const [showRecieveModal, setShowRecieveModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showSwitch, setShowSwitch] = useState(false);
  const { showToast } = useToast();
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
    userProfileLoading,
    showCamera,
  } = useSelector((state: RootState) => state.user);
  const { charges } = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [refreshing, setRefreshing] = useState(false);
  const [isPinSheetVisible, setIsPinSheetVisible] = useState(false);
  const [isConfirmPinSheetVisible, setIsConfirmPinSheetVisible] =
    useState(false);
  const [tPin, setTPin] = useState("");
  const [confirmTPin, setConfirmTPin] = useState("");
  const [creatingPin, setCreatingPin] = useState(false);


   const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value for camera is 1

   const toggleCamera = () => {
     Animated.timing(fadeAnim, {
       toValue: showCamera ? 0 : 1, // Toggle between 0 and 1
       duration: 500,
       easing: Easing.linear,
       useNativeDriver: true,
     }).start(() => {
       dispatch(toggleCamera())
     });
   };

  const handlePinSubmit = (pin) => {
    setIsPinSheetVisible(false);
    setIsConfirmPinSheetVisible(true);
    setTPin(pin);
  };

  const createTxnPin = async () => {
    setCreatingPin(true);
    const data: CreateTransactionPin = {
      pin: tPin,
      confirmedPin: confirmTPin,
    };
    try {
      const res = await createTransactionPinRequest(
        data,
        token,
        activeUserApp?.keys.pub_keys[0].value
      );

      if (res.data) {
        setCreatingPin(false);
        showToast(res.message, "success");
        dispatch(fetchUserData(token));
      }
    } catch (err) {
      setCreatingPin(false);
      showToast(err.message, "error");
    }
  };

  const handleConfirmPinSubmit = (pin) => {
    setConfirmTPin(pin);
    if (pin === tPin) {
      console.log("PIN confirmed:", pin);
      setIsConfirmPinSheetVisible(false);
      createTxnPin();
    } else {
      showToast("Pin doesn't match", "error");
      // Show a toast or alert here if necessary
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      dispatch(fetchUserApps(token));
      dispatch(
        fetchBanks({ token, apiKey: activeUserApp?.keys.pub_keys[0].value })
      );
      dispatch(
        fetchPayments({
          token,
          apiKey: activeUserApp?.keys.pub_keys[0].value,
          appId: activeUserApp?._id,
        })
      );

      dispatch(
        fetchCharge({ token, apiKey: activeUserApp?.keys.pub_keys[0].value })
      );
      dispatch(
        fetchPaymentsLinks({
          token,
          apiKey: activeUserApp?.keys.pub_keys[0].value,
        })
      );
    }, 3000);
  }, []);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${activeUserApp?.referralCode}`);
    showToast("Copied successfully", "success");
  };

  const handleShowModal = () => {
    setShowSwithBalanceModal(true);
  };

  useEffect(() => {
    dispatch(fetchUserApps(token));
    dispatch(fetchUserData(token));
    dispatch(fetchBeneficiaries(token));
  }, []);

  useEffect(() => {
    if (userAppsLoading === "loading") return;
    if (!activeUserApp?.keys?.pub_keys[0]?.value) return;
    dispatch(
      fetchPaymentsLinks({
        token,
        apiKey: activeUserApp?.keys?.pub_keys[0]?.value,
      })
    );
    dispatch(
      fetchBanks({ token, apiKey: activeUserApp?.keys?.pub_keys[0]?.value })
    );
    dispatch(
      fetchPayments({
        token,
        apiKey: activeUserApp?.keys?.pub_keys[0]?.value,
        appId: activeUserApp?._id,
      })
    );
    dispatch(
      fetchPayouts({
        token,
        appId: activeUserApp?._id,
      })
    );
  }, [activeUserApp?.keys?.pub_keys[0].value, userAppsLoading]);

  useEffect(() => {
    if (userProfileLoading === "loading") return;
    if (userProfile?.hasSetPin) return;
    setIsPinSheetVisible(true);
  }, [isPinSheetVisible, userProfile?.hasSetPin, userProfileLoading]);
  // console.log(activeUserApp?.keys.pub_keys[0].value)
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            shouldRasterizeIOS={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        
          {showCamera ? <CustomCamera isVisible={showCamera} /> : <CustomCameraImage isVisible={showCamera} />}
       
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            onPress={() => setShowSwitch(true)}
            style={{ flexDirection: "row", gap: 10, paddingVertical: 20 }}
          >
            <Image
              style={{ borderRadius: 40, height: 40, width: 40 }}
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1703617663829-ac7430988118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
              }}
            />

            <View style={{ gap: 4 }}>
              <BoldText
                style={{ fontSize: 16 / fontScale, color: Colors.white }}
              >
                {userProfileLoading === "loading" ||
                userProfileLoading === "rejected"
                  ? "*****"
                  : userProfileLoading === "success"
                  ? `Hello ${userProfile?.first_name}` || "*****"
                  : undefined}{" "}
                👋
              </BoldText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <LightText
                  style={{
                    fontSize: 12 / fontScale,
                    color: Colors.white,
                  }}
                >
                  {userAppsLoading === "loading" ||
                  userAppsLoading === "rejected"
                    ? "*****"
                    : userAppsLoading === "success"
                    ? activeUserApp?.business_name || "*****"
                    : undefined}
                </LightText>
                <ArrowDownIcon />
              </View>
            </View>
          </Pressable>

          <View style={{ flexDirection: "row", gap: 20 }}>
            {/* <Pressable onPress={() => navigation.navigate("Scan")}>
              <ScanIcon />
            </Pressable> */}
            <Pressable onPress={() => navigation.navigate("Notification")}>
              <NotifictionIcon color={Colors.white} />
            </Pressable>
          </View>
        </View>
        <View style={{ gap: 10, paddingHorizontal: 10 }}>
          <Balance />

          <Action
            onPayPress={() => navigation.navigate("Pay")}
            onRecievePress={() => setShowRecieveModal(true)}
            onScanPress={() => dispatch(toggleShowCamera())}
          />
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 80 }}>
          <Memojis navigation={navigation} />
        </View>
        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            padding: 16,
            borderRadius: 12,
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Transactions")}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderLeftColor: Colors.primary,
                borderLeftWidth: 5,
                borderRadius: 20,
                height: 16,
              }}
            />
            <BoldText
              style={{
                fontSize: 17 / fontScale,
                color: Colors.balanceBlack,
              }}
            >
              History
            </BoldText>
            <ArrowFrontIcon />
          </Pressable>
          <TransactionsList navigation={navigation} sliceFrom={0} sliceTo={5} />
        </View>
      </ScrollView>
      <SwitchBusiness
        showSwitch={showSwitch}
        onClose={() => setShowSwitch(false)}
      />
      <RecieveModal
        navigation={navigation}
        showRecieve={showRecieveModal}
        onClose={() => setShowRecieveModal(false)}
      />
      {/* Send naira modal */}
      {/* 
      {showSwitchBalanceModal && (
        <ChooseAccountBalance onHide={() => setShowSwithBalanceModal(false)} />
      )} */}

      <PinInputBottomSheet
        key={1}
        mainTxt="Create Payment Pin"
        subTxt="Enter a transaction pin to secure your payments"
        isVisible={isPinSheetVisible}
        onClose={() => setIsPinSheetVisible(false)}
        onSubmit={handlePinSubmit}
      />
      <PinInputBottomSheet
        key={2}
        mainTxt="Confirm Payment Pin"
        subTxt="Confirm your transaction pin to continue"
        isVisible={isConfirmPinSheetVisible}
        onClose={setIsConfirmPinSheetVisible}
        onSubmit={handleConfirmPinSubmit}
      />

      <Loader
        visible={
          userProfileLoading === "loading" ||
          userAppsLoading === "loading" ||
          creatingPin
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  content: {
    position: "relative"
  },
});
