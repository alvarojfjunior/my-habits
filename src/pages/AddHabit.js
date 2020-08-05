import React, { useState, useCallback } from 'react';
import Loading from '../components/Loading';
import { YellowBox, LogBox, StyleSheet, View, Image, ScrollView } from 'react-native';
import { IconButton, TextInput, Title, Button, Checkbox, Caption, Dialog, Text, RadioButton, Headline, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AdMobInterstitial } from 'expo-ads-admob';

import GoalService from '../services/GoalService';
import HabitService from '../services/HabitService';
import { useFocusEffect } from '@react-navigation/native';

YellowBox.ignoreWarnings([
    'Provided value for "time"'
]);

function AddHabit({ navigation, route, state }) {
    const [isReady, setIsReady] = useState(false)
    const [intersticialAdUnitID, setIntersticialAdUnitID] = useState('');
    const [user, setUser] = useState({})
    const [habit, setHabit] = useState({})
    const [firstGoal, setFirstGoal] = useState({});
    const [btnAddIsLoading, setBtnAddIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [monday, setMonday] = useState(1);
    const [tuesday, setTuesday] = useState(1);
    const [wednesday, setWednesday] = useState(1);
    const [thursday, setThursday] = useState(1);
    const [friday, setFriday] = useState(1);
    const [saturday, setSaturday] = useState(0);
    const [sunday, setSunday] = useState(0);
    const [goaldays, setGoaldays] = useState('0');
    const [notificationIdentifier, setNotificationIdentifier] = useState('')
    const [timeToRemaind, setTimeToRemaind] = useState(new Date());

    const [repeat, setRepeat] = useState('day')

    useFocusEffect(
        useCallback(() => {
            setIntersticialAdUnitID(Platform.OS === 'android'? 'ca-app-pub-8648602875009663/1238512243' : 'ca-app-pub-8648602875009663/9055732019')

            setScreen()
        }, []));


    const setScreen = async () => {
        const newUser = await state.user.user;
        const newHabit = await route.params;
        setUser(newUser)
        if (newHabit) {
            await setHabit(newHabit)
            await setTitle(newHabit.title)
            await setDescription(newHabit.description);
            await setMonday(newHabit.monday)
            await setTuesday(newHabit.tuesday)
            await setWednesday(newHabit.wednesday)
            await setThursday(newHabit.thursday)
            await setFriday(newHabit.friday)
            await setSaturday(newHabit.saturday)
            await setSunday(newHabit.sunday)
            await setGoaldays('' + newHabit.goaldays + '')
            await setNotificationIdentifier(newHabit.notificationIdentifier)
            await setRepeat(newHabit.repeat)
        }
        setIsReady(true)
    }

    const addFirstGoal = async () => {
        const newFirstGoal = {
            'habit': habit.id,
            'title': 'First step',
            'description': 'You are now ready to start practicing a new habit.',
            'currentprogress': habit.progress + 0.1,
            'date': moment().format('DD/MM/YYYY HH:MM')
        }
        const resAddData = await GoalService.addData(newFirstGoal);
        const resAddGoal = await HabitService.updateNewGoal(habit.id, habit.progress + 0.1);
        setFirstGoal({ ...newFirstGoal, 'id': resAddData })
    }

    const handleBtnSubmit = async () => {
        if (title === '' || description === '')
            return;
        setBtnAddIsLoading(true)

         // Display an interstitial
        await AdMobInterstitial.setAdUnitID(intersticialAdUnitID);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
        let newHabit = {
            title,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            timetoremaind: moment(timeToRemaind).format('DD/MM/YYYY HH:MM'),
            repeat,
            goaldays: parseInt(goaldays),
            currentday: 0,
            notificationIdentifier,
            progress: 0,
            date: moment().format('DD/MM/YYYY HH:MM'),
        }
        //EDITING
        if (route.params) {
            newHabit = { 'id': route.params.id, ...newHabit };
            await HabitService.updateById(newHabit);
            console.log(newHabit)
            navigation.push('DetailHabit', newHabit);
        }
        //NEW
        else {
            const res = await HabitService.addData(newHabit);
            setHabit({ 'id': res, ...newHabit })
            setModalVisible(true);
        }
        setNotificationIdentifier(await generateRemainders());
        setBtnAddIsLoading(false);
    }

    const generateRemainders = async () => {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: `Daily remainder`,
                body: `Le's to practice ${habit.title}`
            },
            trigger: {
                hour: timeToRemaind.getHours(),
                minute: timeToRemaind.getMinutes(),
                repeats: true,
            }
        });
        return identifier;
    }

    if (!isReady) return <Loading />
    return (
        <ScrollView style={styles.container}>
            <IconButton
                icon="arrow-left"
                color="#fb685a"
                size={20}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <Title style={styles.title}>Start now to have a better life</Title>
                <TextInput
                    placeholder="Practice physical activity"
                    label="Habit title"
                    mode="outlined"
                    style={styles.textFields}
                    value={title}
                    onChangeText={e => setTitle(e)}
                />
                <TextInput
                    placeholder="30 minutes of treadmill every day"
                    label="Habit description"
                    mode="outlined"
                    color=""
                    value={description}
                    onChangeText={e => setDescription(e)}
                />
                <Caption style={styles.label}>What days of the week will you practice this habit?</Caption>
                <View style={styles.checkboxContainer}>
                    <Checkbox.Item
                        status={monday === 1 ? 'checked' : 'unchecked'}
                        label="Mon."
                        labelStyle={styles.checkbox}
                        onPress={() => setMonday(!monday)} />
                    <Checkbox.Item
                        status={tuesday === 1 ? 'checked' : 'unchecked'}
                        label="Tue."
                        labelStyle={styles.checkbox}
                        onPress={() => setTuesday(!tuesday)} />
                    <Checkbox.Item
                        status={wednesday === 1 ? 'checked' : 'unchecked'}
                        label="Wed."
                        labelStyle={styles.checkbox}
                        onPress={() => setWednesday(!wednesday)} />
                    <Checkbox.Item
                        status={thursday === 1 ? 'checked' : 'unchecked'}
                        label="Thu."
                        labelStyle={styles.checkbox}
                        onPress={() => setThursday(!thursday)} />
                    <Checkbox.Item
                        status={friday === 1 ? 'checked' : 'unchecked'}
                        label="Fri."
                        labelStyle={styles.checkbox}
                        onPress={() => setFriday(!friday)} />
                    <Checkbox.Item
                        status={saturday === 1 ? 'checked' : 'unchecked'}
                        label="Sat."
                        labelStyle={styles.checkbox}
                        onPress={() => setSaturday(!saturday)} />
                    <Checkbox.Item
                        status={sunday === 1 ? 'checked' : 'unchecked'}
                        label="Sun."
                        labelStyle={styles.checkbox}
                        onPress={() => setSunday(!sunday)} />
                </View>
                <Caption style={styles.label}>How long do you want to practice this habit?</Caption>
                <View style={styles.boxGroup} >
                    <RadioButton.Group onValueChange={value => setGoaldays(value)} value={goaldays}>
                        <View>
                            <Text>10 Days</Text>
                            <RadioButton value="10" />
                        </View>
                        <View>
                            <Text>45 Days</Text>
                            <RadioButton value="45" />
                        </View>
                        <View>
                            <Text>Forever</Text>
                            <RadioButton value="0" />
                        </View>
                    </RadioButton.Group>
                </View>
                <View >
                    <Button mode="contained" onPress={() => setShowTimePicker(true)}>
                        Set a time to reminders
                    </Button>
                </View>
                {showTimePicker ? (
                    <DateTimePicker
                        value={timeToRemaind}
                        mode="time"
                        is24Hour={true}
                        style={styles.timePiker}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setShowTimePicker(Platform.OS === 'ios');
                            setTimeToRemaind(currentDate)
                        }}
                    />
                ) : <View></View>}

                <Caption style={styles.label}>Repeat</Caption>
                <View style={styles.boxGroup} >
                    <RadioButton.Group onValueChange={repeat => setRepeat(repeat)} value={repeat}>
                        <View>
                            <Text>minute</Text>
                            <RadioButton value="minute" />
                        </View>
                        <View>
                            <Text>Hour</Text>
                            <RadioButton value="hour" />
                        </View>
                        <View>
                            <Text>Day</Text>
                            <RadioButton value="day" />
                        </View>
                    </RadioButton.Group>
                </View>
                <Button
                    mode="contained"
                    style={styles.btnAdd}
                    loading={btnAddIsLoading}
                    onPress={() => handleBtnSubmit()}>
                    I'm ready!
                </Button>
            </View>
            <Portal>
                <Dialog
                    visible={modalVisible}
                    onDismiss={async () => {
                        await addFirstGoal();
                        navigation.navigate('Main');
                    }}>
                    <Dialog.Title style={styles.titleDialog}> Heaaah {user.name}! Congratulations! </Dialog.Title>
                    <Dialog.Content>
                        <Image
                            style={styles.image}
                            source={require('../../assets/SoHappy.png')}
                        />
                        <Headline style={styles.modalText}>We are going to be strong to accomplish your goal!</Headline>
                        <Headline style={styles.modalText}>We will help you with daily notifications</Headline>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        height: '100%',
    },
    content: {
        margin: 15,
        marginTop: 0,

    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#f3c57b',
        fontSize: 20,
        marginBottom: 20,
    },
    textFields: {
        marginBottom: 10,
        borderRadius: 10,
    },
    timePiker: {
        color: '#f3c57b'
    },
    btnAdd: {
        marginTop: 15,
        padding: 15,
        color: '#ffff',
    },
    checkboxContainer: {
        flexWrap: "wrap",
        flexDirection: 'row',
    },
    checkbox: {
        width: 40,
        color: '#f3c57b',
    },
    portal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: -7,
        color: '#f3c57b',
    },
    modal: {
        backgroundColor: '#f3c57b',
        borderRadius: 10,
        alignItems: "center",
        margin: '10%',
        height: 300,
        padding: 25,
    },
    boxGroup: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-around',

    },
    titleDialog: {
        color: 'rgba(52, 52, 52, 1)',
        fontSize: 25,
        textAlign: "center",
    },
    modalText: {
        marginBottom: 10,
        color: 'rgba(52, 52, 52, 0.8)',
        textAlign: "center",
        fontSize: 25
    },
    image: {
        width: 200,
        height: 250,
        alignSelf: "center"
    }

});

export default connect(state => ({ state }))(AddHabit);