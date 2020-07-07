import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput, Title, Button, Checkbox, Text } from 'react-native-paper';
import HabitService from '../services/HabitService';
import moment from 'moment';

export default function AddHabit({ navigation }) {
    const [btnAddIsLoading, setBtnAddIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [mondey, setMonday] = useState(true);
    const [tuesday, setTuesday] = useState(true);
    const [wendnesday, setWendnesday] = useState(true);
    const [thursday, setThursday] = useState(true);
    const [friday, setFriday] = useState(true);
    const [saturday, setSaturday] = useState(true);
    const [sunday, setSunday] = useState(true);


    const addNewHabit = async () => {
        if (title === '' || description === '')
            return;
        setBtnAddIsLoading(true)
        const newHabit = {
            'title': 'Ler',
            'description': 'Ler um pouco',
            'progress': 0.5,
            'finished': false,
            'date': moment().format('DD/MM/YYYY HH:MM'),
        }
        const res = await HabitService.addData(newHabit);
        setBtnAddIsLoading(false);
        navigation.navigate('Main');
    }


    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-left"
                color="#fb685a"
                size={20}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <Title>Start now to have a better life</Title>
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
                <View style={styles.checkboxContainer}>
                    <Checkbox.Item
                        status={mondey ? 'checked' : 'unchecked'}
                        label="Mondey"
                        labelStyle={styles.checkbox}
                        onPress={() => setMonday(!mondey)} />
                    <Checkbox.Item
                        status={tuesday ? 'checked' : 'unchecked'}
                        label="Tuesday"
                        onPress={() => setTuesday(!tuesday)} />
                </View>
                <Button
                    icon="camera"
                    mode="contained"
                    style={styles.btnAdd}
                    onPress={() => addNewHabit()}>
                    Add Habit
                </Button>
            </View>
        </View>
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
        flexDirection: 'row',
    },
    checkbox: {
        color:'#f3c57b',
    }
})