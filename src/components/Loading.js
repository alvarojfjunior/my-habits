import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Headline } from 'react-native-paper';

export default function Loading({ navigation }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator 
                animating={true} 
                size="large" 
                color="#f3c57b" />
            <Headline style={styles.text}>Loading...</Headline>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff'
    }
})
