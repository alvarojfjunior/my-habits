import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { IconButton, TextInput, Title, Button, Checkbox, Caption, Text, RadioButton, Modal, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import moment from 'moment';

import HabitService from '../services/HabitService';

function AddHabit({ navigation, state }) {
    const [user, setUser] = useState({})
    const [btnAddIsLoading, setBtnAddIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [mondey, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wednesday, setWednesday] = useState(true);
    const [thursday, setThursday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [saturday, setSaturday] = useState(true);
    const [sunday, setSunday] = useState(true);

    const [days, setDays] = useState(0);


    useEffect(() => {
        setUser(state.user.user)
    }, []);


    const addNewHabit = async () => {
        if (title === '' || description === '')
            return;

        setBtnAddIsLoading(true)
        const newHabit = {
            title,
            description,
            'progress': 0.0,
            'finished': false,
            'date': moment().format('DD/MM/YYYY HH:MM'),
        }
        const res = await HabitService.addData(newHabit);
        setBtnAddIsLoading(false);
        setModalVisible(true);
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
                        status={mondey ? 'checked' : 'unchecked'}
                        label="Mon."
                        labelStyle={styles.checkbox}
                        onPress={() => setMonday(!mondey)} />
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
                    <RadioButton.Group onValueChange={value => setDays(value)} value={days}>
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
            <Portal style={styles.portal}>
                <Modal
                    contentContainerStyle={styles.modal}
                    visible={modalVisible}
                    onDismiss={() => navigation.navigate('Main')}>
                    <Title style={styles.modalTitle}> Heaaah {user.name}! </Title>
                    <Title style={styles.modalTitle}> Congratulations! </Title>
                    <Caption style={styles.modalText}>Now we are going to be strong to accomplish your goal!</Caption>
                    <Caption style={styles.modalText}> We will help you with daily notifications </Caption>
                    <Image
                        style={styles.image}
                        source={require('../../assets/correct.png')}
                    />
                </Modal>
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
    },
    boxGroup: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-around',

    },
    modalTitle: {
        color: 'rgba(52, 52, 52, 1)',
        fontSize: 30,
        textAlign: "center",
    },
    modalText: {
        color: 'rgba(52, 52, 52, 0.8)',
        marginTop: 20,
        textAlign: "center",
        fontSize: 20
    },
    image: {
        marginTop: 15,
        width: 50,
        height: 50,
    }

})

export default connect(state => ({ state }))(AddHabit);