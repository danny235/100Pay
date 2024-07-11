import { View, useWindowDimensions, ScrollView, Pressable } from "react-native";
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
import { Colors } from "../Colors";

type BottomSheetModalComponentProps = {
  show: boolean;
  onClose: () => void;
  snapPoints?: string[];
  showIndicator?: boolean;
  children: React.ReactNode;
};

export default function BottomSheetModalComponent({
  show,
  onClose,
  snapPoints = ["50%", "100%"],
  showIndicator = true,
  children,
}: BottomSheetModalComponentProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    console.log("i've left the party baby");
    onClose();
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (show) {
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [show]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableContentPanningGesture={true}
        onDismiss={handlePresentModalClose}
        enableHandlePanningGesture={false}
        enablePanDownToClose={false}
        enableOverDrag={false}
        handleIndicatorStyle={{
          borderWidth: 3,
          borderColor: Colors.ash,
          width: "20%",
          display: showIndicator ? "flex" : "none",
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
          {children}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
