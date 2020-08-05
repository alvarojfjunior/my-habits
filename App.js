import React, { useEffect, useState, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AdMobBanner } from 'expo-ads-admob';


import store from './src/store';
import DatabaseInit from './src/database/DatabaseInit';

import Loading from './src/components/Loading';

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


// CORES //
//CREME:    #f4f0d9   #e8e4ce
//LARANJA:  #fb685a
//AMARELO:  #f3c57b
//CINZA:    #8aa0aa

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [bannerAdUnitID, setBannerAdUnitID] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
   
  Platform.OS === 'android'

  useEffect(() => {    
    setBannerAdUnitID(Platform.OS === 'android'? 'ca-app-pub-8648602875009663/9438875398' : 'ca-app-pub-8648602875009663/1760422273')



    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    new DatabaseInit();
    setIsReady(true);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    }
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  if (!isReady) return (
    <Loading />
  )
  return (
    <Provider store={store}>
      <PaperProvider theme={theme} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8aa0aa" />
        <Routes />
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={bannerAdUnitID}
          servePersonalizedAds 
          onDidFailToReceiveAdWithError={this.bannerError}/>
      </PaperProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})