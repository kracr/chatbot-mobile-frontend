import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import back from '../assets/Images/BackButton.png'
import ar from '../assets/Images/AR.png'

export default function Navigation({ isIntroScreen, navigation }) {
    if (isIntroScreen) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('Startup')
                    }
                >
                    <Image source={back} style={styles.button1} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('AR')
                    }
                >
                    <Image source={ar} style={styles.button1} />
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Intro')
                }
            >
                <Image source={back} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        zIndex: 1,
        position: 'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 6,
        justifyContent: 'space-between'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 2,
        borderColor: 'grey',
        opacity: 0.7,
        
    

    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 20,

    }
})

