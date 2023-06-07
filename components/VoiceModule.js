import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  Pressable,
} from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import { Card, Button, Icon } from 'react-native-elements';

export default function VoiceModule({ isCamera = false }) {

  let text;
  let flag = false;
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isPressed, setPressed] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  const onSpeechStartHandler = e => {
    console.log('start handler==>>>', e);
  };
  const onSpeechEndHandler = e => {
    setLoading(false);
    console.log('stop handler==>>>', e);

    setResult(text);
    console.log("my" + result + " : " + text);

  };

  const onSpeechResultsHandler = e => {
    text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
    getResponse();
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }

  };
  const handleVoice = async (response) => {
    try {
      Tts.speak(response, {
        iosVoiceId: 'com.apple.ttsbundle.Daniel-compact',
        rate: 0.50,
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_RING',
        },
      });
    } catch (error) {
      console.log('text to speech failed', error);
    }
  };

  //handle the response sent by the server .
  const handleKGResponse = async (response) => {
    let word = response.answer;
    setResult(word);
    handleVoice(word);
  };

  const getResponse = async () => {
    console.log('in  getresponse');
    let url = 'http://192.168.1.11:5000/';
    console.log(text)
    url += text;
    const resp = await fetch(url);

    const contentLength = resp.headers.get('Content-Length');

    if (contentLength != 0) {
      const data = await resp.json();
      console.log(data);
      handleKGResponse(data);
    } else {
      setResult("Sorry I couldn't understand that, I am still learning.");
      handleVoice("Sorry I couldn't understand that, I am still learning.");
    }
  };
  if (!isCamera) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.textInputStyle}>
            <TextInput
              class="mytext"
              value={result}
              style={{ flex: 1 }}
              multiline={true}
              onChangeText={text => setResult(text)}
              fontSize={26}
              color={'#614065'}
              fontWeight={'600'}
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="red" opacity={1} />
            ) : (
              <TouchableOpacity></TouchableOpacity>
            )}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              onLongPress={startRecording}
              onPressOut={stopRecording}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'black' : 'white',
                  transform: pressed ? [{ scale: 1.0 }] : [{ scale: 0.9 }],
                },
                styles.roundButton,
              ]}>
              <Image
                source={require('../assets/Images/mic.png')}
                style={{ width: 60, height: 65 }}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputStyle2}>
        <TextInput
          class="mytext"
          value={result}
          style={{ flex: 1 }}
          multiline={true}
          onChangeText={text => setResult(text)}
          fontSize={25}
          color={'white'}
          fontWeight={'600'}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <TouchableOpacity></TouchableOpacity>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable
          onLongPress={startRecording}
          onPressOut={stopRecording}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'black' : 'white',
              transform: pressed ? [{ scale: 1.0 }] : [{ scale: 0.9 }],
            },
            styles.roundButton,
          ]}>
          <Image
            source={require('../assets/Images/mic.png')}
            style={{ width: 60, height: 65 }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 140,
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    elevation: 2,
    shadowOpacity: 0.7,
    marginTop: Dimensions.get('window').height / 3,
    opacity: 0.7,
  },
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 140,
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    elevation: 2,
    shadowOpacity: 0.7,
    opacity: 0.3,
  },
  roundButton: {
    marginVertical: 40,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#CBEDAA',
  },
  mytext: {
    opacity: 1,
  },
});
