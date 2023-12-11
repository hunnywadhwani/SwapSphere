import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DealsDetailsScreen from '../screens/DealsDetailsScreen';

import AddDealsScreen from '../screens/AddDealsScreen';
import MyDealsDetailsScreen from '../screens/MyDealsDetailsScreen';
import MyDealsScreen from '../screens/MyDealsScreen';

import EditprofileScreen from '../screens/EditprofileScreen';
import AboutApp from '../screens/AboutApp';
import SettingsScreen from '../screens/SettingsScreen';

import CompletedTransactionsScreen from '../screens/CompletedTransactionsScreen';
import TransictionDetailScreen from '../screens/TransictionDetailScreen';
import CompletedTransictionDetailScreen from '../screens/CompletedTransictionDetailScreen';

const HStack = createStackNavigator();
const MStack = createStackNavigator();
const SStack = createStackNavigator();
const CStack = createStackNavigator();

const HomeStack = () => {
  return (
    <HStack.Navigator screenOptions={{ headerShown: false }}>
      <HStack.Screen name="HomeScreen" component={HomeScreen} />
      <HStack.Screen name="DealsDetailsScreen" component={DealsDetailsScreen} />
    </HStack.Navigator>
  );
};

const MyDealsStack = () => {
  return (
    <MStack.Navigator screenOptions={{ headerShown: false }}>
      <MStack.Screen name="MyDealsScreen" component={MyDealsScreen} />
      <MStack.Screen
        name="MyDealsDetailsScreen"
        component={MyDealsDetailsScreen}
      />
      <MStack.Screen name="AddDealsScreen" component={AddDealsScreen} />
    </MStack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <SStack.Navigator screenOptions={{ headerShown: false }}>
      <SStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SStack.Screen name="AboutApp" component={AboutApp} />
      <SStack.Screen name="EditprofileScreen" component={EditprofileScreen} />
    </SStack.Navigator>
  );
};
const CompletedTransactionsStack = () => {
  return (
    <CStack.Navigator screenOptions={{ headerShown: false }}>
      <CStack.Screen name="CompletedTransactionsScreen" component={CompletedTransactionsScreen} />
      <CStack.Screen name="TransictionDetailScreen" component={TransictionDetailScreen} />
      <CStack.Screen name="CompletedTransictionDetailScreen" component={CompletedTransictionDetailScreen} />
      
      
    </CStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#1f3f81ee"
      labeled={true}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            return <Ionicons name={'home'} size={20} color={color} />;
          } else if (route.name === 'MyDeals') {
            return <Ionicons name="create" size={20} color={color} />;
          } else if (route.name === 'Settings') {
            return <AntDesign name="setting" size={20} color={color} />;
          } else if (route.name === 'Transactions') {
            return <AntDesign name="user" size={20} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MyDeals" component={MyDealsStack} />
      <Tab.Screen name="Transactions" component={CompletedTransactionsStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};
export default TabContent;
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#4f67d8',
    height: '7.6%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
  },
});
