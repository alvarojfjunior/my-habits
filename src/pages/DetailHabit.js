import * as React from 'react';
import { StyleSheet ,View, Text, Button } from 'react-native';

export default function DetailHabit({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Detail Habit</Text>
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