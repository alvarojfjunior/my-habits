import React, { useState, useCallback } from 'react';
import { Card, ProgressBar, Title, Text, Caption } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import ButtonAddHabit from '../components/ButtonAddHabit';
import DatabaseReset from '../database/DatabaseReset';
import DatabaseInit from '../database/DatabaseInit';

import HabitService from '../services/HabitService';
import Loading from '../components/Loading';

function Main({ navigation, state }) {

    const [isReady, setIsReady] = useState(false)
    const [habits, setHabits] = useState([]);
    const [user, setUser] = useState({})
    const [habit, setHabit] = useState({});

    useFocusEffect(
        useCallback(() => {
            const getAllHabits = async () => {
                const response = await HabitService.findAll();
                setHabits(response._array);
                setUser(state.user.user);
                setIsReady(true);
            }

            getAllHabits();
        }, [])
    );


    const databaseReset = async () => {
        try {
            await new DatabaseReset();
            await new DatabaseInit();
            navigation.navigate('SignUp');
        } catch (error) {
            error
        }

    }

    if (!isReady) return (<Loading />)
    else return (
        <View style={styles.container}>
            <Title style={styles.title} onLongPress={() => databaseReset()}> Hello {user.name} </Title>
            <Caption style={styles.subTitle}>How are your habits going?</Caption>
            {habits[0] ?
                <ScrollView>
                    {habits.map(habit => (
                        <Card
                            key={habit.id}
                            style={styles.cards}
                            onPress={() => navigation.navigate('DetailHabit', { habit })}>
                            <Card.Title
                                style={styles.fontCard}
                                title={habit.title}
                                subtitle={habit.description} />
                            <Card.Content>
                                <ProgressBar progress={habit.progress} color="#fb685a" />
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
                : <View>
                    <Image
                        style={styles.image}
                        source={require('../../assets/noHabits.png')}
                    />
                    <Title style={styles.textNoHabit}> You don't have a habit yet, register one now! </Title>
                </View>}
            <ButtonAddHabit navigation={navigation} style={styles.buttonAddHabit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
    },
    title: {
        alignSelf: "center",
        marginTop: 20
    },
    subTitle: {
        alignSelf: "center",
        marginTop: 20
    },
    textNoHabit: {
        alignSelf: "center",
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    cards: {
        margin: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    fontCard: {
        color: '#8aa0aa',
    },
    buttonAddHabit: {
        alignSelf: "flex-end",
        width: 100
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 50
    },
})

export default connect(state => ({ state }))(Main);