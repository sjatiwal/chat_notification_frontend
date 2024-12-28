import React, {useEffect} from 'react';
import StackScreen from './StackScreen';
import usePushNotification from '../PushNotification/Notification';

const AppContainer = () => {
  const {
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        // to listen notification when app is minimised
        onNotificationOpenedAppFromQuit();
        // to listen notification when app is close
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error, 'APPContainor');
      }
    };

    listenToNotifications();
  }, []);

  return <StackScreen />;
};

export default AppContainer;
