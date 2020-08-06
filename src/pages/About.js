import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, IconButton, Title } from 'react-native-paper';
import { connect } from 'react-redux';

import Loading from '../components/Loading';

function About({ navigation, state }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true)
    }, []);

    if (!isReady) return (<Loading />)
    else return (
        <View style={styles.container}>
            <Title> This App  {user.name} </Title>

            <Button
                style={styles.skipButton}
                onPress={() => navigation.navigate('Main')}>
                Skip
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8aa0aa',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowsContainer: {
        width: '90%',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        marginBottom: 10,
        width: 300,
        height: 350
    },
})

export default connect(state => ({ state }))(Introduction);