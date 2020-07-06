import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Colors } from 'react-native-paper';

export default function ButtonDetailHabit({ navigation }) {
    return (
        <FAB
            style={styles.fab}
            icon="plus"
            color="#f4f0d9"
            onPress={() => navigation.navigate('AddHabit') }
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#fb685a',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
  })
