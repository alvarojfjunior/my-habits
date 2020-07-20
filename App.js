import React, { useEffect, useState } from 'react';
import { YellowBox, Vibration, StyleSheet, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';


import store from './src/store';
import DatabaseInit from './src/database/DatabaseInit';

import Loading from './src/components/Loading';


YellowBox.ignoreWarnings([
  'Provided value for "time" is before the current date.',
]);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f3c57b',
    accent: '#fb685a',
    background: '#8aa0aa',
    surface: '#e8e4ce',
    text: '#e8e4ce',
  },
};

//Android banner: ca-app-pub-8648602875009663/9438875398
//Android intersticial: ca-app-pub-8648602875009663/1238512243

//Ios banner: ca-app-pub-8648602875009663/1760422273
//Ios intersticial: ca-app-pub-8648602875009663/9055732019

// CORES //
//CREME:    #f4f0d9   #e8e4ce
//LARANJA:  #fb685a
//AMARELO:  #f3c57b
//CINZA:    #8aa0aa


export default function App() {
  const [bannerAdId, setBannerAdId] = useState('')

  const [isReady, setIsReady] = useState(false);
  const [expoToken, setExpoToken] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const initApp = async () => {
      setBannerAdId(Platform.OS === 'ios' ? 'ca-app-pub-8648602875009663/1760422273' : 'ca-app-pub-8648602875009663/9438875398')
      await getPushNotificationPermissions();
      const _notificationSubscription = await Notifications.addListener(_handleNotification);
      new DatabaseInit();
      setIsReady(true);
    }
    initApp();
  }, []);

  const getPushNotificationPermissions = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      setExpoToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }
  const _handleNotification = notification => {
    Vibration.vibrate();
    setNotification(notification);
  };


  if (!isReady) return (
    <Loading />
  )
  return (
    <Provider store={store}>
      <PaperProvider theme={theme} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8aa0aa" />
        <Routes />
      </PaperProvider>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={bannerAdId}
        setTestDeviceIDAsync={true}
        servePersonalizedAds={true} 
        onDidFailToReceiveAdWithError ={(err) => console.log(err)}/>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})