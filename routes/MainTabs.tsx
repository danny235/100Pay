import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Colors} from '../components/Colors';
import {AssetIcon, DiscoverIcon, HomeIcon, SettingsIcon} from '../components/SvgAssets';
import {
  AssetStackScreen,
  DiscoverStackScreen,
  HomeStackScreen,
  SettingsStackScreen,
} from './AppStacks';
import { useWindowDimensions } from 'react-native';

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
          fontSize: 12  / fontScale,
          letterSpacing: 0.5,
          fontFamily: 'SpaceGroteskBold',
        },
        tabBarItemStyle: {
          paddingVertical: 5, 
        },
        tabBarAllowFontScaling: true,
        
        
      }}>
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => <HomeIcon color={color} />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            console.log(routeName);
            if (routeName === '') return;
            if (routeName === 'Dashboard') return;
            return {display: 'none', };
          })(route),
        })}
        name="Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => <AssetIcon color={color} />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            // console.log(routeName);
            if (routeName === '') return;
            if (routeName === 'Assets') return;
            return {display: 'none'};
          })(route),
        })}
        name="Asset"
        component={AssetStackScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => <DiscoverIcon color={color} />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            // console.log(routeName);
            if (routeName === '') return;
            if (routeName === 'DiscoverS') return;
            return {display: 'none'};
          })(route),
        })}
        name="Discover"
        component={DiscoverStackScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => <SettingsIcon color={color} />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            // console.log(routeName);
            if (routeName === '') return;
            if (routeName === 'Setting') return;
            return {display: 'none'};
          })(route),
        })}
        name="Settings"
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  );
}
