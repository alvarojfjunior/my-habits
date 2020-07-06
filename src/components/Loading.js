import React from 'react';
import { StyleSheet, View , Text} from 'react-native';

export default function Loading({ navigation }) {
    return (
        <View style={styles.container}>
            <Text> Carregando ... </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
  })