import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import VoiceModule from '../components/VoiceModule'
import back from '../assets/Images/BackButton.png'
import avatar_intro from '../assets/Images/avatar_intro.png'
export default function AR_Screen({ navigation, reRender = false }) {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground source={avatar_intro} resizeMode='cover' style={styles.bg}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate('Intro')
                        }
                    >
                        <Image source={back} style={styles.button1} />
                    </TouchableOpacity>
                    <VoiceModule />
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    zIndex: 1,
    position: 'relative',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bg: {
    height: '100%',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 55,
    height: 55,
    borderRadius: 55,
    shadowOffset: {width: 0, height: 1},
    shadowRadius:10,
    shadowOpacity: 0.9,
    opacity: 0.7,
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 45,
    height: 45,
    borderRadius: 45,
    padding: 20,
  },
});
