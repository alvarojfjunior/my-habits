import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Paragraph, Title, IconButton, Avatar, Caption, Portal, Dialog, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import Loading from '../components/Loading';
import GoalService from '../services/GoalService';
import HabitService from '../services/HabitService';

function DetailHabit({ state, navigation, route }) {

    const [isReady, setIsReady] = useState(false)
    const [user, setUser] = useState({});
    const [habit, setHabit] = useState({});
    const [goals, setGoals] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const loadAll = async habitId => {
                setHabit({ ...route.params.habit, 'initials': route.params.habit.title.substring(0, 2) })
                setUser(state.user.user);

                //load Goals
                const res = await GoalService.findByHabit(route.params.habit.id);
                setGoals(res._array);
                setIsReady(true);
            }
            loadAll(habit.id);

        }, [])
    );


    const handleEdit = () => {
        setOptionsVisible(false);
        navigation.navigate('AddHabit', habit);
    }

    const handleDelete = async () => {
        const res = await HabitService.deleteById(habit.id);
        navigation.goBack();
    }


    if (!isReady) return (<Loading />)
    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-left"
                color="#fb685a"
                size={20}
                onPress={() => navigation.goBack()}
            />
            <Title style={styles.title}> All about you Habit! </Title>
            <Card style={styles.cardHabit}>
                <Card.Title
                    title={habit.title}
                    subtitle={habit.description}
                    left={(props) => <Avatar.Text size={50} label={habit.initials} />}
                    right={(props) => <IconButton {...props} icon="dialpad" color='#f3c57b' onPress={() => { setOptionsVisible(true) }} />} />
                <Card.Content>
                    <Paragraph style={styles.litleText}>Stay focused on your goals!</Paragraph>
                </Card.Content>
            </Card>
            <Title style={styles.titleGoals}> Your goals: </Title>




            <ScrollView style={styles.scroll}>
                {goals.map(goal => (
                    <Card key={goal.id} style={styles.cardGoasHeader}>
                        <Card.Title
                            title={goal.title}
                            subtitle={goal.description}
                            left={() => <Avatar.Icon size={40} backgroundColor="#fb685a" color="#f3c57b" icon="check" />}
                            right={() => <Caption> {goal.date} </Caption>} />
                    </Card>
                ))}
            </ScrollView>

            <Portal>
                <Dialog visible={optionsVisible} onDismiss={() => setOptionsVisible(false)}>
                    <Dialog.Title style={styles.titleDialog}>Options</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            style={styles.buttonDialog}
                            labelStyle={styles.labelButtonDialog}
                            icon="pencil"
                            mode="text"
                            onPress={() => handleEdit()}>
                            Edit
                        </Button>
                        <Button
                            style={styles.buttonDialog}
                            labelStyle={styles.labelButtonDialog}
                            icon="minus-circle"
                            mode="text"
                            onPress={() => {
                                setOptionsVisible(false);
                                setDeleteVisible(true);
                            }}>
                            Delete
                        </Button>
                    </Dialog.Content>
                </Dialog>

                <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                    <Dialog.Title style={styles.titleDialog}> Don't leave yet! </Dialog.Title>
                    <Dialog.Content>
                        <Image
                            style={styles.deleteImage}
                            source={require('../../assets/delete.png')}
                        />
                        <Paragraph style={styles.textDialog}>
                            You're almost there!
                        </Paragraph>
                        <Paragraph style={styles.textDialog}>
                            Are you sure you want to delete this habit?
                        </Paragraph>
                        <Dialog.Actions>
                            <Button onPress={() => handleDelete()}>Yes</Button>
                            <Button 
                                style={styles.buttonDontDelete}
                                labelStyle={{color: '#fff'}}
                                onPress={() => setDeleteVisible(false)}>No!</Button>
                        </Dialog.Actions>

                    </Dialog.Content>
                </Dialog>
            </Portal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flexDirection: 'column',
        height: '100%',
        padding: 5
    },
    title: {
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.7)',
    },
    titleGoals: {
        marginTop: 30,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.7)',
    },
    cardHabit: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    litleText: {
        color: '#f3c57b'
    },
    cardGoasHeader: {
        backgroundColor: '#8aa0aa',
        borderBottomWidth: 0.5,
        borderColor: '#f3c57b'
    },
    titleDialog: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 25,
    },
    textDialog: {
        marginTop: 20,
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 20,

    },
    buttonDialog: {
        marginBottom: 20,
    },
    labelButtonDialog: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 20
    },
    deleteImage: {
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
    buttonDontDelete: {
        backgroundColor: '#fb685a',
        width: 60,
        marginLeft: 20
    }
});


export default connect(state => ({ state }))(DetailHabit);