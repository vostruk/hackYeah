import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = {
  dash: {screen: DashboardScreen},
  Home: {screen: HomeScreen},
  Links: {screen: LinksScreen},
  Settings: {screen: SettingsScreen}
}

export default createStackNavigator(Stack, {
  navigationOptions: {
    header:null,
    headerLeft: null,
    headerMode: "none",
    tabBarVisible: false,
  },
  swipeEnabled: true,
  lazy: true
})