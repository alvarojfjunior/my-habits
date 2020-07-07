import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

function Introduction({ navigation, state }) {

    const [cardPosition, setCardPosition] = useState(0);
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(state.user.user)
    }, []);


    const GetCards = () => {
        if (cardPosition === 0)
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/Icons/rocket.png')}
                />)
        else if (cardPosition === 1)
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/Icons/rocket.png')}
                />)
        else if (cardPosition === 2)
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/Icons/rocket.png')}
                />)
        else {
            navigation.navigate('Main');
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/Icons/rocket.png')}
                />)
        }
    }


    return (
        <View style={styles.container}>
            <Text>Introdution {state.user.user.name} </Text>
            <View style={styles.arrowsContainer}>
                <IconButton
                    icon="camera"
                    size={20}
                    onPress={() => setCardPosition(cardPosition - 1)}
                />
                <IconButton
                    icon="camera"
                    size={20}
                    onPress={() => setCardPosition(cardPosition + 1)}
                />
            </View>
            <GetCards />
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
        width: 200,
        height: 200
    },
})

export default connect(state => ({ state }))(Introduction);