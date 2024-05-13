import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import CustomView from "../../../../components/Views/CustomView";
import CustomHeader from "../../../../components/headers/CustomHeaders";
import {
  ArrowDownIcon,
  FilterIcon,
  NotifictionIcon,
} from "../../../../components/SvgAssets";
import { Colors } from "../../../../components/Colors";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routes/AppStacks";
import { ScrollView } from "react-native";
import {
  BoldText,
  LightText,
  MediumText,
} from "../../../../components/styles/styledComponents";
import TransactionItem from "../../home/TransactionItem";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Clock, RecoveryConvert } from "iconsax-react-native";
import { CustomBackdrop } from "../../../../components/ChooseAccountBalance/ChooseAccountBalance";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import TransactionsList from "../../../../components/Transactions/TransactionsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type TransactionsT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function Transactions({ navigation }: TransactionsT) {
  const { fontScale } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { charges } = useSelector((state: RootState) => state.account);
  const filters = [
    {
      id: 1,
      title: "Received",
      onPress: () => handlePresentModalClose(),
    },
    {
      id: 2,
      title: "Pay Outs",
      onPress: () => handlePresentModalClose(),
    },
    {
      id: 3,
      title: "Failed",
      onPress: () => handlePresentModalClose(),
    },
    {
      id: 4,
      title: "Successful",
      onPress: () => handlePresentModalClose(),
    },
    {
      id: 5,
      title: "Pending",
      onPress: () => handlePresentModalClose(),
    },
  ];

  const [snapTo, setSnapTo] = useState(["30%", "50%"]);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <CustomView>
      <CustomHeader
        text="Transactions"
        onPress={() => navigation.goBack()}
        icon={<Clock color={Colors.primary} size={24} />}
      />

      <ScrollView>
        <View style={styles.transactionItemWrapper}>
          <Pressable
            onPress={handlePresentModalPress}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <FilterIcon color={Colors.primary} />

            <LightText
              style={{
                fontSize: 13 / fontScale,
                borderLeftColor: Colors.grayText,
                borderLeftWidth: 1,
                paddingLeft: 10,
              }}
            >
              All Transactions
            </LightText>
            <ArrowDownIcon />
          </Pressable>
        </View>
        <View style={{  gap: 20, paddingVertical: 4 }}>
          <TransactionsList navigation={navigation} />
        </View>
      </ScrollView>

      {/* Confirm conversion */}
      <BottomSheetModalProvider>
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
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <RecoveryConvert
                variant="TwoTone"
                size={23}
                color={Colors.primary}
              />
              <BoldText style={{ fontSize: 17 / fontScale, color: Colors.ash }}>
                |
              </BoldText>
              <MediumText style={{ fontSize: 17 / fontScale }}>
                Transaction Filter
              </MediumText>
            </View>
            <LightText style={{ fontSize: 15 / fontScale }}>
              Select the category you want to display
            </LightText>
            <View style={{ gap: 20 }}>
              {filters.map((filter) => (
                <Pressable onPress={filter.onPress}>
                  <MediumText style={{ fontSize: 16 / fontScale }}>
                    {filter.title}
                  </MediumText>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  transactionItemWrapper: {
    flex: 1,
    gap: 20,
    paddingVertical: 20,
    flexGrow: 1,
  },
});
