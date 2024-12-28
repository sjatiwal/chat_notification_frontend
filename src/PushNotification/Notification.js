import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
const usePushNotification = () => {
  const navigation = useNavigation();

  // function to handle notification
  const handleNotificationClick = ({path, userName, phoneNo}) => {
    switch (path) {
      case 'ChatScreen':
        navigation.navigate('ChatScreen', {
          username: userName,
          phoneNo: phoneNo,
        });
        break;
      default: {
        break;
      }
    }
  };

  // listem click on notification when app is running in background
  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        if (remoteMessage) {
          setTimeout(() => {
            if (remoteMessage?.data?.click_action)
              handleNotificationClick({
                path: remoteMessage?.data?.click_action,
                userName: remoteMessage?.data?.name,
                phoneNo: remoteMessage?.data?.phoneNo,
              });
          }, 1000);
        }
      },
    );
    return unsubscribe;
  };

  // listen click on notification when app is closed
  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();
    if (message) {
      setTimeout(() => {
        if (message?.data?.click_action)
          handleNotificationClick({
            path: message?.data?.click_action,
            userName: message?.data?.name,
            phoneNo: message?.data?.phoneNo,
          });
      }, 1000);
    }
  };

  return {
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
