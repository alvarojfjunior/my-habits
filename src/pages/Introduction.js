import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, IconButton, Title } from 'react-native-paper';
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
                    source={require('../../assets/introduction/01.png')}
                />)
        else if (cardPosition === 1)
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/introduction/02.png')}
                />)
        else if (cardPosition === 2)
            return (
                <Image
                    style={styles.image}
                    source={require('../../assets/introduction/03.png')}
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
            <Title> Welcome {user.name} </Title>
            <GetCards />
            <View style={styles.arrowsContainer}>
                <IconButton
                    icon="chevron-left"
                    size={20}
                    onPress={() => setCardPosition(cardPosition - 1)}
                />
                <Button
                    style={styles.skipButton}
                    onPress={() => navigation.navigate('Main')}>
                    Skip
            </Button>
                <IconButton
                    icon="chevron-right"
                    size={20}
                    onPress={() => setCardPosition(cardPosition + 1)}
                />
            </View>
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