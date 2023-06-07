import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const botAvatar = require('../assets/Images/Avatar.png');

const Bot = {
  id: 1,
  name: 'chatbot',
  avatar: botAvatar,
};

export default class Chat extends Component {
  state = {
    questions: [
      {
        _id: 2,
        text: 'I am your Virtual Guide',
        createdAt: new Date(),
        user: Bot,
      },
      {
        _id: 1,
        text: 'Hi !',
        createdAt: new Date(),
        user: Bot,
      },
    ],
    id: 2,
    name: '',
  };

  //handleing resonse got from server and display to the user.
  botResponse(text) {
    let response = {
      _id: this.state.questions.length + 1,
      text,
      createdAt: new Date(),
      user: Bot,
    };

    this.setState(previousState => ({
      questions: GiftedChat.append(previousState.questions, [response]),
    }));
  }

  //handle the response sent by the server .
  handleKGResponse(response) {
    let word = response.answer;
    this.botResponse(word);
  }

  //fetch data from the server
  async fetchData(curQuestion) {
    let url = 'http://192.168.1.11:5000/';
    url += curQuestion;
    const resp = await fetch(url);
    console.log(resp)

    const contentLength = resp.headers.get('Content-Length');

    if (contentLength != 0) {
      const data = await resp.json();
      this.handleKGResponse(data);
    } else {
      this.botResponse(
        "Sorry I couldn't understand that, I am still learning.",
      );
    }
  }

  //when send is clicked , the the fetch data is called to recieve the answer from server
  onSend(questions = []) {
    Keyboard.dismiss();
    this.setState(previousState => ({
      questions: GiftedChat.append(previousState.questions, questions),
    }));

    let curQuestion = questions[0].text;

    this.fetchData(curQuestion);
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.questions}
          onSend={question => this.onSend(question)}
          user={{
            _id: 1,
          }}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
        />
        {Platform.OS === 'android' ? null : <KeyboardSpacer />}
      </View>
    );
  }
  renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#CBEDAA',
        },
        right: {
          backgroundColor: '#7B61FF',
        },
      }}
      textProps={{
        style: {
          color: props.position === 'left' ? '#000' : '#fff',
        },
      }}
      textStyle={{
        left: {
          color: '#fff',
        },
        right: {
          color: '#000',
        },
      }}
      style={styles.container}
    />
  );
  renderInputToolbar = props => (
    <InputToolbar
      {...props}
      textInputStyle={{ color: 'black' }}
    />
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 1,
  },
});
