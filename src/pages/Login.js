import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                title="Go to Main"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
})