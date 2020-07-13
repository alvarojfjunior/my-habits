import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { IconButton, TextInput, Title, Button, Checkbox, Caption, Dialog, Text, RadioButton, Headline, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import moment from 'moment';

import GoalService from '../services/GoalService';
import HabitService from '../services/HabitService';

function AddHabit({ navigation, route, state }) {
    const [user, setUser] = useState({})
    const [habit, setHabit] = useState({})
    const [firstGoal, setFirstGoal] = useState({});
    const [btnAddIsLoading, setBtnAddIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [monday, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wednesday, setWednesday] = useState(true);
    const [thursday, setThursday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [goaldays, setGoaldays] = useState('0');


    useEffect(() => {
        setUser(state.user.user)
        if (route.params) {
            setHabit(route.params)
            setTitle(habit.title)
            setDescription(habit.description);
            setMonday(habit.monday === '1' ? true : false)
            setTuesday(habit.tuesday === '1' ? true : false)
            setWednesday(habit.wednesday === '1' ? true : false)
            setThursday(habit.thursday === '1' ? true : false)
            setFriday(habit.friday === '1' ? true : false)
            setSaturday(habit.saturday === '1' ? true : false)
            setSunday(habit.sunday === '1' ? true : false)
            setGoaldays('' + habit.goaldays + '')
        }
    }, []);


    const addFirstGoal = async () => {
        const newFirstGoal = {
            'habit': habit.id,
            'title': 'First step',
            'description': 'You are now ready to start practicing a new habit.',
            'currentprogress': habit.progress+0.1,
            'date': moment().format('DD/MM/YYYY HH:MM')
        }
        const resAddData = await GoalService.addData(newFirstGoal);
        const resAddGoal = await HabitService.updateNewGoal(habit.id, habit.progress+0.1);
        setFirstGoal({ ...newFirstGoal, 'id': resAddData })
    }


    const addNewHabit = async () => {
        if (title === '' || description === '')
            return;
        setBtnAddIsLoading(true)
        const newHabit = {
            title,
            description,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            'goaldays': parseInt(goaldays),
            'currentday': 0,
            'progress': 0,
            'finished': false,
            'date': moment().format('DD/MM/YYYY HH:MM'),
        }
        //Editando
        if (route.params) {
            const res = await HabitService.updateById({'id': route.params.id,  ...newHabit});
            console.log(res);
            navigation.goBack();
        } 

        //Cadastrando
        else {
            const res = await HabitService.addData(newHabit);
            setHabit({ 'id': res, ...newHabit })
            setModalVisible(true);
        }
        setBtnAddIsLoading(false);
    }
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
                <Button
                    mode="contained"
                    style={styles.btnAdd}
                    loading={btnAddIsLoading}
                    onPress={() => addNewHabit()}>
                    Add Habit
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