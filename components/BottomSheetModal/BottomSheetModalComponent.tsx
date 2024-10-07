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
  show?: boolean;
  onClose: () => void;
  snapPoints?: string[];
  showIndicator?: boolean;
  children: React.ReactNode;
  enableHandlePanningGesture?: boolean;
};

export default function BottomSheetModalComponent({
  show,
  onClose,
  snapPoints = ["38%", "40%"],
  showIndicator = true,
  enableHandlePanningGesture = false,
  children,
}: BottomSheetModalComponentProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    onClose();
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

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
        detached={true}
        enableHandlePanningGesture={enableHandlePanningGesture}
        enablePanDownToClose={false}
        enableOverDrag={false}
        
        handleIndicatorStyle={{
          borderWidth: 3,
          borderColor: Colors.ash,
          width: "8%",
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
        <View style={{ flex: 1 }}>{children}</View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
