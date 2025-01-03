/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging()
  .requestPermission()
  .then(authorizationStatus => {
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  })
  .catch(error => console.error('Permission request failed:', error));

messaging().setBackgroundMessageHandler(async remoteMessage => {});
AppRegistry.registerComponent(appName, () => App);
