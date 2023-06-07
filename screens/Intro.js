import React from 'react';
import { ImageBackground, Platform, SafeAreaView, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import Chat from '../components/Chat';
import Navigation from '../components/Navigation';
import { DragResizeBlock } from '../components/react-native-drag-resize';
import avatar from '../assets/Images/Avatar.png';

export default function Intro({ navigation }) {
  return (
    <SafeAreaView>
      <ImageBackground source={avatar} resizeMode="cover" style={styles.bg}>
        <View style={styles.nav}>
          <Navigation isIntroScreen={true} navigation={navigation} />
        </View>
        <View style={styles.ChatContainer}>
          <DragResizeBlock>
            <Chat />
          </DragResizeBlock>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ChatContainer: {
    top: Platform.OS == 'ios' ? '0%' : '10%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nav: {
    // flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  bg: {
    height: '80%',
    width: '100%',
  },
});
