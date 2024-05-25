import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../ChooseAccountBalance/ChooseAccountBalance";
import CustomHeader from "../headers/CustomHeaders";
import { Bank } from "iconsax-react-native";
import { Colors } from "../Colors";
import { CircleIcon, DotIcon } from "../SvgAssets";
import { MediumText } from "../styles/styledComponents";
import { banks } from "../banks.json";

type BankT = {
  name?: string;
  slug?: string;
  code?: string;
  longCode?: string;
  gateway?: string | null;
  active?: boolean;
  country?: string;
  currency?: string;
  type?: string;
};

interface BankListI {
  isOpen: boolean;
  onBankPress: (bank: any) => void;
  onClose: () => void;
}

export default function BankList({ isOpen, onBankPress, onClose }: BankListI) {
  const { fontScale } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store search query
  const [activeBank, setActiveBank] = useState<BankT | null>(null); // State to store active bank
  const [filteredBanks, setFilteredBanks] = useState<BankT[]>(banks); // State to store filtered banks, initially set to all banks
  const [showModal, setShowModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(["38%", "100%"]);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    onClose()
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
    // Filter banks based on search query
    const filtered = banks.filter((bank) =>
      bank.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBanks(filtered); // Update filtered banks state
  };

  useEffect(() => {
    if (isOpen) {
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [isOpen]);

  return (
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
        <View style={{ paddingVertical: 20, gap: 20, paddingHorizontal: 20 }}>
          <CustomHeader
            text={"Select Bank"}
            icon={<Bank variant="TwoTone" color={Colors.primary} size={24} />}
            onPress={handlePresentModalClose}
          />
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search assets here"
              style={{
                fontFamily: "SpaceGrotesk-SemiBold",
                color: Colors.black,
                width: "70%",
                fontSize: 15 / fontScale,
              }}
              placeholderTextColor={Colors.grayText}
              onChangeText={handleSearch} // Call handleSearch on text change
              value={searchQuery} // Bind searchQuery state to the input value
            />
            <CircleIcon color={Colors.grayText} />
          </View>

          <ScrollView contentContainerStyle={{ gap: 10 }}>
            {filteredBanks.map((bank, i) => (
              <Pressable
                onPress={() => {
                    onBankPress(bank)
                  setActiveBank(bank);
                  handlePresentModalClose();
                }}
                key={bank.code}
                style={{ flexDirection: "row", gap: 10 }}
              >
                <DotIcon />
                <MediumText
                  style={{
                    fontSize: 14 / fontScale,
                    borderBottomColor: Colors.ash,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    width: "90%",
                  }}
                >
                  {bank.name}
                </MediumText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
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
    flexDirection: "row",
    alignItems: "center",
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
  banksWrapper: {
    gap: 10,
  },
  bankSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.ash,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
});
