import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import moment from 'moment';

import UserService from '../services/UserService';
import * as userActions from '../store/actions/user';

import Loading from '../components/Loading';

function SignUp({ navigation, state, dispatch }) {

    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [btnIsLoading, setBtnIsLoading] = useState(false);



    useEffect(() => {
        const verifyUser = async () => {
            const res = await UserService.findAll();
            if (res.length > 0) {
                console.log('Existe usuário')
                setUser(res._array[0]);
                dispatch(userActions.setUser(res._array[0]));
                navigation.navigate('Main');
            } else {
                console.log('Não existe usuário');
                setIsReady(true);
            }
        }
        verifyUser();
    }, []);


    const signUp = async () => {
        setBtnIsLoading(true)
        if (name && password) {
            const res = await UserService.addData({ name, password, 'email': '', 'date': moment().format('DD/MM/YYYY HH:MM') });
            setUser(res);
            dispatch(userActions.setUser(res));
            navigation.navigate('Introduction');
        }
        setBtnIsLoading(false)
    }


    if (!isReady) return (<Loading />);
    else return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/Icons/rocket.png')} />
            <Text style={styles.title} > My Habit </Text>
            <Text style={styles.subTittle} > Change you mind! {state.user.name}</Text>

            <View style={styles.formContainer}>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={name => setName(name)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button
                    mode="contained"
                    loading={btnIsLoading}
                    style={styles.button}
                    onPress={() => signUp()}>
                    Sign up
            </Button>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginBottom: 10,
        width: 200,
        height: 200
    },
    title: {
        fontSize: 50,
        color: '#f3c57b',
    },
    subTittle: {
        fontSize: 20,
        color: '#e8e4ce',
        marginBottom: 10,
    },
    formContainer: {
        width: '90%',
    },
    button: {
        marginTop: 10,
        padding: 10,
    }
})

export default connect(state => ({ state }))(SignUp);