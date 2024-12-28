/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import usePushNotification from './src/PushNotification/Notification';
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
