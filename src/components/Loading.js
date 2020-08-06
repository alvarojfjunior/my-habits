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
            <View style={styles.thanksView}>
                <Headline style={styles.text}>Make with love by Álvaro, Clara, and Bernardo.</Headline>
                <Headline style={styles.text}>Thank u for use me! =D</Headline>
            </View>
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
    },
    thanksView: {
        alignSelf: "flex-end"
    }
})
