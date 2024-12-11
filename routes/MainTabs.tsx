import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Colors} from '../components/Colors';
import {AssetIcon, DiscoverIcon, HomeIcon, SettingsIcon} from '../components/SvgAssets';
import {
  AssetStackScreen,
  CardStackScreen,
  DiscoverStackScreen,
  HomeStackScreen,
  SettingsStackScreen,
} from './AppStacks';
import { useWindowDimensions } from 'react-native';
import { Card } from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs(): React.JSX.Element {
  const {fontScale} = useWindowDimensions()
  useEffect(()=> {
    let x = 1
    x++
  },[getFocusedRouteNameFromRoute])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grayText,
        tabBarLabelStyle: {
          fontSize: 12 / fontScale,
          letterSpacing: 0.5,
          fontFamily: "SpaceGroteskBold",
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarAllowFontScaling: true,
      }}
    >
      <Tab.Screen
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isTabVisible = ["Home", "Dashboard", ""].includes(routeName);

          return {
            headerShown: false,
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
            tabBarStyle: isTabVisible
              ? {display: "flex"}
              : { height:0, display: "none" },
              
          };
        }}
        name="Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isTabVisible = ["Cards", "CardS", ""].includes(routeName);

          return {
            headerShown: false,
            tabBarIcon: ({ color }) => <Card color={color} />,
            tabBarStyle: isTabVisible
              ? {display: "flex"}
              : { height:0, display: "none" },
              
          };
        }}
        name="Cards"
        component={CardStackScreen}
      />
      <Tab.Screen
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isTabVisible = ["Assets", ""].includes(routeName);

          return {
            headerShown: false,
            tabBarIcon: ({ color }) => <AssetIcon color={color} />,
            tabBarStyle: isTabVisible
              ? { display: "flex" }
              : { height: 0, display: "none" },
          };
        }}
        name="Asset"
        component={AssetStackScreen}
      />
      <Tab.Screen
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isTabVisible = ["DiscoverS", ""].includes(routeName);

          return {
            headerShown: false,
            tabBarIcon: ({ color }) => <DiscoverIcon color={color} />,
            tabBarStyle: isTabVisible
              ? { display: "flex" }
              : { height: 0, display: "none",padding: 0,  },
          };
        }}
        name="Discover"
        component={DiscoverStackScreen}
      />
      <Tab.Screen
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isTabVisible = ["Setting", ""].includes(routeName);

          return {
            headerShown: false,
            tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
            tabBarStyle: isTabVisible
              ? { display: "flex" }
              : { height: 0, display: "none" },
          };
        }}
        name="Settings"
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  );
}
