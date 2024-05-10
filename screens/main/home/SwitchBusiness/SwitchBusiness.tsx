import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBackdrop} from '../../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {Colors} from '../../../../components/Colors';
import {
  AddCircle,
  People,
  Personalcard,
  Profile2User,
  Shop,
} from 'iconsax-react-native';
import {
  BoldText,
  LightText,
  MediumText,
} from '../../../../components/styles/styledComponents';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../app/store';
import {updateActiveApps} from '../../../../features/user/userSlice';
import {ThunkDispatch} from 'redux-thunk';
import {Button} from '../../../../components/Button/Button';

type SwitchBusinessT = {
  navigation?: NavigationProp<RootStackParamList>;
  showSwitch: boolean;
  onClose: () => void;
};

export default function SwitchBusiness({
  navigation,
  showSwitch,
  onClose,
}: SwitchBusinessT) {
  const {fontScale} = useWindowDimensions();
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

  const [snapTo, setSnapTo] = useState(['38%', '50%']);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    onClose();
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (showSwitch) {
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [showSwitch]);
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
          width: '20%',
        }}
        backdropComponent={({animatedIndex, style}) => (
          <CustomBackdrop
            onPress={handlePresentModalClose}
            animatedIndex={animatedIndex}
            style={style}
          />
        )}
        animateOnMount={true}>
        <View style={{paddingVertical: 20, paddingHorizontal: 20, gap: 10}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Profile2User variant="TwoTone" color={Colors.primary} size={23} />
            <BoldText
              style={{
                fontSize: 19 / fontScale,
                borderLeftColor: Colors.ash,
                borderLeftWidth: 1,
                paddingLeft: 10,
              }}>
              Select Business Account
            </BoldText>
          </View>
          <LightText style={{fontSize: 15 / fontScale}}>
            Select or create new business account.
          </LightText>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 20,

            gap: 10,
          }}>
          {userApps?.length !== 0 && userApps !== null && userApps?.map((userApp, _i) => (
            <Pressable
              key={userApp._id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.ash,
                paddingVertical: 20,
                gap: 20,
              }}
              onPress={() =>{ 
                dispatch(updateActiveApps(userApp))
                handlePresentModalClose()
                }}>
              <Shop size={30} color={Colors.primary} />
              <MediumText style={{fontSize: 16 / fontScale}}>
                {userApp?.business_name}
              </MediumText>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{paddingHorizontal: 20}}>

          <Button
            variant="primary"
            isLarge={false}
            isWide={true}
            style={{
              marginTop: 'auto',
              marginBottom: 30,
            }}>
            <AddCircle size={24} color={Colors.white} variant="TwoTone" />
            <MediumText style={{color: Colors.white, fontSize: 15 / fontScale}}>
              Create Business
            </MediumText>
          </Button>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
