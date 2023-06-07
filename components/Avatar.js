import React, { Component } from 'react'
import { Image, StyleSheet, View, Dimensions } from 'react-native'
import avatar from '../assets/Images/Avatar.png'

export default class Avatar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={avatar} style={styles.image} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'relative',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    nav: {
        margin: 10
    }
})
