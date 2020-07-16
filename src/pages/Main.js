import React, { useState, useCallback } from 'react';
import { Card, ProgressBar, Title, Text, Caption, FAB, Portal, Dialog, Paragraph, Avatar } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import DatabaseReset from '../database/DatabaseReset';
import DatabaseInit from '../database/DatabaseInit';

import HabitService from '../services/HabitService';
import Loading from '../components/Loading';

function Main({ navigation, state }) {

    const [isReady, setIsReady] = useState(false)
    const [showNews, setShowNews] = useState(false)
    const [notice, setNotice] = useState({})
    const [btnAddLoagin, setBtnAddLoagin] = useState(false)
    const [habits, setHabits] = useState([]);
    const [user, setUser] = useState({})
    const [habit, setHabit] = useState({});

    useFocusEffect(
        useCallback(() => {
            const getAllHabits = async () => {
                const response = await HabitService.findAll();
                setHabits(response._array);
                setUser(state.user.user)
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

    const GetWekDaysToShow = (habit) => {
        var res = '';

        if (habit.goaldays === 0)
            res = res + habit.currentday + ' days of practice'
        else
            res = res + habit.currentday + ' to ' + habit.goaldays + ' days - ';

        if (habit.monday === '1')
            res = res + 'Mon. '
        if (habit.tuesday === '1')
            res = res + 'Tue. '
        if (habit.wednesday === '1')
            res = res + 'Wed. '
        if (habit.thursday === '1')
            res = res + 'Thu. '
        if (habit.friday === '1')
            res = res + 'Fri. '
        if (habit.saturday === '1')
            res = res + 'Sat. '
        if (habit.sunday === '1')
            res = res + 'Sun. '
        return res;
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
                            onPress={() => navigation.navigate('DetailHabit', habit)}>
                            <Card.Title
                                style={styles.fontCard}
                                title={habit.title}
                                subtitle={habit.description}
                                right={() => <Caption> {GetWekDaysToShow(habit)} </Caption>} />
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
            <FAB
                style={styles.buttonAddHabit}
                icon="plus"
                color="#f4f0d9"
                onPress={() => navigation.navigate('AddHabit')}
            />
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
        backgroundColor: '#f3c57b',
        shadowColor: "#000",
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 50
    },
    newsDialog: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    fontDialog: {
        color: 'rgba(0, 0, 0, 0.8)',
    },
    newsimage: {
        width: 300,
        height: 200,
        borderRadius: 10
    }
})

export default connect(state => ({ state }))(Main);