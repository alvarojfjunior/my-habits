import React, { useState, useCallback } from 'react';
import Loading from '../components/Loading';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { IconButton, TextInput, Title, Button, Checkbox, Caption, Dialog, Text, RadioButton, Headline, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import moment from 'moment';
import { AdMobInterstitial } from 'expo-ads-admob';
import DateTimePicker from '@react-native-community/datetimepicker';

import GoalService from '../services/GoalService';
import HabitService from '../services/HabitService';
import { useFocusEffect } from '@react-navigation/native';

function AddHabit({ navigation, route, state }) {
    const [isReady, setIsReady] = useState(false)
    const [user, setUser] = useState({})
    const [habit, setHabit] = useState({})
    const [firstGoal, setFirstGoal] = useState({});
    const [btnAddIsLoading, setBtnAddIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [intersticialAdId, setIntersticialAdId] = useState('')
    const [monday, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wednesday, setWednesday] = useState(true);
    const [thursday, setThursday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [goaldays, setGoaldays] = useState('0');
    const [timeToRemaind, setTimeToRemaind] = useState(new Date());




    useFocusEffect(
        useCallback(() => {
            setIntersticialAdId(Platform.OS === 'ios' ? 'ca-app-pub-8648602875009663/9055732019' : 'ca-app-pub-8648602875009663/1238512243')
            const newUser = state.user.user;
            const newHabit = route.params;
            setUser(newUser)
            if (newHabit) {
                setHabit(newHabit)
                setTitle(newHabit.title)
                setDescription(newHabit.description);
                setMonday(newHabit.monday === '1' ? true : false)
                setTuesday(newHabit.tuesday === '1' ? true : false)
                setWednesday(newHabit.wednesday === '1' ? true : false)
                setThursday(newHabit.thursday === '1' ? true : false)
                setFriday(newHabit.friday === '1' ? true : false)
                setSaturday(newHabit.saturday === '1' ? true : false)
                setSunday(newHabit.sunday === '1' ? true : false)
                setGoaldays('' + newHabit.goaldays + '')
            }
            setIsReady(true)
        }, []));

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
            timeToRemaind,
            'goaldays': parseInt(goaldays),
            'currentday': 0,
            'progress': 0,
            'finished': false,
            'date': moment().format('DD/MM/YYYY HH:MM'),
        }
        //EDITING
        if (route.params) {
            newHabit = { 'id': route.params.id, ...newHabit };
            const res = await HabitService.updateById(newHabit);
            navigation.push('DetailHabit', newHabit);
        }
        //NEW
        else {
            const res = await HabitService.addData(newHabit);
            setHabit({ 'id': res, ...newHabit })
            setModalVisible(true);
        }
        await generateRemainders();

        AdMobInterstitial.setAdUnitID(intersticialAdId);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false })
        await AdMobInterstitial.showAdAsync();
        setBtnAddIsLoading(false);
    }

    const onChangeTimePicker = (event, selectedDate) => {
        const currentDate = selectedDate || timeToRemaind;
        setShowTimePicker(Platform.OS === 'ios');
        setTimeToRemaind(currentDate);
    }



    const generateRemainders = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        const schedulingOptions = {
            time: (new Date(timeToRemaind)).getTime(),
            repeat: 'day'
        }
        const localNotification = {
            title: 'done',
            body: 'done!',
            ios: {
                sound: true,
                _displayInForeground: true,
                image: 'https://github.com/alvarojfjunior/MyHabits/raw/master/assets/icon.png',
            },
            android: {
                sound: true,
                icon: 'https://github.com/alvarojfjunior/MyHabits/raw/master/assets/icon.png',
                channelId: 'chat-messages',
            },
        };
        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }


    function getMsFromDate(time) {
        var hours = new Date(time).getHours();
        return hours * 60 * 60 *1000;
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
                        status={monday ? 'checked' : 'unchecked'}
                        label="Mon."
                        labelStyle={styles.checkbox}
                        onPress={() => setMonday(!monday)} />
                    <Checkbox.Item
                        status={tuesday ? 'checked' : 'unchecked'}
                        label="Tue."
                        labelStyle={styles.checkbox}
                        onPress={() => setTuesday(!tuesday)} />
                    <Checkbox.Item
                        status={wednesday ? 'checked' : 'unchecked'}
                        label="Wed."
                        labelStyle={styles.checkbox}
                        onPress={() => setWednesday(!wednesday)} />
                    <Checkbox.Item
                        status={thursday ? 'checked' : 'unchecked'}
                        label="Thu."
                        labelStyle={styles.checkbox}
                        onPress={() => setThursday(!thursday)} />
                    <Checkbox.Item
                        status={friday ? 'checked' : 'unchecked'}
                        label="Fri."
                        labelStyle={styles.checkbox}
                        onPress={() => setFriday(!friday)} />
                    <Checkbox.Item
                        status={saturday ? 'checked' : 'unchecked'}
                        label="Sat."
                        labelStyle={styles.checkbox}
                        onPress={() => setSaturday(!saturday)} />
                    <Checkbox.Item
                        status={sunday ? 'checked' : 'unchecked'}
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
                        testID="dateTimePicker"
                        value={timeToRemaind}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        textColor="red"
                        style={styles.timePiker}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setShowTimePicker(Platform.OS === 'ios');
                            setTimeToRemaind(currentDate)
                        }}
                    />
                ) : <View></View>}

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
                        <Headline style={styles.modalText}>We are going to be strong to accomplish your goal!</Headline>
                        <Headline style={styles.modalText}>We will help you with daily notifications</Headline>
                        <Image
                            style={styles.image}
                            source={require('../../assets/congrats.png')}
                        />
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
        width: 100,
        height: 200,
        alignSelf: "center"
    }

})

export default connect(state => ({ state }))(AddHabit);