import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddBankScreen,
  AssetScreen,
  ContestScreen,
  ConvertAssetScreen,
  DiscoverScreen,
  EditPhotoScreen,
  EditProfileScreen,
  GenerateRequestLinkScreen,
  GeneratedCodeScreen,
  GeneratedLinkScreen,
  HomeScreen,
  NotificationScreen,
  OnboardingScreen,
  PaymentCompleteScreen,
  PayoutScreen,
  RecieveModalScreen,
  RootAuth,
  ScanScreen,
  SettingsScreen,
  SignIn,
  SingleCoinViewScreen,
  TransactionDetailScreen,
  TransactionPinScreen,
  TransactionsScreen,
} from '../screens';
import CreateAccount from '../screens/authentication/CreateAccount';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import NewPassword from '../screens/authentication/NewPassword';
import PhoneNumber from '../screens/authentication/PhoneNumber';
import SecureCode from '../screens/authentication/SecureCode';
import SetPassword from '../screens/authentication/SetPassword';
import ConfirmPayment from '../screens/main/home/PayFlow/ConfirmPayment';
import PayHome, { BankDetailsT, BankT } from '../screens/main/home/PayFlow/Pay';
import SendPayment from '../screens/main/home/PayFlow/SendPayment';
import MainTabs from './MainTabs';
import Invitation from '../screens/authentication/Invitation';
import { useSelector } from 'react-redux';
import { NavigationState, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { RootState } from '../app/store';
import { ChargeType, PayoutsI } from '../features/account/accountSlice';
import PersonalInfo from '../screens/authentication/PersonalInfo';
import { UserAppType } from '../features/user/userSlice';

export type RootStackParamList = {
  Onboarding: undefined;
  RootAuth: undefined;
  Invitation: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  CreateAccount: undefined;
  PhoneNumber: undefined;
  SetPassword: undefined;
  PersonalInfo: undefined;
  DiscoverS: undefined;
  Referral: undefined;
  ForgotPassword: undefined;
  SecureCode: undefined;
  NewPassword: undefined;
  Setting: undefined;
  Home: undefined;
  Pay: undefined;
  Scan: undefined;
  SendPayment: {
    screen?: string;
    pay?: UserAppType;
    bankDetails?: BankDetailsT,
    bank?: BankT;
    initial?: boolean;
  };
  ConfirmPayment: undefined;
  TransactionPin: undefined;
  PaymentComplete: undefined;
  GenerateLink: undefined;
  Notification: undefined;
  Recieve: undefined;
  GeneratedLink: undefined;
  GeneratedCode: undefined;
  Assets: undefined;
  EditProfile: undefined;
  EditPhoto: undefined;
  SingleCoin: undefined;
  ConvertAsset: undefined;
  Transactions: undefined;
  TransactionDetail: {
    screen?: string;
    detail?: PayoutsI;
    initial?: boolean;
  };
  Payouts: undefined;
  AddBank: undefined;
  Contest: undefined;
  ConnectQr: undefined;
  MainTabs: {
    screen: string;
    params?: { screen?: string; initial?: boolean, params?: {
      detail: any
    } };
    initial?: boolean;
  };

  // Define other screens and their parameters here
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<RootStackParamList>();
const SettingsStack = createNativeStackNavigator<RootStackParamList>();
const DiscoverStack = createNativeStackNavigator<RootStackParamList>();
const AssetStack = createNativeStackNavigator<RootStackParamList>();

export function HomeStackScreen(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} />
      <HomeStack.Screen name="Pay" component={PayHome} />
      <HomeStack.Screen name="Scan" component={ScanScreen} />
      <HomeStack.Screen name="SendPayment" component={SendPayment} />
      <HomeStack.Screen name="ConfirmPayment" component={ConfirmPayment} />
      <HomeStack.Screen
        name="TransactionPin"
        component={TransactionPinScreen}
      />
      <HomeStack.Screen
        name="PaymentComplete"
        component={PaymentCompleteScreen}
      />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
     

   
      {/* Assets */}
      
      {/* Discover */}
      {/* <HomeStack.Screen name="DiscoverS" component={DiscoverScreen} /> */}
      <HomeStack.Screen
        name="GenerateLink"
        component={GenerateRequestLinkScreen}
      />
      <HomeStack.Screen name='Transactions' component={TransactionsScreen} />
      <HomeStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </HomeStack.Navigator>
  );
}

export function DiscoverStackScreen(): React.JSX.Element {
  return (
    <DiscoverStack.Navigator
      initialRouteName='DiscoverS'
      screenOptions={{
        headerShown: false,
      }}>
      <DiscoverStack.Screen name="DiscoverS" component={DiscoverScreen} />
      <DiscoverStack.Screen
        name="GenerateLink"
        component={GenerateRequestLinkScreen}
      />
      <DiscoverStack.Screen name="GeneratedLink" component={GeneratedLinkScreen} />
      <DiscoverStack.Screen name="GeneratedCode" component={GeneratedCodeScreen} />
      <DiscoverStack.Screen name="Payouts" component={PayoutScreen} />
      <DiscoverStack.Screen name="AddBank" component={AddBankScreen} />
      <DiscoverStack.Screen name="Contest" component={ContestScreen} />
    </DiscoverStack.Navigator>
  );
}

export function SettingsStackScreen(): React.JSX.Element {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
      <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
      <SettingsStack.Screen name="EditPhoto" component={EditPhotoScreen} />
      <SettingsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
      />
      <SettingsStack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </SettingsStack.Navigator>
  );
}

export function AssetStackScreen(): React.JSX.Element {
  return (
    <AssetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AssetStack.Screen name="Assets" component={AssetScreen} />
      <AssetStack.Screen name="SingleCoin" component={SingleCoinViewScreen} />
      <AssetStack.Screen name="ConvertAsset" component={ConvertAssetScreen} />
    </AssetStack.Navigator>
  );
}

export default function NavigationContent() {
  const {token, userOnboarded, isLoggedIn} = useSelector((state: RootState) => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    if (!userOnboarded) {
      navigation.navigate('Onboarding' as never);
    } else if (isLoggedIn) {
      navigation.navigate('RootAuth' as never);
    }
  }, [isLoggedIn, navigation, userOnboarded, token]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen
          name="MainTabs"
          options={{headerShown: false}}
          component={MainTabs}
        />
      ) : (
        <Stack.Group>
          {!userOnboarded && (
            <>
              
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </>
          )}
          <Stack.Screen name="RootAuth" component={RootAuth} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
          <Stack.Screen name="PersonalInfo"  component={PersonalInfo} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="Invitation" component={Invitation} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="SecureCode" component={SecureCode} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
