import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Routes from './src/routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import DatabaseInit from './src/database/DatabaseInit';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {

  useEffect(() => {
    async function downloadFile() {
      
    }

    downloadFile();



    new DatabaseInit();
  }, []);


  return (
    <PaperProvider theme={DefaultTheme} style={styles.container}>
      <Routes />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})