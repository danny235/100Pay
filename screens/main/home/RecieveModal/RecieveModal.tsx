import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button/Button";
import { CustomBackdrop } from "../../../../components/ChooseAccountBalance/ChooseAccountBalance";
import { Colors } from "../../../../components/Colors";
import {
  AddCircleIcon,
  CircleIcon,
  CoinIcon,
  GearIcon,
  GreenNairaIcon,
  LinkHookIcon,
  ProfileIcon,
  RecieveIcon,
  SelectIcon,
} from "../../../../components/SvgAssets";
import {
  LightText,
  MediumText,
  RegularText,
} from "../../../../components/styles/styledComponents";
import { RootStackParamList } from "../../../../routes/AppStacks";
import { Bank, Flash, Flashy, Import, ImportSquare, Link, Profile, Wallet3 } from "iconsax-react-native";
import InstantRecieveModal from "./InstantRecieveModal";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootState } from "../../../../app/store";
import { addCommas, formatDateString } from "../../../../utils";

type RecieveModalT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  showRecieve: boolean;
  onClose: () => void;
};

export default function RecieveModal({
  navigation,
  showRecieve,
  onClose,
}: RecieveModalT) {
  const { fontScale } = useWindowDimensions();
  const dispatch = useDispatch();
  const { paymentLinks, paymentLinksLoading } = useSelector(
    (state: RootState) => state.account
  );
  const { userApps, activeUserApp, userAppsError, userAppsLoading, token } =
    useSelector((state: RootState) => state.user);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(["38%", "80%"]);
  const [showInstantRecieve, setShowInstantRecieve] = useState(false);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    onClose();
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const nav = useNavigation();
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Recieve Via Options
  const recieveSheetModalRef = useRef<BottomSheetModal>(null);
  const [recieveSnapTo, setRecieveSnapTo] = useState(["38%", "70%"]);
  const recieveSnapPoints = useMemo(() => recieveSnapTo, [recieveSnapTo]);
  const handlePresentRecieveModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    recieveSheetModalRef.current?.present();
  }, []);
  const handlePresentRecieveModalClose = useCallback(() => {
    onClose();
    recieveSheetModalRef.current?.dismiss();
  }, []);
  const handleRecieveSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Recieve list items
  const recieveItems = [
    {
      id: 1,
      name: "Bank Transfer",
      subTitle: "Receive money via bank transfer",
      icon: <Bank variant="TwoTone" color={Colors.primary} />,
      cb: () => {
        return null;
        // handlePresentRecieveModalClose();
      },
    },
    {
      id: 2,
      name: "Pay ID",
      subTitle: "Receive with your Pay ID",
      icon: <Profile color={Colors.primary} variant="TwoTone" />,
      cb: () => {
        handlePresentRecieveModalClose();

        navigation.navigate("MainTabs", {
          screen: "Discover",
          params: {
            screen: "GeneratedCode",
            initial: false,
          },
        });
      },
    },
    {
      id: 3,
      name: "Payment Link",
      subTitle: "Send a payment link to recieve money",
      icon: <Link color={Colors.primary} variant="TwoTone" />,
      cb: () => {
        handlePresentRecieveModalClose();
        navigation.navigate("MainTabs", {
          screen: "Discover",
          params: {
            screen: "GenerateLink",
            initial: false,
          },
        });
      },
    },
    {
      id: 4,
      name: "Pay Checkout",
      subTitle: "Recieve money from any digital asset",
      icon: <Wallet3 variant="TwoTone" color={Colors.primary} />,
      cb: () => {
        handlePresentRecieveModalClose();
        setShowInstantRecieve(true);
      },
    },
    // {
    //   id: 2,
    //   name: "Asset Deposit",
    //   icon: <CoinIcon />,
    //   cb: () => {
    //     handlePresentRecieveModalClose();
    //     navigation.replace("MainTabs", {
    //       screen: "Asset",
    //     });
    //   },
    // },
  ];

  // useEffect(() => {
  //   handlePresentModalPress();
  //   return () => {
  //     bottomSheetModalRef.current?.dismiss();
  //     recieveSheetModalRef.current?.dismiss();
  //   };
  // }, [navigation]);

  useEffect(() => {
    if (showRecieve) {
      handlePresentRecieveModalPress();
    } else {
      handlePresentRecieveModalClose();
    }
  }, [showRecieve]);
  return (
    <>
      {/* <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
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
          <View
            style={{
              paddingVertical: 20,
              gap: 20,
              paddingHorizontal: 20,
              flex: 1,
            }}
          >
            <View style={{ gap: 20, flexDirection: "row" }}>
              <SelectIcon />
              <MediumText
                style={{
                  fontSize: 20 / fontScale,
                  borderLeftColor: Colors.ash,
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                }}
              >
                Recieve Payments
              </MediumText>
            </View>
            <LightText
              style={{
                fontSize: 15 / fontScale,
                color: Colors.authTextTitle,
              }}
            >
              Recieve payment via Crypto, Pay ID, Payment Link
            </LightText>
            <Pressable style={styles.searchBox}>
              <LightText>Search request code here...</LightText>
              <CircleIcon color={Colors.grayText} />
            </Pressable>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 10, flex: 1 }}
            >
              {paymentLinksLoading === "loading" && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ActivityIndicator color={Colors.primary} size={30} />
                </View>
              )}

              {paymentLinks?.length > 0 &&
                paymentLinks.map((paymentLink, i) => {
                  return (
                    <Pressable
                      onPress={() => {
                        onClose();
                        handlePresentModalClose();
                        navigation.navigate("MainTabs", {
                          screen: "Discover",
                          params: {
                            screen: "GeneratedLink",
                            initial: false,
                            params: {
                              detail: paymentLink.code,
                            },
                          },
                        });
                      }}
                      style={styles.linkItem}
                      key={paymentLink._id}
                    >
                      <View style={styles.linkCurrency}>
                        <GreenNairaIcon />
                      </View>
                      <View style={styles.linkDetails}>
                        <MediumText style={{ fontSize: 18 / fontScale }}>
                          {paymentLink.link_name}
                        </MediumText>
                        <View style={styles.linkSubtextWrapper}>
                          <LightText
                            style={{
                              fontSize: 15 / fontScale,
                              borderRightColor: Colors.ash,
                              borderRightWidth: 1,
                              paddingRight: 5,
                            }}
                          >
                            Created: {formatDateString(paymentLink?.createdAt)}
                          </LightText>
                          <LightText style={{ fontSize: 15 / fontScale }}>
                            Amount: {activeUserApp?.currency}
                            {addCommas(paymentLink.amount)}
                          </LightText>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}

              {paymentLinks?.length === 0 && (
                <View style={styles.emptyPaymentLinks}>
                  <MediumText
                    style={{
                      textAlign: "center",
                      fontSize: 15 / fontScale,
                      color: Colors.balanceBlack,
                    }}
                  >
                    No payments links yet
                  </MediumText>
                  <LightText
                    style={{
                      textAlign: "center",
                      fontSize: 15 / fontScale,
                      color: Colors.balanceBlack,
                      width: "80%",
                    }}
                  >
                    Links generated would appear in this section
                  </LightText>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,

                  marginHorizontal: 10,
                }}
              >
                <Button
                  style={{ flexBasis: 40, flexGrow: 1 }}
                  variant="secondary"
                  isLarge={false}
                  isWide={false}
                  onPress={handlePresentRecieveModalPress}
                >
                  <AddCircleIcon />
                  <MediumText style={{ fontSize: 15 / fontScale }}>
                    Pay ID
                  </MediumText>
                </Button>

                <Button
                  style={{ flexBasis: 40, flexGrow: 1 }}
                  variant="primary"
                  isLarge={false}
                  isWide={false}
                  onPress={() => {
                    handlePresentModalClose();
                    setShowInstantRecieve(true);
                  }}
                >
                  <Flashy color={Colors.white} size={24} />
                  <MediumText
                    style={{ color: Colors.white, fontSize: 15 / fontScale }}
                  >
                    Instant Recieve
                  </MediumText>
                </Button>
              </View>
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider> */}

      {/* Recieve Modal */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={recieveSheetModalRef}
          index={1}
          snapPoints={recieveSnapPoints}
          onChange={handleRecieveSheetChanges}
          enableContentPanningGesture={false}
          enablePanDownToClose={false}
          handleIndicatorStyle={{
            borderWidth: 3,
            borderColor: Colors.ash,
            width: "20%",
          }}
          backdropComponent={({ animatedIndex, style }) => (
            <CustomBackdrop
              onPress={handlePresentRecieveModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}
        >
          <View style={{ paddingVertical: 20, gap: 20, paddingHorizontal: 20 }}>
            <View className="flex flex-row items-center gap-3">
              <ImportSquare variant="TwoTone" color={Colors.primary} />
              <MediumText
                className={`border-l border-[#E5E7EB] pl-3`}
                style={{
                  fontSize: 20 / fontScale,
                }}
              >
                Recieve Payments Via:
              </MediumText>
            </View>
            <LightText
              style={{ fontSize: 15 / fontScale, color: Colors.grayText }}
            >
              Select how you want to receive money to your paylens account.
            </LightText>
            <View style={{ gap: 10 }}>
              {recieveItems.map((item, i) => (
                <Pressable
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                  onPress={item.cb}
                  key={item.id}
                >
                  <View className="bg-gray-100 items-center justify-center rounded-md p-3">
                    {item.icon}
                  </View>
                  <View className="gap-2">
                    <RegularText style={{ fontSize: 15 / fontScale }}>
                      {item.name}
                    </RegularText>
                    <LightText
                      style={{
                        fontSize: 14 / fontScale,
                        color: Colors.grayText,
                      }}
                    >
                      {item.subTitle}
                    </LightText>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <InstantRecieveModal
        navigation={navigation}
        show={showInstantRecieve}
        onClose={() => setShowInstantRecieve(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyPaymentLinks: {
    backgroundColor: Colors.whiteShade,
    borderRadius: 10,
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linkItem: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  linkDetails: {
    gap: 10,
    borderBottomColor: Colors.ash,
    borderBottomWidth: 1,
    padding: 10,
  },
  linkCurrency: {
    backgroundColor: Colors.memojiBackground,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  linkSubtextWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
