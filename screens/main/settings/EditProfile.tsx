import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import CustomView from '../../../components/Views/CustomView';
import CustomHeader from '../../../components/headers/CustomHeaders';
import {CopyIcon, EditIcon} from '../../../components/SvgAssets';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/AppStacks';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../components/Colors';
import Avatar from '../../../assets/images/DashboardEmojis/Avatar-a.png';
import {
  MediumText,
  RegularText,
} from '../../../components/styles/styledComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

type EditProfileT = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function EditProfile({navigation}: EditProfileT) {
  const {fontScale} = useWindowDimensions();
  const {
    userApps,
    activeUserApp,
    userAppsError,
    userAppsLoading,
    token,
    userProfile,
  } = useSelector((state: RootState) => state.user);
  return (
    <CustomView>
      <CustomHeader
        icon={<EditIcon color={Colors.primary} />}
        text="Edit Profile"
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={styles.imageWrapper}>
          <Image style={styles.userPhoto} source={Avatar} />
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: Colors.memojiBackground,
              padding: 10,
              borderRadius: 20,
            }}>
            <MediumText style={{fontSize: 14 / fontScale}}>
              Edit Photo
            </MediumText>
            <EditIcon />
          </Pressable>
        </View>

        <MediumText style={{fontSize: 18 / fontScale, marginVertical: 15}}>
          Profile Details
        </MediumText>

        <View
          style={{
            backgroundColor: Colors.memojiBackground,
            padding: 20,
            borderRadius: 10,
            gap: 20,
          }}>
          <View style={styles.borderWrapper}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Name
            </RegularText>
            <MediumText style={[styles.textRight, {fontSize: 15 / fontScale}]}>
             {userProfile?.first_name} {userProfile?.last_name}
            </MediumText>
          </View>

          <View style={styles.borderWrapper}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Pay ID
            </RegularText>

            <Pressable style={styles.buttonGroup}>
              <MediumText
                style={{
                  textTransform: 'uppercase',
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                }}>
                {activeUserApp?.referralCode}
              </MediumText>
              <CopyIcon />
            </Pressable>
          </View>

          {/* <View style={styles.borderWrapper}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Gender
            </RegularText>
            <MediumText style={[styles.textRight, {fontSize: 15 / fontScale}]}>
              
            </MediumText>
          </View> */}

          <View style={styles.borderWrapper}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Phone No
            </RegularText>

            <Pressable style={styles.buttonGroup}>
              <MediumText
                style={{
                  textTransform: 'uppercase',
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                }}>
                {userProfile?.phone}
              </MediumText>
              <EditIcon />
            </Pressable>
          </View>

          <View style={styles.borderWrapper}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Country
            </RegularText>

            <Pressable style={styles.buttonGroup}>
              <MediumText
                style={{
                  
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                }}>
              {userProfile?.country}
              </MediumText>
              <EditIcon />
            </Pressable>
          </View>

          <View style={[styles.borderWrapper,{borderBottomWidth: 0}]}>
            <RegularText style={[styles.textLeft, {fontSize: 15 / fontScale}]}>
              Email
            </RegularText>

            <Pressable style={styles.buttonGroup}>
              <MediumText
                style={{
                  
                  fontSize: 15 / fontScale,
                  color: Colors.balanceBlack,
                }}>
               {userProfile?.email}
              </MediumText>
              <EditIcon />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  pressableButton: {
    backgroundColor: Colors.ash,
    borderRadius: 10,
  },
  borderWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.ash,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textLeft: {
    color: Colors.grayText,
  },
  textRight: {
    color: Colors.balanceBlack,
  },
  buttonGroup: {flexDirection: 'row', gap: 10, alignItems: "center"},
});
