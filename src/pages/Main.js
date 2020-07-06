import React, { useEffect, useState } from 'react';
import { Card, ProgressBar, Colors } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import moment from 'moment';

import ButtonAddHabit from '../components/ButtonAddHabit';

import HabitService from '../services/HabitService';

export default function Main({ navigation }) {

    const [habits, setHabits] = useState([]);
    const [habit, setHabit] = useState({});

    useEffect(() => {
        getAllHabits();
    }, []);

    const getAllHabits = async () => {
        const response = await HabitService.findAll();
        setHabits(response._array);
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {habits.map(habit => (
                    <Card key={habit.id} style={styles.cards}>
                        <Card.Title title={habit.title} subtitle={habit.description} />
                        <Card.Content>
                            <ProgressBar progress={habit.progress} color="#fb685a" />
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
            <ButtonAddHabit navigation={navigation} style={styles.buttonAddHabit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
    },
    cards: {
        margin: 5,
        backgroundColor: '#f4f0d9',
    },
    buttonAddHabit: {
        alignSelf: "flex-end",
        width: 100
    }
})