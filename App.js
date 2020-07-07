import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      new DatabaseInit();
      setIsReady(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isReady) return (
    <Loading />
  )
  return (

    <Provider store={store}>
      <PaperProvider theme={theme} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8aa0aa" />
        <Routes />
      </PaperProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})