import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './pages/Main';
import AddHabit from './pages/AddHabit';
import Login from './pages/Login';
import DetailHabit from './pages/DetailHabit';

const Stack = createStackNavigator();

export default function Routes() {
    const [logged, setLogged] = useState(false)

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={logged ? 'Main' : 'Login'}>
                <Stack.Screen
                    name="Main"
                    component={Main} />
                <Stack.Screen
                    name="DetailHabit"
                    component={DetailHabit} />
                <Stack.Screen
                    name="Login"
                    component={Login} />
                <Stack.Screen
                    name="AddHabit"
                    component={AddHabit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}