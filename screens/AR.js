import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AR_Screen from './AR_Screen';
import AR_Camera from './AR_Camera';
import {Image, View, StyleSheet} from 'react-native';

export default function AR() {
  const Tab = createBottomTabNavigator();

  const pullData = data => {
    console.log(data);
  };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="AR_Screen"
        component={AR_Screen}
        options={{
          tabBarIcon: () => {
            return (
              <View >
                <Image
                  source={require('../assets/Images/ar_home.png')}
                  resizeMode="contain"
                  style={{width: 45, height: 50, marginTop: 15}}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        
        name="AR_Camera"
        component={() => <AR_Camera />} //here AR_camera is passed as inline, because of which app re-renders AR everytime, thus avoiding crashes.
        options={{
          tabBarIcon: () => {
            return (
              <View >
                <Image
                  source={require('../assets/Images/ar_camera.png')}
                  resizeMode="contain"
                  style={{width: 50, height: 50, marginTop: 10}}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  my: {
    
  },
});
