import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <Button
                title="Go to Main"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}