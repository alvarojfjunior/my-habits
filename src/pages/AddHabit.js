import React from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, Button } from 'react-native';
import HabitService from '../services/HabitService';
import moment from 'moment';

export default function AddHabit({ navigation }) {

    const addHabit = async () => {
        const newHabit = {
            'title': 'Ler',
            'description': 'Ler um pouco',
            'progress': 0.5,
            'finished': false,
            'date': moment().format('DD/MM/YYYY HH:MM'),
        }
        const res = await HabitService.addData(newHabit);
    }


    return (
        <View style={styles.container}>
            <Text>Add Habit</Text>
            <Button
                title="Go to Main"
                onPress={() => addHabit()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cards: {
        margin: 5,
    },
    buttonAddHabit: {
        alignSelf: "flex-end",
        width: 100
    }
})