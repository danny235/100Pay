import { View, Text, useWindowDimensions } from "react-native";
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
import { BoldText, LightText } from "../styles/styledComponents";
import { Profile } from "iconsax-react-native";
import { Colors } from "../Colors";
import { CustomBackdrop } from "../ChooseAccountBalance/ChooseAccountBalance";
import { ScrollView } from "react-native-gesture-handler";

type SelectAccountT = {
  navigation?: NavigationProp<RootStackParamList>;
  showSelectAccount: boolean;
  onClose: () => void;
};

export default function RecognizedBookAccount( {navigation,
  showSelectAccount,
  onClose,
}: SelectAccountT) {
    const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
  } = useSelector((state: RootState) => state.user);
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
    onClose();
    bottomSheetModalRef.current?.dismiss();
  }, []);
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
            Select any of the accounts below to make payments.
          </LightText>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 20,

            gap: 10,
          }}
        ></ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}