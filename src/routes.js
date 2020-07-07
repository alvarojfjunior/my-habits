import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import Main from './pages/Main';
import AddHabit from './pages/AddHabit';
import SignUp from './pages/SignUp';
import DetailHabit from './pages/DetailHabit';
import Introduction from './pages/Introduction';

const Stack = createStackNavigator();

function Routes({state}) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignUp">
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Main"
                    component={Main} />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="DetailHabit"
                    component={DetailHabit} />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="SignUp"
                    component={SignUp} />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="AddHabit"
                    component={AddHabit} />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Introduction"
                    component={Introduction} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default connect(state => ({ state }))(Routes);