import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from '../../../../components/Button/Button';
import {CustomBackdrop} from '../../../../components/ChooseAccountBalance/ChooseAccountBalance';
import {Colors} from '../../../../components/Colors';
import {
  AddCircleIcon,
  CircleIcon,
  CoinIcon,
  LinkHookIcon,
  ProfileIcon,
  RecieveIcon,
  SelectIcon,
} from '../../../../components/SvgAssets';
import {
  LightText,
  MediumText,
  RegularText,
} from '../../../../components/styles/styledComponents';
import {RootStackParamList} from '../../../../routes/AppStacks';
import {Flash, Flashy} from 'iconsax-react-native';
import InstantRecieveModal from './InstantRecieveModal';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';

type RecieveModalT = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  showRecieve: boolean;
  onClose: () => void;
};

export default function RecieveModal({navigation, showRecieve, onClose}: RecieveModalT) {
  const {fontScale} = useWindowDimensions();
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapTo, setSnapTo] = useState(['38%', '70%']);
  const [showInstantRecieve, setShowInstantRecieve] = useState(false);
  const snapPoints = useMemo(() => snapTo, [snapTo]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onClose();
  }, []);
  const nav = useNavigation();
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Recieve Via Options
  const recieveSheetModalRef = useRef<BottomSheetModal>(null);
  const [recieveSnapTo, setRecieveSnapTo] = useState(['38%', '40%']);
  const recieveSnapPoints = useMemo(() => recieveSnapTo, [recieveSnapTo]);
  const handlePresentRecieveModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    recieveSheetModalRef.current?.present();
  }, []);
  const handlePresentRecieveModalClose = useCallback(() => {
    recieveSheetModalRef.current?.dismiss();
    onClose()
  }, []);
  const handleRecieveSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Recieve list items
  const recieveItems = [
    {
      id: 1,
      name: 'Pay ID',
      icon: <ProfileIcon />,
      cb: () => {
        handlePresentRecieveModalClose();

        navigation.navigate('MainTabs', {
          screen: 'Discover',
          params: {
            screen: 'GeneratedCode',
            initial: false
          },
        });
      },
    },
    {
      id: 2,
      name: 'Asset Deposit',
      icon: <CoinIcon />,
      cb: () => {
        handlePresentRecieveModalClose();
        navigation.replace('MainTabs', {
          screen: 'Asset',
        });
      },
    },
    {
      id: 3,
      name: 'Payment Link',
      icon: <LinkHookIcon />,
      cb: () => {
        handlePresentRecieveModalClose();
        navigation.navigate('MainTabs', {
          screen: 'Discover',
          params: {
            screen: 'GenerateLink',
          },
         
        });
      },
    },
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
      handlePresentModalPress();
    } else {
      handlePresentModalClose();
    }
  }, [showRecieve]);
  return (
    <>
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
          <View style={{paddingVertical: 20, gap: 20, paddingHorizontal: 20}}>
            <View style={{gap: 20, flexDirection: 'row'}}>
              <SelectIcon />
              <MediumText
                style={{
                  fontSize: 20 / fontScale,
                  borderLeftColor: Colors.ash,
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                }}>
                Select Payment Link
              </MediumText>
            </View>
            <LightText
              style={{fontSize: 15 / fontScale, color: Colors.authTextTitle}}>
              You can select, search for or generate request code here:
            </LightText>

            <Pressable style={styles.searchBox}>
              <LightText>Search request code here...</LightText>
              <CircleIcon color={Colors.grayText} />
            </Pressable>

            <View style={styles.emptyPaymentLinks}>
              <MediumText
                style={{
                  textAlign: 'center',
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                }}>
                No payments links yet
              </MediumText>
              <LightText
                style={{
                  textAlign: 'center',
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                  width: '80%',
                }}>
                Links generated would appear in this section
              </LightText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                width: '100%',
                marginTop: 'auto',
              }}>
              <Button
                style={{flexBasis: 50, flexGrow: 1}}
                variant="secondary"
                isLarge={false}
                isWide={false}
                onPress={handlePresentRecieveModalPress}>
                <AddCircleIcon />
                <MediumText style={{fontSize: 15 / fontScale}}>
                  Generate Link
                </MediumText>
              </Button>

              <Button
                style={{flexBasis: 60, flexGrow: 1}}
                variant="primary"
                isLarge={false}
                isWide={false}
                onPress={() => {
                  handlePresentModalClose()
                  setShowInstantRecieve(true);
                }}>
                <Flashy color={Colors.white} size={24} />
                <MediumText
                  style={{color: Colors.white, fontSize: 15 / fontScale}}>
                  Instant Recieve
                </MediumText>
              </Button>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

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
            width: '20%',
          }}
          backdropComponent={({animatedIndex, style}) => (
            <CustomBackdrop
              onPress={handlePresentRecieveModalClose}
              animatedIndex={animatedIndex}
              style={style}
            />
          )}
          animateOnMount={true}>
          <View style={{paddingVertical: 20, gap: 20, paddingHorizontal: 20}}>
            <MediumText
              style={{
                fontSize: 20 / fontScale,
              }}>
              Recieve Via
            </MediumText>
            <View style={{gap: 10}}>
              {recieveItems.map((item, i) => (
                <Pressable
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    borderBottomColor: Colors.ash,
                    borderBottomWidth: item.id === 3 ? 0 : 1,
                    paddingVertical: 15,
                  }}
                  onPress={item.cb}
                  key={item.id}>
                  {item.icon}
                  <RegularText style={{fontSize: 15 / fontScale}}>
                    {item.name}
                  </RegularText>
                </Pressable>
              ))}
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <InstantRecieveModal navigation={navigation} show={showInstantRecieve} onClose={()=>setShowInstantRecieve(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.ash,
    borderRadius: 50,
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyPaymentLinks: {
    backgroundColor: Colors.whiteShade,
    borderRadius: 10,
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
