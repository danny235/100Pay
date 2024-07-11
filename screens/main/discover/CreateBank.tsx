import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Switch,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomView from "../../../components/Views/CustomView";
import CustomHeader from "../../../components/headers/CustomHeaders";
import {
  Add,
  AddCircle,
  Arrow,
  ArrowForward,
  ArrowRight,
  Edit,
  Flashy,
  Money4,
  More,
  Scan,
  ScanBarcode,
  Star,
  StarSlash,
} from "iconsax-react-native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/AppStacks";
import { Colors } from "../../../components/Colors";
import { CircleIcon, StarIcon } from "../../../components/SvgAssets";
import {
  LightText,
  MediumText,
  SemiBoldText,
} from "../../../components/styles/styledComponents";
import AccessBankLogo from "../../../assets/images/accessBank.png";
import { Button } from "../../../components/Button/Button";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../../../components/ChooseAccountBalance/ChooseAccountBalance";
import { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Paylogo from "../../../assets/images/paytoken.png";
import {
  fetchBanks,
  updateActiveBankId,
} from "../../../features/account/accountSlice";
import { RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import updateDashboardRequest from "../../../apis/instantPayouts";
import { useToast } from "../../../components/CustomToast/ToastContext";
import {
  UserAppType,
  updateActiveApps,
} from "../../../features/user/userSlice";
import BankForm from "../home/FaceRecognition/BankForm";
import { addBankAccount } from "../../../features/auth/authSlice";

type PayoutsT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Payouts({ navigation }: PayoutsT) {
  const { fontScale } = useWindowDimensions();
  const {
    userProfile,
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
  } = useSelector((state: RootState) => state.user);
  const { bankAccountList } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(["38%", "50%"]);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const [showBankForm, setShowBankForm] = useState(false);
  const { showToast } = useToast();
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);

      dispatch(
        fetchBanks({ token, apiKey: activeUserApp?.keys.pub_keys[0].value })
      );
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch(
      fetchBanks({ token, apiKey: activeUserApp?.keys.pub_keys[0].value })
    );
  }, []);

  return (
    <CustomView>
      <CustomHeader
        icon={<Scan variant="TwoTone" color={Colors.primary} size={24} />}
        text="Bank Accounts"
        onPress={() => navigation.goBack()}
      />

      <LightText
        style={{
          fontSize: 16 / fontScale,
          color: Colors.grayText,
          marginVertical: 30,
        }}
      >
        Add bank account options to your paylens . These accounts will appear to
        anyone that scans your face.
      </LightText>

      <ScrollView
        refreshControl={
          <RefreshControl
            shouldRasterizeIOS={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <MediumText style={{ fontSize: 16 / fontScale, marginVertical: 20 }}>
          Bank Accounts
        </MediumText>
        {/* {bankAccountsLoading === "loading" && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={Colors.primary} size={30} />
          </View>
        )} */}

        <View style={{ gap: 20 }}>
          {bankAccountList?.length === 0 && (
            <MediumText style={{ textAlign: "center", color: Colors.grayText }}>
              No bank accounts added
            </MediumText>
          )}
          {bankAccountList?.map((account, i) => {
            // console.log(account._id, activeBankId);
            return (
              <Pressable key={i} style={styles.acctContainer}>
                <View style={styles.acctDetContainer}>
                  <View style={styles.topAccDet}>
                    <Image
                      style={{ width: 20, height: 20, borderRadius: 20 }}
                      source={Paylogo}
                    />
                    <LightText
                      style={{
                        fontSize: 15 / fontScale,
                        color: Colors.grayText,
                        borderLeftColor: Colors.ash,
                        borderLeftWidth: 1,
                        paddingLeft: 10,
                      }}
                    >
                      {account.bank_name}
                    </LightText>
                    {account.isFavourite && <StarIcon />}
                  </View>
                  <View style={styles.bottomAccDet}>
                    <MediumText
                      style={{
                        fontSize: 17 / fontScale,
                      }}
                    >
                      {userProfile?.first_name} {userProfile?.last_name}
                    </MediumText>
                    <LightText
                      style={{
                        fontSize: 17 / fontScale,
                        color: Colors.grayText,
                        borderLeftWidth: 1,
                        borderLeftColor: Colors.ash,
                        paddingLeft: 10,
                        borderStyle: "solid",
                      }}
                    >
                      {account.account_number}
                    </LightText>
                  </View>
                </View>

                <Pressable
                  onPress={() => {
                    handlePresentModalPress();
                    // setCurrentBankId(i);
                  }}
                >
                  <More color={Colors.ash} size={24} />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View className="flex-row gap-5 pb-10 mt-auto items-center">
        <Button
          variant="secondary"
          isLarge={false}
          isWide={false}
          onPress={() => setShowBankForm(true)}
          className="w-[46%]"
        >
          <AddCircle size={24} color={Colors.primary} variant="TwoTone" />
          <MediumText style={{ fontSize: 15 / fontScale }}>Add Bank</MediumText>
        </Button>

        <Button
          variant="primary"
          isLarge={false}
          isWide={false}
          onPress={() =>
            bankAccountList.length !== 0 &&
            navigation.navigate("MainTabs", {
              screen: "Dashboard",
            })
          }
          className="w-[46%]"
        >
          <MediumText style={{ color: Colors.white, fontSize: 15 / fontScale }}>
            Finish
          </MediumText>
          <ArrowRight size={24} color={Colors.white} variant="TwoTone" />
        </Button>
      </View>

      <BankForm
        handleShowForm={() => setShowBankForm(!showBankForm)}
        onClose={() => setShowBankForm(false)}
        onSubmit={(values) => dispatch(addBankAccount(values))}
        showForm={showBankForm}
        key={"BankForm"}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: Platform.OS === "android" ? 2 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  grayBg: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 15,
  },
  acctContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  acctDetContainer: {
    gap: 10,
    flex: 1,
  },
  topAccDet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bottomAccDet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  moreActionsContainer: {
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
