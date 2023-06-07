# HopOn India Chatbot Front-end

This is a React Native project setup with Viro.

## Prerequesites 

Set up the development environment for [react native](https://reactnative.dev/docs/environment-setup). 

> ⚠️ NOTE: This application cannot be used by emulators, so install this on a physical device only.

## Installation

1. `git clone URL`
2. `cd integrated_ar_chatbot`
3. `npm install` ⚠️ NOTE: If getting some dependency issues run: `npm install --legacy-peer-deps`
4. This app is working flawlessly on npm version: 16.13.0. So use command: `nvm use 16.13.0` to set correct npm version.
5. For running on iOS:
  i) `npx pod-install`
  ii) `npx react-native run-ios`
6. For running on android:
  i) `npx react-native start`
  ii) `npx react-native run-android` 

⚠️ NOTE: if `npx react-native run-android` fails with EACCESS gradlew.bat or EACCESS gradlew, run `chmod +x gradlew.bat` or `chmod +x gradlew`.
